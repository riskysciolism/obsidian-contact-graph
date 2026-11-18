# Tests

```bash
npm install
npm test
```

## Aufbau

- `fixtures/vault/` — ein künstlicher Vault mit erfundenen Kontakten
- `helpers/env.js` — Attrappe der Obsidian-API (Vault, MetadataCache, Frontmatter, DOM)
- `graph.test.js` — Graphaufbau, Familienregel, Rollen, Sektoren
- `layout.test.js` — Layout ohne DOM, Determinismus, Goldbild
- `journal.test.js` — Verlaufseinträge lesen, schreiben, filtern, Platzhalter
- `relations.test.js` — Beziehungen schreiben, Gegenrichtung, abgeleitete Felder
- `completion.test.js` — Vervollständigung, Idempotenz, Großeltern
- `sections.test.js` — Abschnitte lesen, schreiben, entfernen, auch mit `##` in Codeblöcken
- `card.test.js` — gerenderte Karte inklusive Verlaufsfilter
- `legacy.test.js` — alte deutsche Felder und Überschriften
- `store.test.js` — ContactStore: Lesen, Schreiben, Frontmatter, Abschnitte
- `graphbuilder.test.js` — GraphBuilder: Aufbau, Zwischenspeicher, keine Schreibzugriffe

## Regeln

- **Nur erfundene Namen** in Fixtures und Tests. Keine echten Personen, Adressen
  oder Kontaktdaten — das Repository ist öffentlich.
- Namen folgen dem Muster „Vorname Beispiel/Freund/Kollege", damit klar ist,
  dass sie Attrappen sind.
- Tests dürfen nicht von einem echten Vault abhängen: alles, was gebraucht wird,
  steht in `fixtures/`.

## Goldbild

`fixtures/golden/ich-selbst.svg` ist die eingefrorene Ausgabe des Beispielgraphen.
Ändert sich das Aussehen absichtlich, Datei löschen und den Test einmal laufen
lassen — er legt sie neu an. Alles andere ist eine unbeabsichtigte Änderung.

## Sprache

Anzeigetexte liegen in `src/locales/de.js` und `src/locales/en.js`.
Gespeichert werden Schlüssel (`verhaeltnis: neighbor`, `kreis: family`), nicht Wörter.
