const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

/* Es gelten ausschließlich die englischen Schlüssel. Altfelder werden ignoriert. */
const LEGACY = `---
type: contact
vorname: Lena
nachname: Alt
geschlecht: w
verhaeltnis: Nachbarin
kreis: Familie
eltern:
  - "[[Alex Beispiel]]"
kennengelernt: 2020
---

## Verlauf

### 2026-05-02 · Besprechung · Altbestand
Zusammenfassung: aus alter Notiz.
`;

test("deutsche Frontmatter-Schlüssel werden ignoriert", () => {
  const files = new Map([[`${CONTACT_FOLDER}/Lena Alt.md`, LEGACY]]);
  const { plugin } = loadPlugin({ files });
  const { notes, rel } = plugin.buildGraph();
  const fm = notes["Lena Alt"].fm;
  assert.equal(fm.first_name, undefined, "vorname wurde übernommen");
  assert.equal(fm.relation, undefined, "verhaeltnis wurde übernommen");
  assert.equal(fm.circle, undefined, "kreis wurde übernommen");
  assert.deepEqual(rel["Lena Alt"].parents, [], "eltern wurde als parents gelesen");
});

test("englische Schlüssel werden gelesen", () => {
  const note = LEGACY.replace("vorname: Lena", "first_name: Lena")
    .replace("geschlecht: w", "gender: w")
    .replace("verhaeltnis: Nachbarin", "relation: neighbor")
    .replace("kreis: Familie", "circle: family")
    .replace("eltern:", "parents:");
  const files = new Map([[`${CONTACT_FOLDER}/Lena Alt.md`, note]]);
  const { plugin } = loadPlugin({ files });
  const { notes } = plugin.buildGraph();
  assert.equal(notes["Lena Alt"].fm.first_name, "Lena");
  assert.equal(notes["Lena Alt"].fm.relation, "neighbor");
  assert.equal(notes["Lena Alt"].fm.circle, "family");
});

test("alte Abschnittsüberschrift wird umbenannt", async () => {
  const files = new Map([[`${CONTACT_FOLDER}/Lena Alt.md`, LEGACY]]);
  const { plugin, vault } = loadPlugin({ files });
  assert.equal(await plugin.migrateSections("Lena Alt"), true);
  const content = vault.files.get(`${CONTACT_FOLDER}/Lena Alt.md`);
  assert.match(content, /^## cg-journal$/m);
});

test("kreisOf liest nur circle", () => {
  const files = new Map([[`${CONTACT_FOLDER}/Lena Alt.md`, LEGACY]]);
  const { plugin } = loadPlugin({ files, settings: { kreisFallback: false } });
  const { notes } = plugin.buildGraph();
  assert.deepEqual(plugin.kreisOf("Lena Alt", notes), []);
});
