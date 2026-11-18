const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { loadPlugin } = require("./helpers/env");

function layout() {
  const { plugin } = loadPlugin();
  const { notes, rel } = plugin.buildGraph();
  const w = plugin.walk(rel, notes, "Ich Selbst", 3, true);
  const L = plugin.computeLayout("Ich Selbst", notes, w.found, w.edges, { photos: false, depth: 3 });
  return { plugin, notes, found: w.found, edges: w.edges, L };
}

test("Layout liefert für jeden Knoten eine Position", () => {
  const { L, found } = layout();
  for (const name of found.keys()) {
    const p = L.pos.get(name);
    assert.ok(p, `${name} ohne Position`);
    assert.ok(Number.isFinite(p[0]) && Number.isFinite(p[1]), `${name} hat keine gültigen Koordinaten`);
  }
});

test("Alle Positionen liegen innerhalb der Zeichenfläche", () => {
  const { L } = layout();
  for (const [name, [x, y]] of L.pos) {
    assert.ok(x >= 0 && x <= L.W, `${name}: x=${x} außerhalb 0..${L.W}`);
    assert.ok(y >= 0 && y <= L.H, `${name}: y=${y} außerhalb 0..${L.H}`);
  }
});

test("Zentrum sitzt in der Mitte", () => {
  const { L } = layout();
  const [x, y] = L.pos.get("Ich Selbst");
  assert.equal(Math.round(x), Math.round(L.cx));
  assert.equal(Math.round(y), Math.round(L.cy));
});

test("Jeder Knoten hat einen Sektor", () => {
  const { L, found } = layout();
  for (const name of found.keys()) {
    assert.ok(L.sectorOf.get(name), `${name} ohne Sektor`);
  }
});

test("Sektoren sind lückenlos und decken den Kreis", () => {
  const { L } = layout();
  let sum = 0;
  for (const [start, end] of Object.values(L.bounds)) sum += Math.max(0, end - start);
  assert.ok(Math.abs(sum - 2 * Math.PI) < 0.01, `Summe der Winkel: ${sum}`);
});

test("Layout ist deterministisch", () => {
  const a = layout().L;
  const b = layout().L;
  for (const [name, p] of a.pos) {
    const q = b.pos.get(name);
    assert.equal(Math.round(p[0]), Math.round(q[0]), `${name} x weicht ab`);
    assert.equal(Math.round(p[1]), Math.round(q[1]), `${name} y weicht ab`);
  }
});

test("SVG-Ausgabe entspricht dem gespeicherten Stand", () => {
  const { plugin, notes, found, edges } = layout();
  const svg = plugin.svg("Ich Selbst", notes, found, edges, { photos: false, depth: 3 });
  const goldenPath = path.join(__dirname, "fixtures", "golden", "ich-selbst.svg");
  if (!fs.existsSync(goldenPath)) {
    fs.mkdirSync(path.dirname(goldenPath), { recursive: true });
    fs.writeFileSync(goldenPath, svg);
    test.skip?.("Goldbild angelegt");
    return;
  }
  const expected = fs.readFileSync(goldenPath, "utf8");
  assert.equal(svg, expected,
    "SVG weicht vom Goldbild ab. Wenn die Änderung gewollt ist: tests/fixtures/golden/ich-selbst.svg löschen und Test erneut laufen lassen.");
});
