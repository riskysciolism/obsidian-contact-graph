const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
first_name: Tim
last_name: Test
image: "[[Tim Test.png]]"
---

\`\`\`contact-card
\`\`\`
`;

function pe(type, x, y, id = 1) {
  const Ev = document.defaultView ? document.defaultView.Event : Event;
  const ev = new Ev(type, { bubbles: true, cancelable: true });
  Object.defineProperties(ev, {
    clientX: { value: x },
    clientY: { value: y },
    pointerId: { value: id },
    pointerType: { value: "touch" },
  });
  return ev;
}

async function openModal() {
  const env = loadPlugin({ files: new Map([[`${CONTACT_FOLDER}/Tim Test.md`, NOTE]]) });
  const mod = require("../src/modals");
  const modal = new mod.ImageModal(env.plugin.app, env.plugin, "Tim Test", null);
  await modal.onOpen();
  const crop = modal.contentEl.querySelector(".cg-crop");
  crop.getBoundingClientRect = () => ({ width: 200, height: 200, left: 0, top: 0 });
  return { modal, crop };
}

test("Finger verschiebt den Ausschnitt", async () => {
  const { modal, crop } = await openModal();
  crop.dispatchEvent(pe("pointerdown", 100, 100));
  crop.dispatchEvent(pe("pointermove", 40, 100));
  crop.dispatchEvent(pe("pointerup", 40, 100));
  const [x] = modal.position.split(" ").map(parseFloat);
  assert.ok(x > 60, `Ausschnitt nicht verschoben: ${modal.position}`);
});

test("Zwei Finger zoomen", async () => {
  const { modal, crop } = await openModal();
  assert.equal(modal.scale, 1);
  crop.dispatchEvent(pe("pointerdown", 50, 100, 1));
  crop.dispatchEvent(pe("pointerdown", 150, 100, 2));
  crop.dispatchEvent(pe("pointermove", 0, 100, 1));
  crop.dispatchEvent(pe("pointermove", 200, 100, 2));
  assert.ok(modal.scale > 1.5, `Zoom blieb bei ${modal.scale}`);
  assert.ok(modal.scale <= 3);
});

test("Zoomen über den Regler bleibt möglich", async () => {
  const { modal, crop } = await openModal();
  const range = modal.contentEl.querySelector('input[type="range"]');
  range.value = "2";
  range.oninput();
  assert.equal(modal.scale, 2);
  assert.match(crop.style.backgroundSize, /^200%\s+200%$/);
});

test("Loslassen beendet die Bewegung", async () => {
  const { modal, crop } = await openModal();
  crop.dispatchEvent(pe("pointerdown", 100, 100));
  crop.dispatchEvent(pe("pointerup", 100, 100));
  const before = modal.position;
  crop.dispatchEvent(pe("pointermove", 20, 20));
  assert.equal(modal.position, before);
});
