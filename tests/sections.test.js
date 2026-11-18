const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
vorname: Frieda
nachname: Freund
---

\`\`\`contact-card
\`\`\`

## Details
Alte Notiz

## Verlauf

### 2026-05-02 · Besprechung · Projektstart
Zusammenfassung: Rollen geklärt.

## Interessen
Wandern
`;

function setup() {
  const env = loadPlugin({
    files: new Map([[`${CONTACT_FOLDER}/Frieda Freund.md`, NOTE]]),
  });
  return { ...env, view: env.plugin };
}

test("Abschnitt lesen", async () => {
  const { view } = setup();
  const text = await view.readSection("Frieda Freund", "Details");
  assert.match(text, /Alte Notiz/);
  assert.doesNotMatch(text, /Interessen/);
});

test("Abschnitt schreiben ersetzt nur diesen Abschnitt", async () => {
  const { view, vault } = setup();
  await view.writeSection("Frieda Freund", "Details", "Neue Notiz");
  const content = vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`);
  assert.match(content, /Neue Notiz/);
  assert.doesNotMatch(content, /Alte Notiz/);
  assert.match(content, /## cg-interests\nWandern/);
  assert.match(content, /### 2026-05-02/);
});

test("Unbekannter Abschnitt wird angehängt", async () => {
  const { view, vault } = setup();
  await view.writeSection("Frieda Freund", "Neuer Abschnitt", "Inhalt");
  const content = vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`);
  assert.match(content, /## Neuer Abschnitt\n\nInhalt/);
});

test("Abschnitt entfernen löscht Überschrift und Inhalt", async () => {
  const { view, vault } = setup();
  await view.removeSection("Frieda Freund", "Verlauf");
  const content = vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`);
  assert.doesNotMatch(content, /## cg-journal/);
  assert.doesNotMatch(content, /Projektstart/);
  assert.match(content, /## cg-details/);
  assert.match(content, /## cg-interests/);
});

test("Entfernen des letzten Abschnitts lässt die Karte heil", async () => {
  const { view, vault } = setup();
  await view.removeSection("Frieda Freund", "Interessen");
  const content = vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`);
  assert.doesNotMatch(content, /Wandern/);
  assert.match(content, /```contact-card/);
});

test("Unbekannter Abschnitt entfernen ändert nichts", async () => {
  const { view, vault } = setup();
  await view.migrateSections("Frieda Freund");
  const before = vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`);
  await view.removeSection("Frieda Freund", "Gibt es nicht");
  assert.equal(vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`), before);
});

/* Codeblöcke dürfen Abschnitte nicht zerschneiden */
const FENCED = `---
type: contact
---

\`\`\`contact-card
\`\`\`

## Details
Text mit Beispiel:

\`\`\`markdown
## Beispiel
Das ist keine Überschrift.
\`\`\`

## Interessen
Wandern
`;

test("## in Codeblöcken beendet keinen Abschnitt", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Testperson.md`, FENCED]]) });
  const plugin = env.plugin;
  const text = await plugin.readSection("Testperson", "Details");
  assert.match(text, /## Beispiel/);
  assert.match(text, /Das ist keine Überschrift/);
});

test("## in Codeblöcken erzeugt keinen eigenen Abschnitt", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Testperson.md`, FENCED]]) });
  const sections = env.plugin.parseSections(FENCED);
  assert.ok(sections.has("Details"));
  assert.ok(!sections.has("Beispiel"));
  assert.match(sections.get("Interessen"), /Wandern/);
});

test("Schreiben lässt Codeblöcke intakt", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Testperson.md`, FENCED]]) });
  await env.plugin.writeSection("Testperson", "Details", "Neu:\n\n```js\n## harmlos\n```");
  const content = env.vault.files.get(`${CONTACT_FOLDER}/Testperson.md`);
  assert.match(content, /## cg-interests\nWandern/);
  assert.match(content, /## harmlos/);
});

test("Entfernen stoppt nicht am ## im Codeblock", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Testperson.md`, FENCED]]) });
  await env.plugin.removeSection("Testperson", "Details");
  const content = env.vault.files.get(`${CONTACT_FOLDER}/Testperson.md`);
  assert.doesNotMatch(content, /## Details/);
  assert.doesNotMatch(content, /Das ist keine Überschrift/);
  assert.match(content, /## cg-interests/);
});
