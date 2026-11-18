const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTINUE } = require("./helpers/env");
const { parseGifts, formatGift } = require("../src/markdown");

const SECTION = `## Gifts

### LEGO Technic 42100
Beschreibung: Großer Bagger
Link: https://example.org/lego
Preis: 49,99 €

### Buch über Berge
Preis: 12 €
Erledigt: 2026-05-01
`;

test("Geschenkideen werden gelesen", () => {
  const gifts = parseGifts(SECTION);
  assert.equal(gifts.length, 2);
  assert.equal(gifts[0].title, "LEGO Technic 42100");
  assert.equal(gifts[0].description, "Großer Bagger");
  assert.equal(gifts[0].link, "https://example.org/lego");
  assert.equal(gifts[0].price, "49,99 €");
  assert.equal(gifts[0].done, "");
  assert.equal(gifts[1].done, "2026-05-01");
});

test("Schreiben und erneut Lesen ergibt dasselbe", () => {
  const gifts = parseGifts(SECTION);
  const again = parseGifts(gifts.map(formatGift).join("\n\n"));
  assert.deepEqual(again, gifts);
});

test("Freitext ohne Beschreibungsfeld wird zur Beschreibung", () => {
  const [g] = parseGifts("### Etwas\nZwei Zeilen\nüber zwei Zeilen");
  assert.equal(g.description, "Zwei Zeilen\nüber zwei Zeilen");
});

test("Englische Feldnamen werden ebenfalls erkannt", () => {
  const [g] = parseGifts("### Thing\nDescription: Nice\nPrice: 5 €");
  assert.equal(g.description, "Nice");
  assert.equal(g.price, "5 €");
});

test("Abschnitt Geschenkideen ist voreingestellt und übersetzt", () => {
  const { plugin } = loadPlugin();
  const { DEFAULT_SETTINGS } = require("../src/constants");
  const i18n = plugin.constructor.__test.i18n;
  const sec = DEFAULT_SETTINGS.sections.find((s) => s.id === "gifts");
  assert.ok(sec, "Geschenkideen fehlen in den Vorgaben");
  assert.equal(sec.heading, "cg-gifts");
  i18n.setLocale("de");
  assert.equal(i18n.t("sections.gifts"), "Geschenkideen");
  i18n.setLocale("en");
  assert.equal(i18n.t("sections.gifts"), "Gift ideas");
  i18n.setLocale("de");
});

test("Unbekannte Sprache fällt auf Englisch zurück", () => {
  const { plugin } = loadPlugin();
  const i18n = plugin.constructor.__test.i18n;
  i18n.setLocale("es");
  assert.equal(i18n.getLocale(), "en");
  assert.equal(i18n.t("sections.gifts"), "Gift ideas");
  i18n.setLocale("de");
  assert.equal(i18n.t("sections.gifts"), "Geschenkideen");
});
