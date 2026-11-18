const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin } = require("./helpers/env");

const { ContactGraph } = (() => {
  const { plugin } = loadPlugin();
  return { ContactGraph: plugin.constructor };
})();
const { parseJournal, formatJournal, ghostFrontmatter } = ContactGraph.__test;

test("Verlaufseinträge werden gelesen", () => {
  const md = `### 2026-05-02 · Besprechung · Projektstart
Beteiligt: [[Alex Beispiel]], [[Petra Partner]]
Notiz: [[Besprechungsnotiz Projektstart]]
Zusammenfassung: Rollen geklärt.

Ausführlicher Text.`;
  const [e] = parseJournal(md);
  assert.equal(e.date, "2026-05-02");
  assert.equal(e.typ, "Besprechung");
  assert.equal(e.titel, "Projektstart");
  assert.equal(e.meta.beteiligt, "[[Alex Beispiel]], [[Petra Partner]]");
  assert.equal(e.meta.notiz, "[[Besprechungsnotiz Projektstart]]");
  assert.equal(e.meta.zusammenfassung, "Rollen geklärt.");
  assert.equal(e.body, "Ausführlicher Text.");
});

test("Mehrere Einträge bleiben getrennt", () => {
  const md = `### 2026-05-02 · Besprechung · A

### 2026-04-18 · Telefonat · B
Zusammenfassung: kurz.`;
  const list = parseJournal(md);
  assert.equal(list.length, 2);
  assert.equal(list[1].typ, "Telefonat");
});

test("Formatieren und erneut Lesen ergibt dasselbe", () => {
  const list = parseJournal(`### 2026-05-02 · Besprechung · Projektstart
Beteiligt: [[Alex Beispiel]]
Ort: Büro
Zusammenfassung: Rollen geklärt.

Zeile eins.

Zeile zwei mit *Markdown*.`);
  const again = parseJournal(list.map(formatJournal).join("\n\n"));
  assert.equal(again.length, 1);
  assert.deepEqual(
    { date: again[0].date, typ: again[0].typ, titel: again[0].titel, meta: again[0].meta, body: again[0].body },
    { date: list[0].date, typ: list[0].typ, titel: list[0].titel, meta: list[0].meta, body: list[0].body },
  );
});

test("Einträge ohne Typ und Titel bleiben lesbar", () => {
  const [e] = parseJournal("### 2026-01-01");
  assert.equal(e.date, "2026-01-01");
  assert.equal(e.typ, "");
  assert.equal(e.titel, "");
  assert.equal(e.body, "");
});

test("Formatierung setzt nur vorhandene Felder", () => {
  const md = formatJournal({ date: "2026-01-01", typ: "", titel: "", meta: {}, body: "" });
  assert.equal(md, "### 2026-01-01");
});

test("Platzhalter bekommt Vorname, Nachname und Rückrichtung", () => {
  const fm = ghostFrontmatter("Anna Maria Beispiel", "Alex Beispiel", "friends", { }, "2026-01-01");
  assert.match(fm, /first_name: Anna/);
  assert.match(fm, /last_name: Beispiel/);
  assert.match(fm, /aliases: Maria/);
  assert.match(fm, /friends: "\[\[Alex Beispiel\]\]"/);
  assert.doesNotMatch(fm, /kind:/);
});
