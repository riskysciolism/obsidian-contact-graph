// Vergleicht die SVG-Ausgabe zweier Plugin-Versionen (vor/nach Refactoring)
const path = require("path");
const fs = require("fs");
const { loadPlugin } = require("./tests/helpers/env");

const version = process.argv[2];
const { plugin } = loadPlugin();
const { notes, rel } = plugin.buildGraph();
const w = plugin.walk(rel, notes, "Ich Selbst", 3, true);
const svg = plugin.svg("Ich Selbst", notes, w.found, w.edges, { photos: false, depth: 3 });
fs.writeFileSync(`/tmp/svg-${version}.svg`, svg);
console.log(version, "→", svg.length, "Zeichen,", (svg.match(/class="cg-node/g) || []).length, "Knoten");
