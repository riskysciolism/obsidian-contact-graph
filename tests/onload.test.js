const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin } = require("./helpers/env");

/* Fängt Fehler, die erst beim Laden des Plugins auftreten */
test("onload läuft ohne Fehler durch", async () => {
  const { plugin } = loadPlugin({ settings: undefined });
  plugin.settings = undefined;
  await plugin.onload();
  assert.ok(plugin.settings, "Einstellungen fehlen nach onload");
  assert.ok(Array.isArray(plugin.settings.sections), "Abschnitte fehlen");
});

test("onload hebt gespeicherte Abschnitte auf Kennungen", async () => {
  const { plugin } = loadPlugin({ settings: undefined });
  plugin._data = { sections: [{ title: "Verlauf", type: "journal" }, { title: "Details", type: "text" }] };
  await plugin.onload();
  const journal = plugin.settings.sections.find((s) => s.type === "journal");
  assert.equal(journal.heading, "cg-journal");
  assert.equal(journal.id, "journal");
});

test("onload ergänzt den Graph-Abschnitt genau einmal", async () => {
  const { plugin } = loadPlugin({ settings: undefined });
  plugin._data = { sections: [{ title: "Details", type: "text" }] };
  await plugin.onload();
  assert.equal(plugin.settings.sections.filter((s) => s.type === "graph").length, 1);
  await plugin.onload();
  assert.equal(plugin.settings.sections.filter((s) => s.type === "graph").length, 1);
});
