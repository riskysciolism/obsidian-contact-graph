# Contact Graph

An Obsidian plugin that turns plain contact notes into a visual relationship network and
SPA-like contact cards — no Mermaid, no external renderer, no database.

Everything lives in the note: frontmatter for facts, `## ...` sections for prose. The
plugin supplies the design, the notes stay readable on their own.

## Features

- **Relationship graph** in the sidebar or embedded as a `contact-graph` code block:
  concentric layout by sector (family, friends, work, acquaintances), radial tree for the
  family branch, blob hulls around people sharing an attribute, hover highlights the path
  to the centre, PNG export.
- **Contact cards** rendered from a `contact-card` code block: hero image, contact block,
  address with map, chips, sections — all editable through dialogs, no need to leave
  reading view.
- **Section editor** with preview, maximize, `Ctrl/Cmd+Enter` to save.
- **Journal** with structured entries (date, type, title, participants, place, summary),
  filterable per section.
- **Gift ideas** as a checklist with title, description, link and price.
- **Completion run** that adds inverse relations, sibling parents and grandparents, reads
  profile images from `Anhänge/`, and warns about duplicate names.
- **Bulk edit** for relation and circle across many contacts.
- **i18n** for UI and relation labels, German and English.

## Install

1. Copy `main.js`, `manifest.json` and `styles.css` into `<vault>/.obsidian/plugins/contact-graph/`.
2. Reload Obsidian, then enable **Contact Graph** under *Community plugins*.

Or download the ZIP from the releases page and unpack it into the plugins folder.

## Data model

Frontmatter keys and section headings are **English**, always. There are no legacy
aliases — a note with `verhaeltnis:` simply has no relation.

```yaml
---
type: contact
first_name: Andrea
last_name: Beispiel
aliases: [Andrea]
gender: w            # m / w / empty
relation: neighbor   # relation to the "me" note, a key from the catalogue
circle: family       # family / friends / work / acquaintances
birthday: 1990-12-09
met: 2020-03-01
image: "[[Andrea Beispiel.png]]"
image_position: 50% 50%
image_scale: 1
partner: ["[[Kim Beispiel]]"]
parents: ["[[Alex Beispiel]]"]
children: []
siblings: []
---
```

| Field | Meaning |
| --- | --- |
| `first_name`, `last_name`, `aliases` | name; the file name is the linking key |
| `gender` | `m` / `w`, drives gendered relation labels |
| `relation` | relation to the "me" note, stored as catalogue key |
| `circle` | sector used by the graph layout |
| `birthday`, `met`, `last_contact` | real date fields (`YYYY-MM-DD`) |
| `image`, `image_position`, `image_scale` | profile picture, crop focus and zoom |
| `partner`, `parents`, `children`, `siblings` | core relations (wikilinks) |
| `step_parents`, `step_children`, `step_siblings` | step relations |
| `ex_partner`, `ex_friends`, `ex_colleagues`, `ex_neighbors` | former relations |
| `relatives`, `grandparents`, `friends`, `work`, `neighbors`, `acquaintances`, `other` | remaining relations |

Sections are headings with a technical prefix:

```markdown
## cg-links
## cg-details
## cg-address
## cg-interests
## cg-family
## cg-journal
## cg-gifts
## cg-graph
```

Custom sections are allowed; the label comes from `src/locales/*` when the id is known,
otherwise the heading is shown as-is. Old German headings (`## Verlauf`) are renamed to
`## cg-journal` on first read.

### Duplicate names

The file name is the key for links, the graph and relations. Two people with the same name
get a suffix in the file name (`Thomas Müller (Feuerwehr).md`); `first_name`/`last_name`
stay clean. Creating a contact checks the name pair first and asks for a suffix instead of
failing silently.

## Development

Requirements: Node.js 20+.

```bash
npm install
npm run build   # bundles src/ into main.js (esbuild)
npm run watch   # rebuild on change
npm test        # node:test + jsdom, no Obsidian needed
```

`main.js` is generated — never edit it by hand. It is committed so the plugin can be
installed straight from the repo.

### Layout

```
src/
  index.js       entry point, exports plugin + test hooks
  plugin.js      plugin class: commands, card and section rendering
  view.js        sidebar view and code block renderers
  settings.js    settings tab
  modals.js      dialogs (contact, relation picker, journal, gifts, image, bulk, graph)
  store.js       ContactStore — reading and writing notes
  graph.js       GraphBuilder — relations, sectors, roles, completion plan
  layout.js      radial placement and sectors
  markdown.js    section, journal and gift parsing
  constants.js   relation catalogue, colours, defaults
  i18n.js        t(), locale detection
  locales/       de.js, en.js
  util.js        helpers (clean, zoom, hover, icon buttons)
tests/           node:test suites plus a jsdom Obsidian mock
```

### Conventions

- **English, always:** frontmatter keys, section headings, code identifiers, commit
  messages, test names.
- **No German fallbacks.** If a key is missing, it is missing — do not add alias maps that
  read old field names.
- **Every user-facing string goes through `t()`** and exists in `de.js` **and** `en.js`.
  English is the fallback language for missing keys and missing locales.
- **No real names** in code, fixtures, comments or docs. Test data is invented
  (`Andrea Beispiel`, `Kim Beispiel`, …).
- **Icons are Lucide**, rendered with `setIcon()` through `iconButton()` /
  `textIconButton()` in `src/util.js` — no emoji in buttons.
- **Dates** use `<input type="date">`, stored as `YYYY-MM-DD`.

See `AGENTS.md` for the rules an automated agent has to follow when working on this repo.

## License

MIT
