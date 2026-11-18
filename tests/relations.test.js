const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER, parseFrontmatter } = require("./helpers/env");

function fresh() {
  return loadPlugin();
}

const fmOf = (vault, name) => parseFrontmatter(vault.files.get(`${CONTACT_FOLDER}/${name}.md`) || "");

test("addRelation schreibt beide Seiten", async () => {
  const { plugin, vault } = fresh();
  await plugin.addRelation("Frieda Freund", "neighbors", "Kai Kollege");
  assert.deepEqual(fmOf(vault, "Frieda Freund").neighbors, ["[[Kai Kollege]]"]);
  assert.deepEqual(fmOf(vault, "Kai Kollege").neighbors, ["[[Frieda Freund]]"]);
});

test("addRelation legt keine Duplikate an", async () => {
  const { plugin, vault } = fresh();
  await plugin.addRelation("Frieda Freund", "neighbors", "Kai Kollege");
  await plugin.addRelation("Frieda Freund", "neighbors", "Kai Kollege");
  assert.equal(fmOf(vault, "Frieda Freund").neighbors.length, 1);
});

test("Umgekehrter Typ wird korrekt gesetzt (kinder → eltern)", async () => {
  const { plugin, vault } = fresh();
  await plugin.addRelation("Alex Beispiel", "children", "Frieda Freund");
  assert.deepEqual(fmOf(vault, "Frieda Freund").parents, ["[[Alex Beispiel]]"]);
  assert.deepEqual(fmOf(vault, "Alex Beispiel").children, ["[[Frieda Freund]]"]);
});

test("Beziehung zur Ich-Person setzt Verhältnis und Kreis", async () => {
  const { plugin, vault } = fresh();
  await plugin.addRelation("Ich Selbst", "neighbors", "Kim Beispiel");
  const fm = fmOf(vault, "Kim Beispiel");
  assert.equal(fm.relation, "neighbor", "gespeichert wird der Schlüssel");
  assert.equal(fm.circle, "neighborhood");
});

test("Vorhandenes Verhältnis wird nicht überschrieben", async () => {
  const { plugin, vault } = fresh();
  await plugin.addRelation("Ich Selbst", "friends", "Kai Kollege");
  const fm = fmOf(vault, "Kai Kollege");
  assert.equal(fm.relation, "Kollege", "vorhandener Wert bleibt stehen");
});

test("Anzeige übersetzt den Schlüssel", () => {
  const { plugin } = loadPlugin();
  assert.equal(plugin.verhaeltnisLabel("neighbor", "w"), "Nachbarin");
  assert.equal(plugin.verhaeltnisLabel("Nachbar", "m"), "Nachbar", "Altwerte bleiben lesbar");
  assert.equal(plugin.relKeyLabel("cousin", "w"), "Cousine", "abgeleitete Rollen kommen aus dem Rollenkatalog");
});

test("autoMeta findet die stärkste direkte Beziehung", () => {
  const { plugin } = fresh();
  assert.equal(plugin.autoMeta("Alex Beispiel").label, "Elternteil");
  assert.equal(plugin.autoMeta("Kai Kollege").group, "work");
  assert.equal(plugin.autoMeta("Frieda Freund").group, "friends");
  assert.equal(plugin.autoMeta("Ich Selbst"), null);
});

test("Kontakt aus Namen anlegen: Vorname, weitere Namen, Nachname", async () => {
  const { plugin, vault } = fresh();
  await plugin.createContactFromName("Anna Maria Beispiel");
  const text = vault.files.get(`${CONTACT_FOLDER}/Anna Maria Beispiel.md`);
  assert.ok(text, "Notiz fehlt");
  const fm = parseFrontmatter(text);
  assert.equal(fm.first_name, "Anna");
  assert.equal(fm.last_name, "Beispiel");
  assert.equal(fm.aliases, "Maria");
  assert.match(text, /```contact-card/);
  assert.ok(!("kind" in fm), "kind darf nicht mehr gesetzt werden");
});
