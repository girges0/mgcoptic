# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import asyncio
import edge_tts
import os
import shutil

# الشهور القبطية الـ 13 - تم حذف النصف الثاني (الكلمة الغريبة) والإبقاء فقط على النصف الأول (النطق السليم الصافي)
months = [
    {"id": 1, "name_ar": "توت", "spoken": "تُـوتْ", "filename": "month1_thout.mp3"},
    {"id": 2, "name_ar": "بابه", "spoken": "بَـابَـه", "filename": "month2_paopi.mp3"},
    {"id": 3, "name_ar": "هاتور", "spoken": "هَاتُـور", "filename": "month3_hathor.mp3"},
    {"id": 4, "name_ar": "كيهك", "spoken": "كِـيَهْـكْ", "filename": "month4_kiahk.mp3"},
    {"id": 5, "name_ar": "طوبة", "spoken": "طُـوبَـة", "filename": "month5_tobi.mp3"},
    {"id": 6, "name_ar": "أمشير", "spoken": "أَمْشِـير", "filename": "month6_meshir.mp3"},
    {"id": 7, "name_ar": "برمهات", "spoken": "بَرَمْهَـات", "filename": "month7_paremhat.mp3"},
    {"id": 8, "name_ar": "برمودة", "spoken": "بَرَمُـودَة", "filename": "month8_pharmouthi.mp3"},
    {"id": 9, "name_ar": "بشنس", "spoken": "بَشَنْـس", "filename": "month9_pashons.mp3"},
    {"id": 10, "name_ar": "بؤونة", "spoken": "بَؤُونَـة", "filename": "month10_paoni.mp3"},
    {"id": 11, "name_ar": "أبيب", "spoken": "أَبِيـب", "filename": "month11_epep.mp3"},
    {"id": 12, "name_ar": "مسرى", "spoken": "مَسْـرَى", "filename": "month12_mesori.mp3"},
    {"id": 13, "name_ar": "النسيء", "spoken": "النَّسِيء", "filename": "month13_nasie.mp3"}
]

dirs = [
    'assets/sounds',
    'www/assets/sounds',
    'audio_coptic',
    'www/audio_coptic',
    'scratch'
]

backup_dir = '.backups_months_before_half_trim'
os.makedirs(backup_dir, exist_ok=True)

# 1. أخذ نسخة احتياطية من الملفات الحالية قبل التعديل
for item in months:
    src = os.path.join('assets/sounds', item["filename"])
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(backup_dir, item["filename"]))

for d in dirs:
    os.makedirs(d, exist_ok=True)

async def generate_half():
    print("--- توليد النصف الأول فقط وحذف الكلمات الغريبة لجميع الشهور الـ 13 ---")
    for item in months:
        comm = edge_tts.Communicate(item["spoken"], 'ar-EG-ShakirNeural', rate='-8%')
        temp_path = os.path.join('scratch', item["filename"])
        await comm.save(temp_path)
        with open(temp_path, 'rb') as f:
            data = f.read()
        for d in dirs:
            target = os.path.join(d, item["filename"])
            with open(target, 'wb') as f:
                f.write(data)
        print(f"✓ تم ضبط شهر {item['id']} ({item['name_ar']}) -> {item['filename']} [{item['spoken']}] ({len(data)} بايت)")

if __name__ == '__main__':
    asyncio.run(generate_half())
    print("ALL_MONTHS_TRIMMED_TO_HALF_SUCCESSFULLY")
