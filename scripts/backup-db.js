/**
 * MG COPTIC - Free Database Backup Tool
 * يقوم بعمل نسخة احتياطية كاملة ومجانية من قاعدة بيانات Supabase
 * يحفظ البيانات كملفات JSON وملف استعادة SQL
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kdoanxzpfiscprjjzzic.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkb2FueHpwZmlzY3Byamp6emljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTA3MjEsImV4cCI6MjEwMDM4NjcyMX0.5m-YS9NFVMFGbB6OtBvm2MXwhNuU0bT5Q7vPFTJ5PYo';

const TABLES = [
  'letters',
  'vocabulary',
  'grammar_sections',
  'levels',
  'units',
  'lessons',
  'challenges',
  'challenge_options',
  'writing_exercises',
  'quiz_questions',
  'quiz_settings',
  'quiz_category_settings',
  'articles',
  'users',
  'user_progress',
  'user_lesson_progress',
  'user_challenge_progress',
  'user_writing_progress',
  'admin_permissions',
  'device_tokens',
  'notification_events'
];

// دالة لجلب كل البيانات مع معالجة التصفح (Pagination) حتى لو زادت السجلات عن 1000
async function fetchTableData(table) {
  const PAGE_SIZE = 1000;
  let from = 0;
  let allRows = [];

  while (true) {
    const to = from + PAGE_SIZE - 1;
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Range': `${from}-${to}`,
        'Prefer': 'count=exact'
      }
    });

    if (response.status === 404) {
      return { exists: false, data: [] };
    }

    if (!response.ok) {
      const errorText = await response.text();
      return { exists: true, error: `HTTP ${response.status}: ${errorText}`, data: [] };
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      break;
    }

    allRows = allRows.concat(rows);

    if (rows.length < PAGE_SIZE) {
      break;
    }
    from += PAGE_SIZE;
  }

  return { exists: true, data: allRows };
}

// إنشاء جمل استعادة SQL
function generateSqlRestore(allData) {
  let sql = `-- ========================================================\n`;
  sql += `-- MG COPTIC - Database Backup Restore Script\n`;
  sql += `-- Generated on: ${new Date().toISOString()}\n`;
  sql += `-- ========================================================\n\n`;

  for (const [table, rows] of Object.entries(allData)) {
    if (!rows || rows.length === 0) continue;

    sql += `-- Table: ${table} (${rows.length} rows)\n`;
    const columns = Object.keys(rows[0]);
    const quotedColumns = columns.map(c => `"${c}"`).join(', ');

    for (const row of rows) {
      const values = columns.map(col => {
        const val = row[col];
        if (val === null || val === undefined) return 'NULL';
        if (typeof val === 'boolean' || typeof val === 'number') return val;
        if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
        return `'${String(val).replace(/'/g, "''")}'`;
      }).join(', ');

      sql += `INSERT INTO "${table}" (${quotedColumns}) VALUES (${values}) ON CONFLICT DO NOTHING;\n`;
    }
    sql += `\n`;
  }

  return sql;
}

async function runBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDirName = `backup_${timestamp}`;
  const targetDir = path.join(process.cwd(), 'backups', backupDirName);

  console.log('\n========================================================');
  console.log('📦 MG COPTIC - بدء أخذ نسخة احتياطية من قاعدة البيانات');
  console.log(`🕒 التاريخ والوقت: ${new Date().toLocaleString('ar-EG')}`);
  console.log(`📁 مجلد الحفظ: backups/${backupDirName}`);
  console.log('========================================================\n');

  fs.mkdirSync(targetDir, { recursive: true });

  const backupResults = {};
  const stats = [];

  for (const table of TABLES) {
    process.stdout.write(`⏳ جاري سحب جدول [${table}]... `);
    try {
      const result = await fetchTableData(table);

      if (!result.exists) {
        console.log('⚠️ (الجدول غير موجود - تم التخطي)');
        continue;
      }

      if (result.error) {
        console.log(`❌ خطأ: ${result.error}`);
        stats.push({ table, count: 0, status: 'خطأ في القراءة' });
        continue;
      }

      const count = result.data.length;
      backupResults[table] = result.data;

      // حفظ ملف منفصل لكل جدول
      const tableFilePath = path.join(targetDir, `${table}.json`);
      fs.writeFileSync(tableFilePath, JSON.stringify(result.data, null, 2), 'utf-8');

      console.log(`✅ تم حفظ ${count} سجل`);
      stats.push({ table, count, status: 'ناجح' });
    } catch (err) {
      console.log(`❌ فشل: ${err.message}`);
      stats.push({ table, count: 0, status: `فشل: ${err.message}` });
    }
  }

  // حفظ ملف JSON مجمع لكل الجداول
  const combinedFilePath = path.join(targetDir, 'all_data.json');
  fs.writeFileSync(combinedFilePath, JSON.stringify(backupResults, null, 2), 'utf-8');

  // حفظ ملف استعادة SQL
  const sqlContent = generateSqlRestore(backupResults);
  const sqlFilePath = path.join(targetDir, 'restore.sql');
  fs.writeFileSync(sqlFilePath, sqlContent, 'utf-8');

  // إنشاء رابط دائم لآخر نسخة (latest)
  const latestDir = path.join(process.cwd(), 'backups', 'latest');
  fs.mkdirSync(latestDir, { recursive: true });
  fs.writeFileSync(path.join(latestDir, 'all_data.json'), JSON.stringify(backupResults, null, 2), 'utf-8');
  fs.writeFileSync(path.join(latestDir, 'restore.sql'), sqlContent, 'utf-8');

  console.log('\n========================================================');
  console.log('🎉 اكتملت عملية النسخ الاحتياطي بنجاح!');
  console.log('========================================================');
  console.table(stats);

  const totalRecords = stats.reduce((acc, curr) => acc + curr.count, 0);
  console.log(`📊 إجمالي السجلات التي تم حفظها: ${totalRecords}`);
  console.log(`💾 مكان النسخة الاحتياطية:\n   -> ${targetDir}`);
  console.log(`💾 ملف الاستعادة السريع:\n   -> ${sqlFilePath}`);
  console.log('========================================================\n');
}

runBackup().catch(err => {
  console.error('\n❌ حدث خطأ غير متوقع أثناء النسخ الاحتياطي:', err);
  process.exit(1);
});
