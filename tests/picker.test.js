const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const SRC = `---
type: contact
first_name: Anna
last_name: Beispiel
---

\`\`\`contact-card
\`\`\`
`;

const OTHER = `---
type: contact
first_name: Bert
last_name: Beispiel
---

\`\`\`contact-card
\`\`\`
`;

function setup() {
  return loadPlugin({
    files: new Map([
      [`${CONTACT_FOLDER}/Anna Beispiel.md`, SRC],
      [`${CONTACT_FOLDER}/Bert Beispiel.md`, OTHER],
    ]),
  });
}

async function openPicker(env) {
  const mod = require("../src/modals");
  const modal = new mod.RelationPickerModal(env.plugin.app, env.plugin, "Anna Beispiel", "partner", null);
  await modal.onOpen();
  return modal;
}

const btn = (modal, re) => [...modal.contentEl.querySelectorAll("button")].find((b) => re.test(b.textContent));

test("Der Anlegen-Schalter ist ein Schalter, kein Knopf", async () => {
  const env = setup();
  const modal = await openPicker(env);
  const box = modal.contentEl.querySelector('input[type="checkbox"].cg-switch');
  assert.ok(box, "Schalter fehlt");
  assert.equal(box.checked, false, "Vorgabe soll „nur verknüpfen“ sein");
  assert.equal(modal.contentEl.querySelector(".cg-pick-actions"), null, "alte Knopfleiste ist noch da");
});

test("Nur verknüpfen erzeugt die Verknüpfung ohne Notiz", async () => {
  const env = setup();
  const modal = await openPicker(env);
  const search = modal.contentEl.querySelector('input[type="text"]');
  search.value = "Neue Person";
  search.oninput();

  await btn(modal, /^Hinzufügen/).onclick();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /\[\[Neue Person\]\]/, "Verknüpfung fehlt");
  assert.ok(![...env.vault.files.keys()].some((k) => k.includes("Neue Person.md")), "Notiz wurde angelegt");
});

test("Schalter an legt die Notiz an und verknüpft", async () => {
  const env = setup();
  const modal = await openPicker(env);
  const search = modal.contentEl.querySelector('input[type="text"]');
  search.value = "Neue Person";
  search.oninput();
  const box = modal.contentEl.querySelector(".cg-switch");
  box.checked = true;
  box.onchange();

  await btn(modal, /^Hinzufügen/).onclick();
  await new Promise((r) => setTimeout(r, 30));

  assert.ok([...env.vault.files.keys()].some((k) => k.includes("Neue Person.md")), "Notiz fehlt");
  assert.match(env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`), /\[\[Neue Person\]\]/);
});

test("Ausgewählte Kontakte und getippter Name gehen in einem Zug", async () => {
  const env = setup();
  const modal = await openPicker(env);
  const search = modal.contentEl.querySelector('input[type="text"]');
  search.value = "";
  search.oninput();

  const row = [...modal.contentEl.querySelectorAll(".cg-pick-row")].find((r) => r.textContent.includes("Bert Beispiel"));
  row.onclick();

  search.value = "Dritte Person";
  search.oninput();

  const apply = btn(modal, /^Hinzufügen/);
  assert.match(apply.textContent, /1/, "Zähler fehlt");
  await apply.onclick();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /\[\[Bert Beispiel\]\]/, "ausgewählter Kontakt fehlt");
  assert.match(content, /\[\[Dritte Person\]\]/, "getippter Name fehlt");

  const bert = env.vault.files.get(`${CONTACT_FOLDER}/Bert Beispiel.md`);
  assert.match(bert, /\[\[Anna Beispiel\]\]/, "Gegenrichtung fehlt");
});

test("Vorgegebene Kategorie ist ausgewählt und gesperrt", async () => {
  const env = setup();
  const mod = require("../src/modals");
  const modal = new mod.RelationPickerModal(env.plugin.app, env.plugin, "Anna Beispiel", "parents", null);
  await modal.onOpen();
  const sel = modal.contentEl.querySelector("select");
  assert.equal(sel.value, "parents");
  assert.equal(sel.disabled, true, "Kategorie ist änderbar");
  assert.ok(sel.className.includes("cg-locked"));
});

test("Auswahlliste zeigt übersetzte Kategorie statt Schlüssel", async () => {
  const env = setup();
  const modal = await openPicker(env);
  const sel = modal.contentEl.querySelector("select");
  const texts = [...sel.querySelectorAll("option")].map((o) => o.textContent);
  assert.ok(texts.some((t2) => t2.startsWith("Familie ·")), `Rohschlüssel sichtbar: ${texts[0]}`);
  assert.ok(!texts.some((t2) => /^family\b/i.test(t2)), "englischer Gruppenschlüssel sichtbar");
  assert.ok(texts.some((t2) => /Partner/.test(t2)), "Beziehung nicht übersetzt");
});

test("Überschriften enthalten keine Schlüssel", async () => {
  const env = setup();
  const mod = require("../src/modals");
  const modal = new mod.ContactModal(env.plugin.app, env.plugin, { name: "Anna Beispiel" });
  await modal.onOpen();
  await new Promise((r) => setTimeout(r, 20));
  const heads = [...modal.contentEl.querySelectorAll("h3, h4")].map((h) => h.textContent);
  assert.ok(heads.length > 0, "keine Überschriften");
  for (const h of heads) {
    assert.ok(!/^[a-z]+\.[a-z]/i.test(h), `Schlüssel als Überschrift: ${h}`);
    assert.ok(!/^cg-/.test(h), `technische Kennung als Überschrift: ${h}`);
  }
});
