const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER } = require("./helpers/env");

const NOTE = `---
type: contact
first_name: Test
last_name: Person
circle: family
---

\`\`\`contact-card
\`\`\`

## cg-journal

### 2026-05-02 · Besprechung · Start
Zusammenfassung: kurz.
`;

test("Verlaufseintrag wird geschrieben und angezeigt", async () => {
  const env = loadPlugin({
    files: new Map([[`${CONTACT_FOLDER}/Test Person.md`, NOTE]]),
    settings: {
      sections: [{ title: "Verlauf", type: "journal" }],   // alte Einstellungen
    },
  });
  const plugin = env.plugin;
  plugin.normalizeSections();

  const mod = require("../src/modals");
  const sec = plugin.settings.sections.find((s) => s.type === "journal");
  const modal = new mod.JournalEntryModal(plugin.app, plugin, "Test Person", sec, null, -1, null);
  await modal.onOpen();

  const inputs = [...modal.contentEl.querySelectorAll("input")];
  const setVal = (label, value) => {
    const row = [...modal.contentEl.querySelectorAll(".cg-form-row")]
      .find((r) => r.textContent.includes(label));
    const input = row.querySelector("input");
    input.value = value;
    input.oninput && input.oninput();
    return input;
  };
  setVal("Datum", "2026-06-01");
  setVal("Typ", "Telefonat");
  setVal("Titel", "Neu");

  const saveBtn = [...modal.contentEl.querySelectorAll("button")].find((b) => b.textContent === "Speichern");
  assert.ok(saveBtn, "Speichern-Knopf fehlt");
  await saveBtn.onclick();

  const content = env.vault.files.get(`${CONTACT_FOLDER}/Test Person.md`);
  assert.match(content, /### 2026-06-01 · Telefonat · Neu/);

  const host = document.createElement("div");
  await plugin.renderContactCard(host, "Test Person", {});
  const text = host.textContent;
  assert.match(text, /Telefonat/, "neuer Eintrag wird nicht gerendert");
  assert.match(text, /Start/, "alter Eintrag fehlt");
});

test("Alte Einstellungen werden auf technische Überschriften gehoben", () => {
  const { plugin } = loadPlugin({ settings: { sections: [
    { title: "Verknüpfungen", type: "text" },
    { title: "Verlauf", type: "journal" },
    { title: "Eigener Abschnitt", type: "text" },
  ] } });
  plugin.normalizeSections();
  const byId = Object.fromEntries(plugin.settings.sections.map((s) => [s.id || s.title, s]));
  assert.equal(byId.links.heading, "cg-links");
  assert.equal(byId.journal.heading, "cg-journal");
  const custom = plugin.settings.sections.find((s) => s.title === "Eigener Abschnitt");
  assert.equal(custom.heading, "Eigener Abschnitt", "eigene Abschnitte bleiben unverändert");
});
