const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
first_name: Tim
last_name: Test
---

\`\`\`contact-card
\`\`\`

## Links

- alt

## Interessen

Wandern

## Verlauf

- alter Eintrag

## Interessen

Bergsteigen
`;

test("Alte Überschriften werden hart umbenannt und Dubletten zusammengeführt", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const plugin = env.plugin;
  const changed = await plugin.store.migrateSections("Tim Test");
  assert.equal(changed, true);

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Tim Test.md`);
  assert.match(content, /## cg-links/);
  assert.match(content, /## cg-interests/);
  assert.match(content, /## cg-journal/);
  assert.equal((content.match(/## cg-interests/g) || []).length, 1, "Dublette bleibt stehen");
  assert.match(content, /Wandern/);
  assert.match(content, /Bergsteigen/);
  assert.doesNotMatch(content, /^## (Links|Interessen|Verlauf)$/m);
});

test("Schreiben landet nicht in einem alten Abschnitt", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const plugin = env.plugin;
  await plugin.store.writeSection("Tim Test", "cg-interests", "Klettern");
  const content = env.vault.files.get(`${CONTACT_FOLDER}/Tim Test.md`);
  assert.match(content, /## cg-interests\n\nKlettern/);
  assert.doesNotMatch(content, /^## Interessen$/m, "alter Abschnitt lebt weiter");
});

test("Zweiter Aufruf ändert nichts", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const plugin = env.plugin;
  await plugin.store.migrateSections("Tim Test");
  const once = env.vault.files.get(`${CONTACT_FOLDER}/Tim Test.md`);
  assert.equal(await plugin.store.migrateSections("Tim Test"), false);
  assert.equal(env.vault.files.get(`${CONTACT_FOLDER}/Tim Test.md`), once);
});
