# AGENTS.md

Instructions for automated agents (OpenCode, Claude Code, …) working on this repository.
Read this before touching code. `README.md` describes the plugin for users; this file
describes how to work here without breaking things.

## What this is

An Obsidian plugin written in plain CommonJS JavaScript, bundled with esbuild into a
single `main.js`. No TypeScript, no framework, no runtime dependencies besides Obsidian.

## Commands

```bash
npm install          # once
npm run build        # src/ -> main.js
npm run watch        # rebuild while developing
npm test             # node:test, jsdom, no vault required
node --test tests/card.test.js   # a single suite
```

Always finish with `npm run build && npm test` green. `main.js` is committed — a change
that does not update the bundle is incomplete.

## Non-negotiable rules

1. **English only** for frontmatter keys, section headings, identifiers, commit messages
   and test names.
2. **No German key fallbacks.** There used to be alias maps (`verhaeltnis` → `relation`,
   `kreis` → `circle`, `vorname` → `first_name`); they were removed on purpose. Do not
   reintroduce them. A note using an old key is treated as if the field were empty.
   Section headings are the exception: old titles are *renamed* to the technical heading,
   never read as an alias at write time.
3. **Every visible string goes through `t()`** from `src/i18n.js` and needs an entry in
   both `src/locales/de.js` and `src/locales/en.js`. Missing keys and missing locales fall
   back to English, never to German.
4. **No real names** anywhere in the repo — not in fixtures, comments, docs or commit
   messages. Use `Andrea Beispiel`, `Kim Beispiel`, `Frieda Freund`.
5. **`main.js` is generated.** Never hand-edit it.
6. **Never touch `.obsidian/`.** The plugin is installed by copying three files; nothing in
   the vault is changed automatically.
7. **Icons are Lucide** via `iconButton()` / `textIconButton()` in `src/util.js`. No emoji
   in UI controls.

## Where things live

| Concern | File |
| --- | --- |
| Reading/writing notes, frontmatter, sections, images | `src/store.js` (`ContactStore`) |
| Relations, sectors, roles, completion plan | `src/graph.js` (`GraphBuilder`) |
| Card and section rendering, commands | `src/plugin.js` |
| Sidebar view, code block renderers | `src/view.js` |
| All dialogs | `src/modals.js` |
| Parsing (sections, journal, gifts, frontmatter) | `src/markdown.js` |
| Relation catalogue, defaults, colours | `src/constants.js` |
| Strings | `src/locales/{de,en}.js`, `t()` in `src/i18n.js` |

## Data model in one paragraph

A contact is a note whose file name is the identity used by wikilinks, the graph and
relations. Facts live in frontmatter (`first_name`, `last_name`, `gender`, `relation`,
`circle`, dates, relation wikilinks). Prose lives in `## cg-*` sections. `relation` and
`circle` store **catalogue keys** (`neighbor`, `family`), never display words; labels are
resolved per language and gender at render time.

## How to extend

**New relation type:** add an entry in `DEFAULT_REL_TYPES` (`src/constants.js`) with
`field`, `key`, `group`, `inverse`, aliases for old free text, and label keys
`relations.<key>.{n,m,w,pl}` in both locales. The field name is the frontmatter key.

**New section type:** add it to `DEFAULT_SECTIONS` with `id`, `heading` (`cg-<id>`),
`type` and `aliases`, add `sections.<id>` to both locales, then handle the type in
`renderSection()` and add an editor dialog if needed.

**New dialog:** subclass `Modal` from `obsidian`, add it to `module.exports` in
`src/modals.js`, and keep the pattern: build fields, validate, write through
`plugin.store`, close, then re-render the card.

**New string:** add `ui.*` (or a topic prefix) to both locale files first, then use `t()`.

## Testing

Tests run against a jsdom Obsidian mock (`tests/helpers/env.js`) and a fixture vault with
invented contacts. They never touch a real vault.

The mock is deliberately close to Obsidian but not identical. It supports:
`createEl` with `cls`, `text`, `type`, `value`, `checked`, `attr`, `href`; `createDiv`;
`createSpan`; `setIcon`; `modalEl`; `vault.process`, `vault.processFrontMatter`,
`metadataCache.getFileCache`.

If you hit an Obsidian API the mock lacks, add it to `tests/helpers/env.js` — do not
weaken the test. Several real bugs (missing `type` on inputs, missing `modalEl`, missing
`value` on options) were only findable because the mock grew instead of the test shrinking.

Write a test for every behaviour change. Name tests as sentences in English; assert
observable results (file content, DOM text, dataset), not internal calls.

## Pitfalls that already cost time

- **Stale metadata cache.** `metadataCache.getFileCache()` can lag right after a write.
  When reading back a note the plugin just changed, use `store.fmOf(name)`, which parses
  the file text via `readFrontmatter()`.
- **Saving must merge, not overwrite.** The contact dialog writes relation fields by
  unioning with the current frontmatter and removing only what the user explicitly removed
  (`×`). Rewriting the whole list from the dialog snapshot loses relations added elsewhere.
- **Section headings are technical** (`## cg-journal`). `sectionHeading(sec)` returns the
  heading; `sectionLabel(sec)` returns the translated label. `readSection`/`writeSection`
  accept old titles and rename them, so never compare against `sec.title` directly.
- **Duplicate names** are a data problem: `store.findByName()` compares
  `first_name`+`last_name`; a suffix in the file name counts as distinct.
- **Plugin load failures** ("Erweiterung konnte nicht geladen werden") are usually an
  exception in `onload()`, not a broken bundle. `tests/onload.test.js` calls `onload()`
  against the mock — keep it green.
- **`npm test` runs every file in `tests/`**, so a syntax error shows up as dozens of
  failures. Build first, then test.

## Releasing

1. Bump `version` in `manifest.json` **and** `package.json`.
2. `npm run build && npm test`.
3. Commit `src/`, `main.js`, `manifest.json`, `styles.css` together.
4. Tag `v<version>`; attach `main.js`, `manifest.json`, `styles.css` to the release.
