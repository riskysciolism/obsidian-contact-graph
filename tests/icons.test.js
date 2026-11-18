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

const EMOJI = /[✏️🗑⟳⛶⤡＋]/u;

test("Karte nutzt Icon-Knöpfe statt Emoji", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Anna Beispiel.md`, NOTE]]) });
  const host = document.createElement("div");
  await env.plugin.renderContactCard(host, "Anna Beispiel", {});

  const buttons = [...host.querySelectorAll("button")];
  assert.ok(buttons.length >= 3, "zu wenige Knöpfe");
  for (const b of buttons) {
    assert.ok(!EMOJI.test(b.textContent), `Emoji im Knopf: ${b.textContent}`);
  }
  const icons = buttons.map((b) => b.dataset.icon).filter(Boolean);
  assert.ok(icons.includes("pencil"), "kein Stift-Icon");
  assert.ok(icons.includes("trash-2"), "kein Papierkorb-Icon");
  assert.ok(icons.includes("refresh-cw"), "kein Neu-laden-Icon");
});

test("Abschnittsdialog nutzt Lucide-Icons", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Anna Beispiel.md`, NOTE]]) });
  const mod = require("../src/modals");
  const modal = new mod.SectionEditModal(env.plugin.app, env.plugin, "Anna Beispiel", "cg-interests", "Wandern", null);
  await modal.onOpen();
  const icons = [...modal.contentEl.querySelectorAll("[data-icon]")].map((b) => b.dataset.icon).filter(Boolean);
  assert.ok(icons.includes("maximize-2"), `Icons: ${icons.join(",")}`);
  assert.ok(icons.includes("eye"), "Vorschau-Icon fehlt");
});
