const fs = require('fs');
const data = JSON.parse(fs.readFileSync('database/level-1-curriculum-synced.json', 'utf8'));
const { COPTIC_LETTERS_CATALOG } = require('../js/data/coptic-letters-catalog.js');

console.log('=== VERIFYING ALL 32 LETTERS AND WORDS ===');

const results = [];

data.units.forEach(u => {
  u.lessons.forEach(l => {
    // Only individual letter lessons (133 - 164)
    if (l.id >= 133 && l.id <= 164) {
      const textView = l.challenges.find(c => c.type === 'text_view');
      const select = l.challenges.find(c => c.type === 'select');
      const write = l.challenges.find(c => c.type === 'write');

      let wordInText = '', transInText = '', meanInText = '';
      if (textView && textView.correct_word) {
        const mWord = textView.correct_word.match(/الكلمة بالقبطية:\s*([^\n\r]+)/);
        const mTrans = textView.correct_word.match(/المعرب[^:]*:\s*«?([^»\n\r]+)»?/);
        const mMean = textView.correct_word.match(/المعنى بالعربية:\s*([^\n\r]+)/);
        if (mWord) wordInText = mWord[1].trim();
        if (mTrans) transInText = mTrans[1].trim();
        if (mMean) meanInText = mMean[1].trim();
      }

      const selCoptic = select ? select.coptic_display : '';
      const writeWord = write ? write.correct_word : '';
      const tiles = write ? write.tiles : [];
      const tilesJoined = Array.isArray(tiles) ? tiles.join('') : '';

      // Catalog match
      const letterIndex = l.id - 132; // 133 -> 1
      const catItem = COPTIC_LETTERS_CATALOG.find(c => c.id === letterIndex);

      results.push({
        id: l.id,
        letterNum: letterIndex,
        title: l.title,
        catalogPair: catItem ? catItem.pair : 'N/A',
        catalogWord: catItem ? catItem.word.coptic : 'N/A',
        catalogPhonetic: catItem ? catItem.word.phoneticAr : 'N/A',
        catalogMeaning: catItem ? catItem.word.meaning : 'N/A',
        textWord: wordInText,
        textMeaning: meanInText,
        selectCoptic: selCoptic,
        writeWord: writeWord,
        tiles: tiles,
        tilesMatch: tilesJoined === writeWord,
        synced: (
          catItem &&
          wordInText === catItem.word.coptic &&
          selCoptic === catItem.word.coptic &&
          writeWord === catItem.word.coptic &&
          meanInText === catItem.word.meaning
        )
      });
    }
  });
});

console.table(results.map(r => ({
  Num: r.letterNum,
  Letter: r.catalogPair,
  Word: r.writeWord,
  Mean: r.textMeaning,
  Tiles: r.tiles ? r.tiles.join('-') : '',
  TilesOK: r.tilesMatch ? '✅' : '❌',
  Synced: r.synced ? '✅' : '❌'
})));

const issues = results.filter(r => !r.synced || !r.tilesMatch);
if (issues.length === 0) {
  console.log('\n🎉 ALL 32 LETTERS AND WORDS ARE 100% SYNCED AND VALID!');
} else {
  console.log(`\n⚠️ Found ${issues.length} discrepancies:`);
  console.log(JSON.stringify(issues, null, 2));
}
