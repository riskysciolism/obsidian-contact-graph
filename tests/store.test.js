const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin, CONTACT_FOLDER, parseFrontmatter } = require("./helpers/env");

test("Store findet Notizen und meldet fehlende", () => {
  const { plugin } = loadPlugin();
  const store = plugin.store;
  assert.equal(store.exists("Frieda Freund"), true);
  assert.equal(store.exists("Niemand Hier"), false);
  assert.equal(store.path("Frieda Freund"), `${CONTACT_FOLDER}/Frieda Freund.md`);
});

test("patchFrontmatter setzt updated", async () => {
  const { plugin, vault } = loadPlugin();
  const today = new Date().toISOString().slice(0, 10);
  await plugin.store.patchFrontmatter("Frieda Freund", (fm) => { fm.notiz = "x"; });
  const fm = parseFrontmatter(vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`));
  assert.equal(fm.notiz, "x");
  assert.equal(fm.updated, today);
});

test("patchFrontmatter auf fehlender Notiz ändert nichts", async () => {
  const { plugin } = loadPlugin();
  const ok = await plugin.store.patchFrontmatter("Niemand Hier", () => { throw new Error("darf nicht laufen"); });
  assert.equal(ok, false);
});

test("Store schreibt und liest Abschnitte", async () => {
  const { plugin } = loadPlugin();
  await plugin.store.writeSection("Frieda Freund", "Notizen", "Erster Eintrag");
  assert.equal(await plugin.store.readSection("Frieda Freund", "Notizen"), "Erster Eintrag");
});

test("Store legt Kontakte mit Karte an und überschreibt nicht", async () => {
  const { plugin, vault } = loadPlugin();
  assert.equal(await plugin.store.createContact("Neue Person"), true);
  assert.equal(await plugin.store.createContact("Neue Person"), false);
  const text = vault.files.get(`${CONTACT_FOLDER}/Neue Person.md`);
  assert.match(text, /```contact-card/);
  assert.match(text, /first_name: Neue/);
});

test("Plugin und Store arbeiten auf denselben Daten", async () => {
  const { plugin, vault } = loadPlugin();
  await plugin.addRelation("Frieda Freund", "neighbors", "Kim Beispiel");
  const fm = parseFrontmatter(vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`));
  assert.ok(fm.neighbors.includes("[[Kim Beispiel]]"));
  assert.equal(await plugin.store.readSection("Frieda Freund", "cg-journal").then((t) => t.includes("Projektstart")), true);
});

test("Profilbild setzt Ausschnitt-Vorgabe und speichert die Datei", async () => {
  const { plugin, vault } = loadPlugin();
  const file = new File([new Uint8Array([137, 80, 78, 71])], "bild.png", { type: "image/png" });
  await plugin.store.setImage("Frieda Freund", file);
  const fm = parseFrontmatter(vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`));
  assert.match(String(fm.image), /Frieda Freund\.png/);
  assert.equal(fm.image_position, "50% 50%");
  assert.ok(vault.files.has(`${CONTACT_FOLDER}/Anhänge/Frieda Freund.png`));
});

test("Ausschnitt wird übernommen, wenn gesetzt", async () => {
  const { plugin, vault } = loadPlugin();
  await plugin.store.patchFrontmatter("Frieda Freund", (fm) => { fm.image_position = "30% 70%"; });
  const fm = parseFrontmatter(vault.files.get(`${CONTACT_FOLDER}/Frieda Freund.md`));
  assert.equal(fm.image_position, "30% 70%");
});
