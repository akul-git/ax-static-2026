const fs = require('fs');

const json = JSON.parse(
  fs.readFileSync('./akul.icomoon.json', 'utf8')
);

/*
Adjust these counts.
Example only.
*/
const groups = [
  ['businesspeople', 31],
  ['development', 42],
  ['construction', 28],
  ['analytics', 35],
  ['businessoffice', 19],
  ['corporatebusiness', 24],
];

let index = 0;

for (const [prefix, count] of groups) {
  for (let i = 1; i <= count; i++) {
    const glyph = json.glyphs[index];

    if (!glyph?.extras) {
      throw new Error(`Glyph ${index} missing extras`);
    }

    glyph.extras.name =
      `${prefix}-${String(i).padStart(2, '0')}`;

    index++;
  }
}

fs.writeFileSync(
  './akul.renamed.icomoon.json',
  JSON.stringify(json, null, 2)
);

console.log('Done!');