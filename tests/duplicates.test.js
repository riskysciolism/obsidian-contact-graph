const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const ANNA = `---
type: contact
first_name: Thomas
last_name: Mueller
---

\`\`\`contact-card
\`\`\`
`;

const SRC = `---
type: contact
first_name: Anna
last_name: Beispiel
---

\`\`\`contact-card
\`\`\`
`;

function setup() {
  return loadPlugin({
    files: new Map([
      [`${CONTACT_FOLDER}/Anna Beispiel.md`, SRC],
      [`${CONTACT_FOLDER}/Thomas Mueller.md`, ANNA],
      [`${CONTACT_FOLDER}/Thomas Mueller (Feuerwehr).md`, ANNA],
    ]),
  });
}

test("namensgleiche Kontakte werden gefunden, auch mit Zusatz im Dateinamen", () => {
  const env = setup();
  const hits = env.plugin.store.findByName("Thomas Mueller");
  assert.deepEqual(hits.sort(), ["Thomas Mueller", "Thomas Mueller (Feuerwehr)"]);
});

test("Anlegen mit gleichem Namen wird abgelehnt", async () => {
  const env = setup();
  const ok = await env.plugin.store.createContact("Thomas Mueller");
  assert.equal(ok, false);
  assert.ok(!env.vault.files.has(`${CONTACT_FOLDER}/Thomas Mueller 1.md`));
});

test("Anlegen mit Zusatz ist erlaubt", async () => {
  const env = setup();
  const ok = await env.plugin.createContactFromName("Thomas Mueller (Arbeit)");
  assert.equal(ok, true, "Zusatz wurde abgelehnt");
  assert.ok(env.vault.files.has(`${CONTACT_FOLDER}/Thomas Mueller (Arbeit).md`));
});

test("Vervollständigung meldet doppelte Namen als Warnung", () => {
  const env = setup();
  const { notes } = env.plugin.buildGraph();
  const plan = env.plugin.graph.auxIssues(notes);
  const dupes = plan.filter((i) => i.kind === "duplicate_name");
  assert.deepEqual(dupes.map((d) => d.name).sort(), ["Thomas Mueller", "Thomas Mueller (Feuerwehr)"]);
  assert.equal(dupes[0].action, "warn");
});

test("Warnungen werden nicht angewendet", async () => {
  const env = setup();
  const plan = [{ kind: "duplicate_name", name: "Thomas Mueller", field: "__name", value: "x", action: "warn" }];
  await env.plugin.applyCompletion(plan);
  assert.match(env.vault.files.get(`${CONTACT_FOLDER}/Thomas Mueller.md`), /first_name: Thomas/);
  assert.doesNotMatch(env.vault.files.get(`${CONTACT_FOLDER}/Thomas Mueller.md`), /__name/);
});
