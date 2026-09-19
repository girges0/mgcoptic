# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import asyncio
import edge_tts
import os
import shutil

# النطق العربي الكنسي السليم والمحبوب 100% للشهور السبعة:
# 1. توت -> تُوتْ
# 4. كيهك -> كِـيَهْـكْ
# 5. طوبة -> طُوبَة
# 8. برمودة -> بَرَمُودَة
# 10. بؤونة -> بَؤُونَة
# 12. مسرى -> مَسْرَا  (بالألف لضمان عدم نطقها مَسْرِي)
# 13. النسى -> النَّسِي (بدون همزة كما تنطق كنسياً)

canonical_months = [
    {
        "id": 1,
        "name_ar": "توت",
        "spoken": "تُوتْ",
        "filename": "month1_thout.mp3"
    },
    {
        "id": 4,
        "name_ar": "كيهك",
        "spoken": "كِـيَهْـكْ",
        "filename": "month4_kiahk.mp3"
    },
    {
        "id": 5,
        "name_ar": "طوبة",
        "spoken": "طُوبَة",
        "filename": "month5_tobi.mp3"
    },
    {
        "id": 8,
        "name_ar": "برمودة",
        "spoken": "بَرَمُودَة",
        "filename": "month8_pharmouthi.mp3"
    },
    {
        "id": 10,
        "name_ar": "بؤونة",
        "spoken": "بَؤُونَة",
        "filename": "month10_paoni.mp3"
    },
    {
        "id": 12,
        "name_ar": "مسرى",
        "spoken": "مَسْرَا",
        "filename": "month12_mesori.mp3"
    },
    {
        "id": 13,
        "name_ar": "النسى",
        "spoken": "النَّسِي",
        "filename": "month13_nasie.mp3"
    }
]

dirs = [
    'assets/sounds',
    'www/assets/sounds',
    'audio_coptic',
    'www/audio_coptic',
    'scratch'
]

async def run():
    print("--- توليد النطق العربي الكنسي الدقيق 100% للشهور السبعة ---")
    for item in canonical_months:
        fn = item["filename"]
        temp_path = os.path.join('scratch', fn)
        comm = edge_tts.Communicate(item["spoken"], 'ar-EG-ShakirNeural', rate='-8%')
        await comm.save(temp_path)
        with open(temp_path, 'rb') as f:
            data = f.read()
        for d in dirs:
            target = os.path.join(d, fn)
            with open(target, 'wb') as f:
                f.write(data)
        print(f"✓ تم بنجاح: شهر {item['id']} ({item['name_ar']}) -> نطق: [{item['spoken']}] ({len(data)} بايت)")

if __name__ == '__main__':
    asyncio.run(run())
    print("ALL_7_MONTHS_GENERATED_ACCURATELY_100_PERCENT")
