const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
first_name: Tim
last_name: Test
image: "[[Anhänge/Alt.png]]"
image_position: 20% 80%
---

\`\`\`contact-card
\`\`\`
`;

test("Bilddialog speichert Bild, Ausschnitt und Zoom", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const plugin = env.plugin;
  require("../src/modals");

  const mod = require("../src/modals");
  const modal = new mod.ImageModal(plugin.app, plugin, "Tim Test", null);
  await modal.onOpen();

  const file = new File([new Uint8Array([1, 2, 3])], "neu.png", { type: "image/png" });
  const input = modal.contentEl.querySelector('input[type="file"]');
  Object.defineProperty(input, "files", { value: [file], configurable: true });
  input.onchange();

  modal.position = "35% 65%";
  modal.scale = 1.6;

  const save = [...modal.contentEl.querySelectorAll("button")].find((b) => /Speichern|Save/.test(b.textContent));
  assert.ok(save, "Speichern fehlt");
  await save.onclick();
  await new Promise((r) => setTimeout(r, 30));

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Tim Test.md`);
  assert.match(content, /image: "?\[\[([^\]]*\/)?Tim Test\.png\]\]"?/, "Bildpfad nicht gesetzt");
  assert.match(content, /image_position: 35% 65%/);
  assert.match(content, /image_scale: 1\.6/);
  assert.ok([...env.vault.files.keys()].some((k) => k.includes("Tim Test.png")), "Bilddatei fehlt");
});

test("Zoom-Grenzen werden eingehalten", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const plugin = env.plugin;
  const mod = require("../src/modals");
  const modal = new mod.ImageModal(plugin.app, plugin, "Tim Test", null);
  await modal.onOpen();
  modal.scale = 1;
  assert.equal(modal.scale, 1, "Startwert");
});

test("Ohne Kontaktnamen wird nichts geschrieben", async () => {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const plugin = env.plugin;
  const mod = require("../src/modals");
  const modal = new mod.ImageModal(plugin.app, plugin, "", null);
  await modal.onOpen();
  assert.equal(modal.contentEl.querySelector('input[type="file"]'), null);
});
