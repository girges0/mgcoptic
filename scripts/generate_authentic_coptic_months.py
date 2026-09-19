# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import asyncio
import edge_tts
import os
import shutil

# الشهور القبطية الـ 7 المطلوب إعادة توليدها بنطقها القبطي الأصيل من الوثيقة:
# 1. توت -> Ⲑⲱⲟⲩⲧ // Ⲑⲱⲑ -> ثُـوتْ
# 4. كيهك -> Ⲕⲟⲓⲁϩⲕ // Ⲭⲟⲓⲁⲕ -> كُـويَـاهْكْ
# 5. طوبة -> Ⲧⲱⲃⲓ -> تُـوبِـي
# 8. برمودة -> Ⲫⲁⲣⲙⲟⲩⲑⲓ -> فَـارْمُـوثِي
# 10. بؤونة -> Ⲡⲁⲱⲛⲓ -> بَـاوْنِي
# 12. مسرى -> Ⲙⲉⲥⲱⲣⲏ -> مِـيسُـورِي
# 13. النسيء (الشهر الصغير) -> Ⲡⲓⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲃⲟⲧ -> بِي كُـوجِي إِنْ آبُـوتْ

target_months = [
    {
        "id": 1,
        "name_ar": "توت",
        "name_coptic": "Ⲑⲱⲟⲩⲧ",
        "spoken": "ثُـوتْ",
        "filename": "month1_thout.mp3"
    },
    {
        "id": 4,
        "name_ar": "كيهك",
        "name_coptic": "Ⲕⲟⲓⲁϩⲕ",
        "spoken": "كُـويَـاهْكْ",
        "filename": "month4_kiahk.mp3"
    },
    {
        "id": 5,
        "name_ar": "طوبة",
        "name_coptic": "Ⲧⲱⲃⲓ",
        "spoken": "تُـوبِـي",
        "filename": "month5_tobi.mp3"
    },
    {
        "id": 8,
        "name_ar": "برمودة",
        "name_coptic": "Ⲫⲁⲣⲙⲟⲩⲑⲓ",
        "spoken": "فَـارْمُـوثِي",
        "filename": "month8_pharmouthi.mp3"
    },
    {
        "id": 10,
        "name_ar": "بؤونة",
        "name_coptic": "Ⲡⲁⲱⲛⲓ",
        "spoken": "بَـاوْنِي",
        "filename": "month10_paoni.mp3"
    },
    {
        "id": 12,
        "name_ar": "مسرى",
        "name_coptic": "Ⲙⲉⲥⲱⲣⲏ",
        "spoken": "مِـيسُـورِي",
        "filename": "month12_mesori.mp3"
    },
    {
        "id": 13,
        "name_ar": "النسيء",
        "name_coptic": "Ⲡⲓⲕⲟⲩϫⲓ ⲛ̀ⲁ̀ⲃⲟⲧ",
        "spoken": "بِي كُـوجِي إِنْ آبُـوتْ",
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
    print("--- توليد النطق القبطي الأصلي الدقيق للشهور المحددة ---")
    for item in target_months:
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
        print(f"✓ تم بنجاح: شهر {item['id']} {item['name_coptic']} ({item['name_ar']}) -> نطق: [{item['spoken']}] ({len(data)} بايت)")

if __name__ == '__main__':
    asyncio.run(run())
    print("TARGET_COPTIC_MONTHS_UPDATED_SUCCESSFULLY")
