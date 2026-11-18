const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
first_name: Anna
last_name: Beispiel
---

\`\`\`contact-card
\`\`\`

## cg-interests

Wandern
`;

function setup() {
  return loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Anna Beispiel.md`, NOTE]]) });
}

async function open(env, heading = "cg-interests") {
  const mod = require("../src/modals");
  const modal = new mod.SectionEditModal(env.plugin.app, env.plugin, "Anna Beispiel", heading, "Wandern", null);
  await modal.onOpen();
  return modal;
}

test("Dialog zeigt den übersetzten Abschnittsnamen, nicht die Kennung", async () => {
  const env = setup();
  const modal = await open(env);
  const h = modal.contentEl.querySelector("h3");
  assert.equal(h.textContent, "Interessen");
});

test("Text wird im Dialog bearbeitet und gespeichert", async () => {
  const env = setup();
  const modal = await open(env);
  const ta = modal.contentEl.querySelector("textarea");
  ta.value = "Klettern\n\nLesen";
  const save = [...modal.contentEl.querySelectorAll("button")].find((b) => /Speichern/.test(b.textContent));
  await save.onclick();
  await new Promise((r) => setTimeout(r, 20));
  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /Klettern/);
  assert.match(content, /Lesen/);
  assert.doesNotMatch(content, /Wandern/);
});

test("Maximieren schaltet die Klasse um", async () => {
  const env = setup();
  const modal = await open(env);
  const maxBtn = [...modal.contentEl.querySelectorAll("button")].find((b) => b.dataset.icon === "maximize-2");
  assert.ok(maxBtn, "Maximieren-Knopf fehlt");
  maxBtn.onclick();
  assert.ok(modal.modalEl.classList.contains("cg-maximized"));
  maxBtn.onclick();
  assert.ok(!modal.modalEl.classList.contains("cg-maximized"));
  assert.equal(maxBtn.dataset.icon, "maximize-2");
});

test("Strg+Enter speichert", async () => {
  const env = setup();
  const modal = await open(env);
  const ta = modal.contentEl.querySelector("textarea");
  ta.value = "Per Tastatur";
  const ev = new (document.defaultView ? document.defaultView.KeyboardEvent : Event)("keydown",
    { key: "Enter", ctrlKey: true, bubbles: true, cancelable: true });
  modal.contentEl.onkeydown(ev);
  await new Promise((r) => setTimeout(r, 20));
  assert.match(env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`), /Per Tastatur/);
});

test("Vorschau rendert statt zu speichern", async () => {
  const env = setup();
  const modal = await open(env);
  const prev = modal.contentEl.querySelector(".cg-sec-preview");
  const btn = [...modal.contentEl.querySelectorAll("button")].find((b) => /Vorschau/.test(b.textContent));
  await btn.onclick();
  assert.equal(prev.style.display, "");
  assert.equal(modal.contentEl.querySelector("textarea").style.display, "none");
  await btn.onclick();
  assert.equal(prev.style.display, "none");
});
