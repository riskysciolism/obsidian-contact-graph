const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER, parseFrontmatter } = require("./helpers/env");

const relationsOnly = (plan) => plan.filter((p) => p.kind === "relation");

test("Vervollständigung schlägt Gegenrichtungen vor", () => {
  const { plugin } = loadPlugin();
  const plan = relationsOnly(plugin.planCompletion());
  const forAlex = plan.find((p) => p.name === "Alex Beispiel" && p.field === "children");
  assert.ok(forAlex, "Alex sollte Kinder ergänzt bekommen");
  assert.ok(forAlex.add.includes("Ich Selbst"));
});

test("Vervollständigung löscht nichts", () => {
  const { plugin } = loadPlugin();
  const plan = plugin.planCompletion();
  for (const item of plan) {
    assert.ok(item.action !== "remove", "Entfernen darf nicht vorgeschlagen werden");
    if (item.kind === "relation") assert.ok(Array.isArray(item.add) && item.add.length > 0);
  }
});

test("Vervollständigung ist nach dem Anwenden leer (Idempotenz)", async () => {
  const { plugin, vault } = loadPlugin();
  const before = relationsOnly(plugin.planCompletion());
  assert.ok(before.length > 0, "Fixture sollte offene Gegenrichtungen haben");

  await plugin.applyCompletion(before);
  plugin.refresh();
  plugin._gc = null;

  const after = relationsOnly(plugin.planCompletion());
  assert.deepEqual(after, [], `immer noch offen: ${JSON.stringify(after)}`);
});

test("Anwenden schreibt die Ergänzungen in die Notiz", async () => {
  const { plugin, vault } = loadPlugin();
  const plan = relationsOnly(plugin.planCompletion());
  await plugin.applyCompletion(plan);
  const fm = parseFrontmatter(vault.files.get(`${CONTACT_FOLDER}/Alex Beispiel.md`));
  assert.ok(fm.children && fm.children.includes("[[Ich Selbst]]"), "kinder fehlt bei Alex");
});

test("Großeltern werden aus den Eltern abgeleitet", () => {
  const { plugin } = loadPlugin();
  const plan = relationsOnly(plugin.planCompletion());
  const forKim = plan.find((p) => p.name === "Kim Beispiel" && p.field === "grandparents");
  assert.ok(forKim, "Kim sollte Großeltern bekommen");
  assert.deepEqual(forKim.add, ["Alex Beispiel", "Andrea Beispiel"]);

  const forMe = plan.find((p) => p.name === "Ich Selbst" && p.field === "grandparents");
  assert.ok(forMe, "Ich sollte Großeltern bekommen");
  assert.deepEqual(forMe.add, ["Gisela Beispiel", "Gustav Beispiel"]);
});
