import fs from 'node:fs';

const FILE = './akul.icomoon.json';
const PREFIX = 'businesspeople';

const json = JSON.parse(fs.readFileSync(FILE, 'utf8'));

let count = 1;

for (const glyph of json.glyphs) {
  const extras = glyph.extras;

  // skip space character
  if (!extras?.codePoint || extras.codePoint < 59648) continue;

  extras.name = `${PREFIX}-${String(count).padStart(2, '0')}`;
  count++;
}

fs.writeFileSync(
  `./akul.${PREFIX}.json`,
  JSON.stringify(json, null, 2)
);

console.log(`Done. Renamed ${count - 1} icons.`);