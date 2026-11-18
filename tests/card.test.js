const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin } = require("./helpers/env");

function render(settings) {
  const env = loadPlugin({ settings });
  const view = env.plugin;
  const host = document.createElement("div");
  document.body.appendChild(host);
  return view.renderContactCard(host, "Frieda Freund", {}).then(() => {
    const html = host.innerHTML;
    host.remove();
    return html;
  });
}

test("Karte zeigt Journal-Einträge", async () => {
  const html = await render({ sections: [{ title: "Verlauf", type: "journal" }] });
  assert.match(html, /Besprechung/);
  assert.match(html, /Telefonat/);
  assert.match(html, /Projektstart/);
  assert.match(html, /Eintrag/);
});

test("Journal-Abschnitt filtert nach Typ", async () => {
  const html = await render({ sections: [{ title: "Verlauf", type: "journal", filter: "Besprechung" }] });
  assert.match(html, /Projektstart/);
  assert.doesNotMatch(html, /Rückfrage/);
});

test("Leere Abschnitte werden nicht gerendert", async () => {
  const html = await render({ sections: [
    { title: "Details", type: "text" },
    { title: "Interessen", type: "text" },
    { title: "Verlauf", type: "journal" },
  ] });
  assert.match(html, /cg-section/);
  assert.doesNotMatch(html, /cg-section-title">Details/);
});

test("Unbekannte Abschnitte erscheinen nicht", async () => {
  const html = await render({ sections: [{ title: "Gibt es nicht", type: "text" }] });
  assert.doesNotMatch(html, /Gibt es nicht/);
});

test("Karte übernimmt den Bildausschnitt", async () => {
  const env = loadPlugin({ settings: { sections: [] } });
  const file = new File([new Uint8Array([137, 80, 78, 71])], "bild.png", { type: "image/png" });
  await env.plugin.store.setImage("Frieda Freund", file);
  await env.plugin.store.patchFrontmatter("Frieda Freund", (fm) => { fm.image_position = "20% 80%"; });
  const host = document.createElement("div");
  await env.plugin.renderContactCard(host, "Frieda Freund", {});
  const img = host.querySelector("img");
  assert.ok(img, "kein Bild gerendert");
  assert.equal(img.style.objectPosition, "20% 80%");
});

test("Datumsfelder sind echte Datumsfelder", async () => {
  const env = loadPlugin({ settings: { sections: [] } });
  await env.plugin.store.patchFrontmatter("Frieda Freund", (fm) => {
    fm.birthday = "1990-12-09";
    fm.met = "2020-03-01";
  });
  const mod = require("../src/modals");
  const modal = new mod.ContactModal(env.plugin.app, env.plugin, { name: "Frieda Freund" });
  await modal.onOpen();
  await new Promise((r) => setTimeout(r, 60));
  const dates = [...modal.contentEl.querySelectorAll('input[type="date"]')];
  assert.ok(dates.length >= 3, `nur ${dates.length} Datumsfelder`);
  const values = dates.map((d) => d.value);
  assert.ok(values.includes("1990-12-09"), "Geburtstag fehlt");
  assert.ok(values.includes("2020-03-01"), "Kennengelernt fehlt");
});
