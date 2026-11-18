const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

test("GraphBuilder liest Kontakte und baut Beziehungen", () => {
  const { plugin } = loadPlugin();
  const contacts = plugin.graph.contacts();
  assert.ok(contacts["Ich Selbst"]);
  assert.equal(contacts["Ich Selbst"].ghost, undefined);

  const { notes, rel } = plugin.graph.buildGraph();
  assert.ok(notes["Kim Beispiel"]);
  assert.ok(rel["Ich Selbst"].children.includes("Kim Beispiel"));
});

test("Ergebnis wird kurz zwischengespeichert", () => {
  const { plugin } = loadPlugin();
  const a = plugin.graph.buildGraph();
  const b = plugin.graph.buildGraph();
  assert.equal(a, b, "zweiter Aufruf sollte dasselbe Objekt liefern");
});

test("invalidate() verwirft den Zwischenspeicher", () => {
  const { plugin } = loadPlugin();
  const a = plugin.graph.buildGraph();
  plugin.graph.invalidate();
  const b = plugin.graph.buildGraph();
  assert.notEqual(a, b);
});

test("Graphaufbau schreibt nichts in die Notizen", async () => {
  const { plugin, vault } = loadPlugin();
  const before = new Map(vault.files);
  plugin.graph.buildGraph();
  plugin.graph.planCompletion();
  const { notes, rel } = plugin.graph.buildGraph();
  plugin.graph.walk(rel, notes, "Ich Selbst", 3, true);
  assert.deepEqual(new Map(vault.files), before);
});

test("Dateien mit Konflikt im Namen werden ausgeschlossen", () => {
  const files = new Map([
    [`${CONTACT_FOLDER}/Ich Selbst.md`, "---\ntype: contact\n---\n"],
    [`${CONTACT_FOLDER}/Doppelt (conflict 2026-01-01).md`, "---\ntype: contact\n---\n"],
  ]);
  const { plugin } = loadPlugin({ files, settings: { exclude: "conflict" } });
  const contacts = plugin.graph.contacts();
  assert.ok(contacts["Ich Selbst"]);
  assert.ok(!Object.keys(contacts).some((n) => n.includes("conflict")));
});

test("walk verändert die Beziehungsdaten nicht", () => {
  const { plugin } = loadPlugin();
  const { notes, rel } = plugin.graph.buildGraph();
  const before = JSON.stringify(rel["Ich Selbst"]);
  plugin.graph.walk(rel, notes, "Ich Selbst", 3, true);
  assert.equal(JSON.stringify(rel["Ich Selbst"]), before);
});
