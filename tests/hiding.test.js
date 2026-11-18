const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin } = require("./helpers/env");

function preview(html) {
  const root = document.createElement("div");
  root.className = "markdown-preview-view";
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
}

const hidden = (root) => [...root.querySelectorAll(".cg-hidden-section")].map((e) => e.textContent.trim());

test("Abschnittsüberschrift und Inhalt werden versteckt", () => {
  const { plugin } = loadPlugin();
  const root = preview("<div><h2>Journal</h2><p>Eintrag</p><h2>Interests</h2><p>Wandern</p></div>");
  plugin.hideRawSections(root.firstChild, ["Journal"], {}, null);
  const names = hidden(root);
  assert.ok(names.includes("Journal"), "Überschrift sichtbar");
  assert.ok(names.includes("Eintrag"), "Inhalt sichtbar");
  assert.ok(!names.includes("Wandern"), "fremder Abschnitt wurde versteckt");
});

test("Mehrere Abschnitte werden versteckt", () => {
  const { plugin } = loadPlugin();
  const root = preview("<h2>Links</h2><p>a</p><h2>Journal</h2><p>b</p><h2>Graph</h2><p>c</p>");
  plugin.hideRawSections(root, ["Links", "Journal"], {}, null);
  const names = hidden(root);
  assert.deepEqual(names, ["Links", "a", "Journal", "b"]);
});

test("Obsidian-Wrapper um Überschriften wird erkannt", () => {
  const { plugin } = loadPlugin();
  const root = preview('<div class="el-h2"><h2>Journal</h2></div><div class="el-p"><p>Eintrag</p></div><div class="el-h2"><h2>Details</h2></div><div class="el-p"><p>frei</p></div>');
  plugin.hideRawSections(root, ["Journal"], {}, null);
  const names = hidden(root);
  assert.ok(names.some((t) => t.includes("Journal")), "Überschrift nicht versteckt");
  assert.ok(names.some((t) => t.includes("Eintrag")), "Inhalt nicht versteckt");
  assert.ok(!names.some((t) => t.includes("frei")), "fremder Abschnitt wurde versteckt");
});

test("Ohne Abschnitte passiert nichts", () => {
  const { plugin } = loadPlugin();
  const root = preview("<div><h2>Journal</h2><p>x</p></div>");
  plugin.hideRawSections(root.firstChild, [], {}, null);
  assert.equal(hidden(root).length, 0);
});
