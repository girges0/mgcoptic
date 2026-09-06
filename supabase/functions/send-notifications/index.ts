// ============================================================================
// Supabase Edge Function: send-notifications
// Processes pending notifications from public.notification_events and delivers
// them to Android/Capacitor devices via Firebase Cloud Messaging (FCM HTTP v1 API)
// ============================================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
};

// Helper: Convert string / PEM to CryptoKey for RS256 signing
async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const cleanPem = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/[\r\n\s]/g, "");

  const binaryDer = Uint8Array.from(atob(cleanPem), (c) => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256"
    },
    false,
    ["sign"]
  );
}

// Helper: Base64URL encoding
function base64UrlEncode(data: Uint8Array | string): string {
  let str = typeof data === "string" ? data : String.fromCharCode(...data);
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Helper: Generate Google OAuth2 Access Token from Service Account JSON
async function getGoogleAccessToken(serviceAccount: Record<string, any>): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encoder = new TextEncoder();
  const encodedHeader = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const unsignedJwt = `${encodedHeader}.${encodedPayload}`;

  const privateKey = await importPrivateKey(serviceAccount.private_key);
  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    privateKey,
    encoder.encode(unsignedJwt)
  );

  const signedJwt = `${unsignedJwt}.${base64UrlEncode(new Uint8Array(signature))}`;

  // Exchange signed JWT for Bearer token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signedJwt}`
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Google OAuth2 exchange failed (${tokenRes.status}): ${errText}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const rawServiceAccount = Deno.env.get("FIREBASE_SERVICE_ACCOUNT");

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY configuration." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!rawServiceAccount) {
      return new Response(
        JSON.stringify({
          error: "Missing FIREBASE_SERVICE_ACCOUNT secret. Please set FIREBASE_SERVICE_ACCOUNT in Supabase Edge Functions Secrets."
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let serviceAccount: Record<string, any>;
    try {
      serviceAccount = JSON.parse(rawServiceAccount);
    } catch (e) {
      throw new Error("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON: " + (e as Error).message);
    }

    const projectId = serviceAccount.project_id || "mg-coptic";
    const googleToken = await getGoogleAccessToken(serviceAccount);
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Fetch pending notifications (up to 100)
    const { data: pendingEvents, error: fetchErr } = await supabase
      .from("notification_events")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(100);

    if (fetchErr) {
      throw new Error(`Failed to fetch pending notifications: ${fetchErr.message}`);
    }

    if (!pendingEvents || pendingEvents.length === 0) {
      return new Response(
        JSON.stringify({ message: "No pending notifications found.", processed: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results = [];

    // 2. Process each notification
    for (const event of pendingEvents) {
      let tokens: string[] = [];

      if (event.target_user_id) {
        // Targeted notification to specific user
        const { data: userTokens } = await supabase
          .from("device_tokens")
          .select("token")
          .eq("user_id", event.target_user_id);

        tokens = (userTokens || []).map((t) => t.token);
      } else {
        // Broadcast notification to all active devices
        const { data: allTokens } = await supabase
          .from("device_tokens")
          .select("token");

        tokens = (allTokens || []).map((t) => t.token);
      }

      // Remove duplicate tokens
      tokens = Array.from(new Set(tokens.filter(Boolean)));

      if (tokens.length === 0) {
        // No registered devices found for this user/platform; mark sent to avoid infinite retry
        await supabase
          .from("notification_events")
          .update({ status: "sent", sent_at: new Date().toISOString() })
          .eq("id", event.id);

        results.push({ id: event.id, title: event.title, delivered: 0, status: "sent_no_tokens" });
        continue;
      }

      let deliveredCount = 0;
      let failedCount = 0;
      const deadTokens: string[] = [];

      for (const token of tokens) {
        const targetDeepLink = String(event.deep_link || "index.html");
        const fullWebLink = targetDeepLink.startsWith("http")
          ? targetDeepLink
          : `https://mgcoptic.vercel.app/${targetDeepLink.replace(/^\/+/, "")}`;

        const messagePayload = {
          message: {
            token: token,
            notification: {
              title: event.title,
              body: event.body,
              image: "https://mgcoptic.vercel.app/icon-192.png"
            },
            data: {
              title: String(event.title || ""),
              body: String(event.body || ""),
              deep_link: targetDeepLink,
              event_type: String(event.event_type || ""),
              image: "https://mgcoptic.vercel.app/icon-192.png",
              icon: "ic_stat_notification"
            },
            android: {
              priority: "high",
              notification: {
                sound: "default",
                icon: "ic_stat_notification",
                color: "#6B1530",
                image: "https://mgcoptic.vercel.app/icon-192.png",
                notification_priority: "PRIORITY_HIGH",
                visibility: "PUBLIC",
                default_sound: true,
                default_vibrate_timings: true
              }
            },
            webpush: {
              headers: {
                Urgency: "high"
              },
              notification: {
                title: event.title,
                body: event.body,
                icon: "https://mgcoptic.vercel.app/icon-192.png",
                badge: "https://mgcoptic.vercel.app/icon-192.png",
                image: "https://mgcoptic.vercel.app/icon-192.png"
              },
              fcm_options: {
                link: fullWebLink
              }
            }
          }
        };

        try {
          const fcmRes = await fetch(
            `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${googleToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(messagePayload)
            }
          );

          if (fcmRes.ok) {
            deliveredCount++;
          } else {
            failedCount++;
            const errBody = await fcmRes.json().catch(() => ({}));
            const errCode = errBody?.error?.details?.[0]?.errorCode || errBody?.error?.status;
            if (errCode === "UNREGISTERED" || fcmRes.status === 404) {
              deadTokens.push(token);
            }
          }
        } catch (fcmErr) {
          failedCount++;
          console.warn("[FCM Send Error]:", fcmErr);
        }
      }

      // Clean up invalid/expired device tokens
      if (deadTokens.length > 0) {
        await supabase
          .from("device_tokens")
          .delete()
          .in("token", deadTokens);
      }

      const finalStatus = (deliveredCount > 0 || tokens.length === 0) ? "sent" : "failed";

      await supabase
        .from("notification_events")
        .update({
          status: finalStatus,
          sent_at: new Date().toISOString()
        })
        .eq("id", event.id);

      results.push({
        id: event.id,
        title: event.title,
        status: finalStatus,
        delivered: deliveredCount,
        failed: failedCount,
        deadTokensCleaned: deadTokens.length
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: pendingEvents.length,
        results: results
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
