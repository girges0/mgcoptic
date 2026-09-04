const fs = require('fs');

const origCss = fs.readFileSync('orig_styles.css', 'utf8');
const currCss = fs.readFileSync('css/pages/home.css', 'utf8');

// Find the section "NEW HOMEPAGE DESIGN SYSTEM STYLES" in origCss
const origStart = origCss.indexOf('/* ============ NEW HOMEPAGE DESIGN SYSTEM STYLES ============ */');
const origEnd = origCss.indexOf('/* ============ LEADERBOARD / التصنيف STYLES ============ */');

console.log('origStart:', origStart, 'origEnd:', origEnd);

if (origStart !== -1 && origEnd !== -1) {
  const homeBlock = origCss.substring(origStart, origEnd);
  fs.writeFileSync('orig_home_block.css', homeBlock);
  console.log('Saved orig_home_block.css, length:', homeBlock.length);
}

// Also check the HERO / HOME tab section in origCss
const heroStart = origCss.indexOf('/* ============ HOME / HERO (now a swipeable tab-panel) ============ */');
const heroEnd = origCss.indexOf('/* ============ DICTIONARY CARDS ============ */');
console.log('heroStart:', heroStart, 'heroEnd:', heroEnd);
if (heroStart !== -1 && heroEnd !== -1) {
  const heroBlock = origCss.substring(heroStart, heroEnd);
  fs.writeFileSync('orig_hero_block.css', heroBlock);
  console.log('Saved orig_hero_block.css, length:', heroBlock.length);
}
