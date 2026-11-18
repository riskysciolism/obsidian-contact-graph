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

function setup() {
  return loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Anna Beispiel.md`, SRC]]) });
}

async function openAdd(env) {
  const mod = require("../src/modals");
  const modal = new mod.RelationPickerModal(env.plugin.app, env.plugin, "Anna Beispiel", "siblings", null);
  await modal.onOpen();
  return modal;
}

test("Zwei unbekannte Namen in einem Lauf landen beide in der Notiz", async () => {
  const env = setup();
  const modal = await openAdd(env);
  const search = modal.contentEl.querySelector('input[type="text"]');

  const addUnknown = (name) => {
    search.value = name;
    search.oninput();
    const row = [...modal.contentEl.querySelectorAll(".cg-pick-row")].find((r) => r.textContent.includes(name));
    assert.ok(row, `Zeile für ${name} fehlt`);
    row.onclick();
  };
  addUnknown("Paul Ghost");
  addUnknown("Petra Ghost");

  const apply = [...modal.contentEl.querySelectorAll("button")].find((b) => /^Hinzufügen/.test(b.textContent));
  await apply.onclick();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /\[\[Paul Ghost\]\]/, "erster Name fehlt");
  assert.match(content, /\[\[Petra Ghost\]\]/, "zweiter Name fehlt");
});

test("Speichern im Kontaktdialog löscht frisch verknüpfte Ghosts nicht", async () => {
  const env = setup();
  const mod = require("../src/modals");
  const modal = new mod.ContactModal(env.plugin.app, env.plugin, { name: "Anna Beispiel" });
  await modal.onOpen();

  /* zwei Geister direkt über den Store verknüpfen, wie es der Dialog tut */
  await env.plugin.addRelation("Anna Beispiel", "siblings", "Paul Ghost");
  await env.plugin.addRelation("Anna Beispiel", "siblings", "Petra Ghost");

  await modal.save();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.match(content, /\[\[Paul Ghost\]\]/, "Paul wurde beim Speichern entfernt");
  assert.match(content, /\[\[Petra Ghost\]\]/, "Petra wurde beim Speichern entfernt");
});

test("Entfernen einer Beziehung wirkt beim Speichern", async () => {
  const env = setup();
  const mod = require("../src/modals");
  const modal = new mod.ContactModal(env.plugin.app, env.plugin, { name: "Anna Beispiel" });
  await env.plugin.addRelation("Anna Beispiel", "siblings", "Paul Ghost");
  await modal.onOpen();

  const wrap = [...modal.contentEl.querySelectorAll(".cg-rel")].find((w) => w.textContent.includes("Paul Ghost"));
  assert.ok(wrap, "Beziehungsblock fehlt");
  wrap.querySelector(".cg-chip-x").onclick();
  await modal.save();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Anna Beispiel.md`);
  assert.doesNotMatch(content, /Paul Ghost/, "Entfernte Beziehung blieb stehen");
});
