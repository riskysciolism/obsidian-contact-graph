const test = require("node:test");
const assert = require("node:assert/strict");
const { loadPlugin } = require("./helpers/env");

function graph(overrides) {
  const { plugin } = loadPlugin(overrides);
  const { notes, rel } = plugin.buildGraph();
  return { plugin, notes, rel };
}

test("buildGraph liest alle Kontakte der Notizdateien", () => {
  const { notes } = graph();
  const names = Object.keys(notes).filter((n) => !notes[n].ghost);
  assert.equal(names.length, 13);
  assert.ok(names.includes("Ich Selbst"));
  assert.ok(names.includes("Frieda Freund"));
});

test("Verweise ohne Notiz werden zu Platzhaltern", () => {
  const { notes } = graph();
  assert.ok(notes["Paul Fremd"], "Paul Fremd fehlt");
  assert.equal(notes["Paul Fremd"].ghost, true);
  assert.ok(notes["Günther Geist"], "Günther Geist fehlt");
  assert.equal(notes["Günther Geist"].ghost, true);
});

test("Beziehungen werden gegenseitig eingetragen", () => {
  const { rel } = graph();
  assert.ok(rel["Ich Selbst"].children.includes("Kim Beispiel"));
  assert.ok(rel["Kim Beispiel"].parents.includes("Ich Selbst"));
  assert.ok(rel["Ich Selbst"].siblings.includes("Bruno Beispiel"));
  assert.ok(rel["Bruno Beispiel"].siblings.includes("Ich Selbst"));
  assert.ok(rel["Otto Beispiel"].children.includes("Carla Beispiel"));
  assert.ok(rel["Carla Beispiel"].parents.includes("Otto Beispiel"));
});

test("Auflösung endet bei Freunden des Geschwisters", () => {
  const { plugin, notes, rel } = graph();
  const { found } = plugin.walk(rel, notes, "Ich Selbst", 3, true);
  assert.ok(found.has("Bruno Beispiel"), "Bruder fehlt");
  assert.ok(!found.has("Paul Fremd"), "Freund des Bruders darf nicht erscheinen");
  assert.ok(!found.has("Günther Geist"), "Freund der Freundin darf nicht erscheinen");
});

test("Familienzweige werden weiter aufgelöst", () => {
  const { plugin, notes, rel } = graph();
  const { found } = plugin.walk(rel, notes, "Ich Selbst", 3, true);
  for (const n of ["Alex Beispiel", "Andrea Beispiel", "Gustav Beispiel", "Gisela Beispiel", "Otto Beispiel", "Carla Beispiel", "Kim Beispiel"]) {
    assert.ok(found.has(n), `${n} fehlt im Familienzweig`);
  }
});

test("Ohne Familienregel erscheinen auch Freunde von Freunden", () => {
  const { plugin, notes, rel } = graph();
  const { found } = plugin.walk(rel, notes, "Ich Selbst", 3, false);
  assert.ok(found.has("Paul Fremd"));
});

test("Direkte Kontakte sind immer enthalten", () => {
  const { plugin, notes, rel } = graph();
  const { found } = plugin.walk(rel, notes, "Ich Selbst", 1, true);
  for (const n of ["Frieda Freund", "Kai Kollege", "Nora Nachbar"]) {
    assert.ok(found.has(n), `${n} fehlt auf Tiefe 1`);
  }
});

test("Rollen richten sich nach Geschlecht und Richtung", () => {
  const { plugin, notes, rel } = graph();
  const { found } = plugin.walk(rel, notes, "Ich Selbst", 3, true);
  const roles = {};
  for (const [name, info] of found) roles[name] = plugin.roleFor(name, info, notes, "Ich Selbst");
  assert.equal(roles["Ich Selbst"], "Ich");
  assert.equal(roles["Alex Beispiel"], "Vater");
  assert.equal(roles["Andrea Beispiel"], "Mutter");
  assert.equal(roles["Bruno Beispiel"], "Bruder");
  assert.equal(roles["Otto Beispiel"], "Onkel");
  assert.equal(roles["Carla Beispiel"], "Cousine");
  assert.equal(roles["Gustav Beispiel"], "Großvater");
});

