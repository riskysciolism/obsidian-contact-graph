const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
first_name: Anna
last_name: Beispiel
relation: friend
circle: friends
---

\`\`\`contact-card
\`\`\`
`;

function setup() {
  return loadPlugin({
    files: new Map([
      [`${CONTACT_FOLDER}/Anna Beispiel.md`, NOTE],
      [`${CONTACT_FOLDER}/Bert Beispiel.md`, NOTE.replace("Anna", "Bert")],
    ]),
  });
}

async function openBulk(env) {
  const mod = require("../src/modals");
  const modal = new mod.BulkModal(env.plugin.app, env.plugin);
  await modal.onOpen();
  return modal;
}

test("Massenbearbeitung nutzt Auswahllisten", async () => {
  const env = setup();
  const modal = await openBulk(env);
  const selects = [...modal.contentEl.querySelectorAll("select")];
  assert.equal(selects.length, 2, "zwei Auswahllisten erwartet");
  const rel = selects[0];
  const values = [...rel.querySelectorAll("option")].map((o) => o.value);
  assert.ok(values.includes("neighbor"), "Beziehungsschlüssel fehlt");
  assert.ok(values.includes(""), "„nicht ändern“ fehlt");
  const circles = [...selects[1].querySelectorAll("option")].map((o) => o.value);
  assert.ok(circles.includes("family"));
});

test("Speichern schreibt verhaeltnis und kreis", async () => {
  const env = setup();
  const modal = await openBulk(env);
  const [rel, circle] = [...modal.contentEl.querySelectorAll("select")];
  rel.value = "neighbor";
  rel.onchange();
  circle.value = "work";
  circle.onchange();

  const boxes = [...modal.contentEl.querySelectorAll('input[type="checkbox"]')];
  boxes[0].checked = true;
  boxes[0].onchange();

  const apply = [...modal.contentEl.querySelectorAll("button")].find((b) => /Übernehmen|Apply/.test(b.textContent));
  assert.ok(apply, "Übernehmen fehlt");
  await apply.onclick();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /relation: neighbor/);
  assert.match(content, /circle: work/);
});

test("Ohne Auswahl kommt ein Hinweis statt eines Schreibvorgangs", async () => {
  const env = setup();
  const modal = await openBulk(env);
  const apply = [...modal.contentEl.querySelectorAll("button")].find((b) => /Übernehmen|Apply/.test(b.textContent));
  const before = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  await apply.onclick();
  assert.equal(env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`), before);
});

test("Nur Kreis setzen lässt das Verhältnis unberührt", async () => {
  const env = setup();
  const modal = await openBulk(env);
  const selects = [...modal.contentEl.querySelectorAll("select")];
  selects[1].value = "acquaintances";
  selects[1].onchange();
  const box = modal.contentEl.querySelector('input[type="checkbox"]');
  box.checked = true;
  box.onchange();
  const apply = [...modal.contentEl.querySelectorAll("button")].find((b) => /Übernehmen|Apply/.test(b.textContent));
  await apply.onclick();
  await new Promise((r) => setTimeout(r, 30));
  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /relation: friend/, "Verhältnis wurde überschrieben");
  assert.match(content, /circle: acquaintances/);
});
