const test = require("node:test");
const assert = require("node:assert/strict");
const i18n = require("../src/i18n");
const { loadPlugin } = require("./helpers/env");

test("Deutsch und Englisch lösen unterschiedlich auf", () => {
  i18n.setLocale("de");
  assert.equal(i18n.t("groups.family"), "Familie");
  assert.equal(i18n.t("roles.me"), "Ich");
  i18n.setLocale("en");
  assert.equal(i18n.t("groups.family"), "Family");
  assert.equal(i18n.t("roles.me"), "Me");
  i18n.setLocale("de");
});

test("Beziehungen werden nach Geschlecht gebeugt", () => {
  i18n.setLocale("de");
  assert.equal(i18n.t("relations.neighbor.w"), "Nachbarin");
  assert.equal(i18n.t("relations.neighbor.m"), "Nachbar");
  assert.equal(i18n.t("relations.cousin.w"), "Cousine");
  i18n.setLocale("en");
  assert.equal(i18n.t("relations.parent.m"), "Father");
  i18n.setLocale("de");
});

test("Unbekannte Schlüssel bleiben sichtbar", () => {
  assert.equal(i18n.t("gibt.es.nicht"), "gibt.es.nicht");
});

test("Platzhalter werden ersetzt", () => {
  assert.equal(i18n.t("ui.relation.via", { word: "Vater", person: "Alex" }), "Vater von Alex");
  i18n.setLocale("en");
  assert.equal(i18n.t("ui.relation.via", { word: "Father", person: "Alex" }), "Father of Alex");
  i18n.setLocale("de");
});

test("Beide Sprachen haben dieselben Schlüssel", () => {
  const flat = (obj, prefix = "") => Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" ? flat(v, `${prefix}${k}.`) : [`${prefix}${k}`]);
  const de = new Set(flat(i18n.LOCALES.de));
  const en = new Set(flat(i18n.LOCALES.en));
  const missingInEn = [...de].filter((k) => !en.has(k));
  const missingInDe = [...en].filter((k) => !de.has(k));
  assert.deepEqual(missingInEn, [], "fehlt auf Englisch");
  assert.deepEqual(missingInDe, [], "fehlt auf Deutsch");
});

test("Sprachwechsel wirkt auf die Anzeige im Plugin", () => {
  const { plugin } = loadPlugin();
  const bundled = plugin.constructor.__test.i18n;
  bundled.setLocale("en");
  assert.equal(plugin.verhaeltnisLabel("neighbor", "w"), "Neighbour");
  bundled.setLocale("de");
  assert.equal(plugin.verhaeltnisLabel("neighbor", "w"), "Nachbarin");
});