test("Transitive Rolle nennt die Zwischenperson", () => {
  const { plugin, notes, rel } = graph();
  // Aus Sicht von Carla ist Gustav über Otto erreichbar: "Vater von Alex".
  const w = plugin.walk(rel, notes, "Carla Beispiel", 3, false);
  const info = w.found.get("Gustav Beispiel");
  assert.ok(info, "Gustav fehlt");
  assert.equal(plugin.roleFor("Gustav Beispiel", info, notes, "Carla Beispiel"), "Vater von Alex");
});

test("Die Ich-Notiz ist von fremden Zentren aus Endstation", () => {
  const { plugin, notes, rel } = graph();
  const w = plugin.walk(rel, notes, "Frieda Freund", 3, false);
  assert.ok(w.found.has("Ich Selbst"), "Ich sollte direkt dabei sein");
  assert.ok(!w.found.has("Alex Beispiel"), "über die Ich-Notiz darf nicht weiter gelaufen werden");
});

test("Sektoren folgen der Priorität Familie vor Freunden vor Arbeit", () => {
  const { plugin, notes, rel } = graph();
  const w = plugin.walk(rel, notes, "Ich Selbst", 3, true);
  const svg = plugin.svg("Ich Selbst", notes, w.found, w.edges, { photos: false, depth: 3 });
  const sectorOf = (name) => {
    const m = svg.match(new RegExp(`data-name="${name}"[^>]*data-sector="([^"]*)"`));
    return m ? m[1] : null;
  };
  assert.equal(sectorOf("Alex Beispiel"), "family");
  assert.equal(sectorOf("Petra Partner"), "family");
  assert.equal(sectorOf("Frieda Freund"), "friends");
  assert.equal(sectorOf("Kai Kollege"), "work");
  assert.equal(sectorOf("Nora Nachbar"), "acquaintances");
});

test("Transitive Knoten ändern den Sektor nicht", () => {
  const { plugin, notes, rel } = graph();
  const w = plugin.walk(rel, notes, "Ich Selbst", 3, false);
  const svg = plugin.svg("Ich Selbst", notes, w.found, w.edges, { photos: false, depth: 3 });
  const m = svg.match(/data-name="Paul Fremd"[^>]*data-sector="([^"]*)"/);
  assert.ok(m, "Paul Fremd fehlt im Bild");
  // Sektor folgt dem Zweig, an dem der Knoten hängt: Paul hängt am Familienzweig
  // (über den Bruder), nicht am Freundeszweig.
  assert.equal(m[1], "family");
});

test("Graph enthält keine zwei Knoten auf derselben Position", () => {
  const { plugin, notes, rel } = graph();
  const w = plugin.walk(rel, notes, "Ich Selbst", 3, true);
  const svg = plugin.svg("Ich Selbst", notes, w.found, w.edges, { photos: false, depth: 3 });
  const pos = [];
  for (const m of svg.matchAll(/<g class="cg-node[^"]*"[^>]*data-name="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)) {
    const r = m[2].match(/<rect x="([-\d.]+)" y="([-\d.]+)" width="([\d.]+)" height="([\d.]+)"/);
    if (r) pos.push([m[1], Math.round(+r[1] + +r[3] / 2), Math.round(+r[2] + +r[4] / 2)]);
  }
  assert.ok(pos.length > 5, "zu wenige Knoten");
  for (let i = 0; i < pos.length; i++) {
    for (let j = i + 1; j < pos.length; j++) {
      const d = Math.hypot(pos[i][1] - pos[j][1], pos[i][2] - pos[j][2]);
      assert.ok(d > 40, `${pos[i][0]} und ${pos[j][0]} liegen zu nah (${d.toFixed(0)} px)`);
    }
  }
});
