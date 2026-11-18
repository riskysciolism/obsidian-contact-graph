const { SECTORS, SECTOR_PRIO, DEFAULT_REL_TYPES, relTypeByValue, normalizeGroup } = require("./constants");
const { asList } = require("./util");

function sectorOfField(field, relType) {
  const rt = relType ? relType(field) : null;
  const g = rt ? rt.group : null;
  if (g === "family") return "family";
  if (g === "friends") return "friends";
  if (g === "work") return "work";
  return "acquaintances";
}

/* Priorität: Familie vor Freunden vor Arbeit vor Bekannten */

function sectorLayout({ center, found, edges, notes, relType, W, H }) {
  const cx = W / 2, cy = H / 2;
  const names = [...found.keys()];
  const sectorOf = new Map([[center, "family"]]);

  /* Welcher Bereich gehört zu einem Kantentyp? */
  const kindSector = (kind, other) => {
    if (kind === "parent") return "family";
    if (kind === "relation") {
      const v = (notes[other] && notes[other].fm && notes[other].fm.relation) || "";
      const rt = v ? (relTypeByValue(v) || (relType ? relType(String(v)) : null)) : null;
      if (rt) return sectorOfField(rt.field, relType);
      return "acquaintances";
    }
    const rt = relType ? relType(kind) : null;
    return rt ? sectorOfField(rt.field, relType) : "acquaintances";
  };

  /* Kanten, die direkt am Zentrum hängen */
  const directKinds = new Map();
  for (const e of edges.values()) {
    if (e.from !== center && e.to !== center) continue;
    const other = e.from === center ? e.to : e.from;
    if (!directKinds.has(other)) directKinds.set(other, []);
    directKinds.get(other).push(e.kind);
  }

  for (const n of names) {
    if (n === center) continue;
    const info = found.get(n) || {};
    const path = info.path || [];
    const kinds = directKinds.get(n) || [];
    let sec;
    if (path.length <= 1 && kinds.length) {
      /* direkt: höchste Priorität unter allen direkten Beziehungen */
      sec = "acquaintances";
      for (const k of kinds) {
        const s = kindSector(k, n);
        if (SECTOR_PRIO[s] < SECTOR_PRIO[sec]) sec = s;
      }
    } else {
      /* indirekt: der erste Schritt entscheidet, nicht die tiefere Verwandtschaft */
      sec = kindSector(path[0], n);
    }

    sectorOf.set(n, sec);
  }

  /* Winkel: proportional zur Anzahl, Mindestgröße, Rest wächst auf */
  const counts = { family: 0, friends: 0, work: 0, acquaintances: 0 };
  for (const n of names) if (n !== center) counts[sectorOf.get(n)]++;
  const present = SECTORS.filter((s) => counts[s.id] > 0);
  const minAngle = 0.55;
  let total = present.reduce((a, s) => a + counts[s.id], 0) || 1;
  let angles = {};
  if (!present.length) {
    angles = { family: 2 * Math.PI };
  } else {
    let sum = 0;
    for (const s of present) {
      angles[s.id] = Math.max(minAngle, (counts[s.id] / total) * (2 * Math.PI - minAngle * present.length));
      sum += angles[s.id];
    }
    const scale = (2 * Math.PI) / sum;
    for (const s of present) angles[s.id] *= scale;
  }
  const bounds = {};
  let a = -Math.PI / 2;
  for (const s of SECTORS) {
    const span = angles[s.id] || 0;
    bounds[s.id] = [a, a + span];
    a += span;
  }

  const pos = new Map([[center, [cx, cy]]]);

  /* Familie: Stammbaum — Vorfahren und Nachfahren in getrennten Hälften,
     Generationen nach außen. */
  const family = names.filter((n) => n !== center && sectorOf.get(n) === "family");
  const famBounds = bounds.family || [0, 0];
  const aMid = (famBounds[0] + famBounds[1]) / 2;
  const ancBounds = [famBounds[0], aMid];
  const descBounds = [aMid, famBounds[1]];

  const genOf = new Map();
  const famAdj = new Map();
  for (const n of [center, ...family]) famAdj.set(n, []);
  for (const e of edges.values()) {
    const a2 = e.from, b2 = e.to;
    if (!famAdj.has(a2) || !famAdj.has(b2)) continue;
    if (e.kind === "parent") {
      famAdj.get(a2).push([b2, 1]);   // Elternteil → Kind: +1
      famAdj.get(b2).push([a2, -1]);
    } else if (["partner", "partner_ex", "geschwister", "stiefgeschwister"].includes(e.kind)) {
      famAdj.get(a2).push([b2, 0]);
      famAdj.get(b2).push([a2, 0]);
    }
  }
  genOf.set(center, 0);
  const queue = [center];
  for (let i = 0; i < queue.length; i++) {
    const n = queue[i];
    for (const [o, step] of famAdj.get(n) || []) {
      if (genOf.has(o)) continue;
      genOf.set(o, genOf.get(n) + step);
      queue.push(o);
    }
  }
  for (const n of family) if (!genOf.has(n)) genOf.set(n, 0);

  const baseR = 260, stepR = 140;
  const ancestors = family.filter((n) => genOf.get(n) < 0).sort((x, y) => genOf.get(y) - genOf.get(x));
  const descendants = family.filter((n) => genOf.get(n) > 0).sort((x, y) => genOf.get(x) - genOf.get(y));
  const same = family.filter((n) => genOf.get(n) === 0);

  const placeArc = (list, bounds2, rOffset) => {
    if (!list.length) return;
    const gens = [...new Set(list.map((n) => Math.abs(genOf.get(n))))].sort((x, y) => x - y);
    let idx = 0;
    for (const g of gens) {
      const group = list.filter((n) => Math.abs(genOf.get(n)) === g);
      const r = baseR + (g - 1) * stepR + (rOffset || 0);
      const span = bounds2[1] - bounds2[0];
      group.forEach((n, i) => {
        const ang = bounds2[0] + (span * (i + 1)) / (group.length + 1);
        pos.set(n, [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]);
      });
      idx += group.length;
    }
  };
  placeArc(ancestors, ancBounds, 0);
  placeArc(descendants, descBounds, 75);
  /* Partner/Geschwister ohne Generation: auf Höhe der Bezugsperson, Rand des Sektors */
  same.forEach((n, i) => {
    const span = famBounds[1] - famBounds[0];
    const ang = famBounds[0] + (span * (i + 1)) / (same.length + 1);
    pos.set(n, [cx + 120 * Math.cos(ang), cy + 120 * Math.sin(ang)]);
  });

  /* Andere Bereiche: Mesh im Sektor — Bänder nach Bogenlänge, dadurch kollisionsfrei */
  for (const sec of SECTORS) {
    if (sec.id === "family") continue;
    const list = names.filter((n) => n !== center && sectorOf.get(n) === sec.id);
    if (!list.length) continue;
    const [a0, a1] = bounds[sec.id];
    const span = a1 - a0;
    const minArc = 130;
    let idx = 0;
    let band = 0;
    while (idx < list.length) {
      const r = 170 + band * 120;
      const capacity = Math.max(1, Math.floor((span * r) / minArc));
      const take = Math.min(capacity, list.length - idx);
      for (let i = 0; i < take; i++) {
        const ang = a0 + (span * (i + 0.5)) / take;
        const rr = r + ((i % 2) ? 24 : -24);
        pos.set(list[idx + i], [cx + rr * Math.cos(ang), cy + rr * Math.sin(ang)]);
      }
      idx += take;
      band++;
    }
  }

  /* Kollisionen auflösen: Knoten im eigenen Sektor auseinanderschieben */
  const minD = 115;
  const others = names.filter((n) => n !== center);
  for (let it = 0; it < 160; it++) {
    let moved = false;
    for (let i = 0; i < others.length; i++) {
      for (let j = i + 1; j < others.length; j++) {
        const a2 = others[i], b2 = others[j];
        const A = pos.get(a2), B = pos.get(b2);
        let dx = B[0] - A[0], dy = B[1] - A[1];
        let d = Math.hypot(dx, dy);
        if (d >= minD) continue;
        if (d < 0.01) { dx = Math.cos(i + j); dy = Math.sin(i + j); d = 0.01; }
        const f = (minD - d) / d * 0.52;
        A[0] -= dx * f; A[1] -= dy * f;
        B[0] += dx * f; B[1] += dy * f;
        moved = true;
      }
    }
    if (!moved) break;
    for (const n of others) {
      const P = pos.get(n);
      let ang = Math.atan2(P[1], P[0]);
      let r = Math.hypot(P[0], P[1]);
      const b = bounds[sectorOf.get(n)];
      if (b && b[1] - b[0] > 0.001) {
        const m2 = 0.05;
        // Winkel in den Sektor zurückholen (über die kürzere Seite)
        while (ang < b[0] + m2) ang += 2 * Math.PI;
        while (ang > b[1] - m2) ang -= 2 * Math.PI;
      }
      r = Math.max(90, r);
      pos.set(n, [r * Math.cos(ang), r * Math.sin(ang)]);
    }
  }

  let maxR = 0;
  for (const p of pos.values()) maxR = Math.max(maxR, Math.hypot(p[0] - cx, p[1] - cy));
  return { pos, cx, cy, bounds, sectorOf, counts, maxR };
}

/* Zoom für den Graphen: Knöpfe, Trackpad-Pinch (Strg+Rad) und Zwei-Finger.
   Zoomt um den Berührungs- bzw. Mauspunkt und zentriert beim Öffnen die Mitte. */

class GraphBuilder {
  constructor(app, getSettings) {
    this.app = app;
    this.getSettings = getSettings;
    this._cache = null;
    this._cacheAt = 0;
  }

  get settings() { return this.getSettings() || {}; }

  invalidate() {
    this._cache = null;
    this._cacheAt = 0;
  }
  contacts() {
    const notes = {};
    for (const f of this.app.vault.getMarkdownFiles()) {
      if (!f.path.startsWith(this.settings.folder + "/")) continue;
      if (this.settings.exclude && f.path.toLowerCase().includes(this.settings.exclude.toLowerCase())) continue;
      const cache = this.app.metadataCache.getFileCache(f);
      notes[f.basename] = { file: f, fm: (cache && cache.frontmatter) || {} };
    }
    return notes;
  }
  buildGraph() {
    const now = Date.now();
    if (this._cache && this._cacheAt && now - this._cacheAt < 1500) return this._cache;
    const notes = this.contacts();
    const self = this.settings.selfNote;
    const rel = {};
    const ensure = (n) => {
      if (!rel[n]) rel[n] = { partner: [], parents: [], children: [], siblings: [], relation: [] };
      for (const rt of (this.settings.relTypes || DEFAULT_REL_TYPES)) {
        if (!rel[n][rt.field]) rel[n][rt.field] = [];
      }
      return rel[n];
    };

    for (const name of Object.keys(notes)) {
      const e = ensure(name);
      const allFields = (this.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field)
        .concat(["partner", "parents", "children", "siblings"]);
      for (const f of [...new Set(allFields)]) {
        e[f] = asList(notes[name].fm[f]).filter((target) => {
          if (!(target in notes)) {
            // Verweis ohne Notiz: als Platzhalter aufnehmen
            notes[target] = { ghost: true, fm: {} };
            ensure(target);
          }
          return true;
        });
      }
    }

    const link = (a, b, f1, f2) => {
      if (!a || !b || a === b) return;
      ensure(a); ensure(b);
      if (!rel[a][f1].includes(b)) rel[a][f1].push(b);
      if (!rel[b][f2].includes(a)) rel[b][f2].push(a);
    };

    for (const name of Object.keys(rel)) {
      for (const p of [...rel[name].parents]) link(name, p, "parents", "children");
      for (const k of [...rel[name].children]) link(name, k, "children", "parents");
      for (const sib of [...rel[name].siblings]) link(name, sib, "siblings", "siblings");
      for (const pa of [...rel[name].partner]) link(name, pa, "partner", "partner");
      for (const rt of (this.settings.relTypes || DEFAULT_REL_TYPES)) {
        if (["partner", "parents", "children", "siblings"].includes(rt.field)) continue;
        const inv = rt.inverse || rt.field;
        for (const other of [...(rel[name][rt.field] || [])]) link(name, other, rt.field, inv);
      }
    }

    // Beziehung zur Ich-Person
    for (const name of Object.keys(notes)) {
      const v = notes[name].fm.relation;
      if (v) link(self, name, "relation", "relation");
    }

    this._cache = { notes, rel, self };
    this._cacheAt = Date.now();
    return this._cache;
  }
  walk(rel, notes, center, depth, familyOnly) {
    const FAMILY = new Set(["partner", "partner_ex", "parents", "children", "siblings",
      "step_parents", "step_children", "step_siblings", "relatives", "grandparents"]);
    const famOnly = familyOnly === undefined
      ? this.settings.expandFamily !== false
      : familyOnly;
    const familyReach = new Map([[center, true]]);
    const found = new Map([[center, { depth: 0, path: [], parent: null }]]);
    const edges = new Map();
    const enabled = this.settings.types;

    const addEdge = (a, b, kind) => {
      if (!a || !b || a === b) return;
      let key, from = a, to = b, type = kind;
      if (kind === "parents" || kind === "children") {
        // Eltern-Kind immer in einer Richtung: Elternteil -> Kind
        const parent = kind === "parents" ? b : a;
        const child = kind === "children" ? a : b;
        from = parent; to = child; type = "parent";
        key = `parent:${parent}|${child}`;
      } else {
        const s = [a, b].sort();
        key = `${kind}:${s[0]}|${s[1]}`;
        from = s[0]; to = s[1];
      }
      const t = enabled[kind] || enabled[type];
      if (t && t.enabled === false) return;
      if (!edges.has(key)) edges.set(key, { from, to, kind: type });
    };

    let frontier = [center];
    for (let d = 1; d <= depth; d++) {
      const next = [];
      for (const name of frontier) {
        // Die Ich-Notiz ist Endstation: ihr Verhältnis-Etikett führt nicht in ihre Familie
        if (name === this.settings.selfNote && center !== this.settings.selfNote) continue;
        // Nur Familienzweige weiter auflösen — Freunde und Kollegen sind Endstation
        if (famOnly && !familyReach.get(name)) continue;
        const data = rel[name] || {};
        const kinds = (this.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field).concat(["relation"]);
        for (const kind of kinds) {
          for (const other of data[kind] || []) {
            if (other === name || !(other in notes)) continue;
            const famNext = !!familyReach.get(name) && FAMILY.has(kind);
            const allowed = !famOnly || famNext || d === 1;
            if (!allowed) continue;
            addEdge(name, other, kind);
            if (!found.has(other)) {
              found.set(other, { depth: d, path: [...found.get(name).path, kind], parent: name });
              familyReach.set(other, famNext);
              next.push(other);
            }
          }
        }
      }
      frontier = next;
      if (!frontier.length) break;
    }
    return { found, edges };
  }
  planCompletion() {
    const REL_FIELDS = [...new Set((this.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field))]
      .concat(["grandparents"]);
    const notes = this.contacts();
    const raw = {};
    for (const name of Object.keys(notes)) {
      if (notes[name].ghost) continue;
      raw[name] = {};
      for (const f of REL_FIELDS) raw[name][f] = asList(notes[name].fm[f]);
    }
    const know = (n) => raw[n] !== undefined;

    const want = {};
    for (const name of Object.keys(raw)) {
      want[name] = {};
      for (const f of REL_FIELDS) want[name][f] = new Set(raw[name][f]);
    }
    const addTo = (name, field, value) => {
      if (!know(name) || !know(value) || name === value) return false;
      if (want[name][field].has(value)) return false;
      want[name][field].add(value);
      return true;
    };

    /* Fixpunkt: Gegenrichtungen, Geschwister-Eltern, Großeltern */
    for (let pass = 0; pass < 6; pass++) {
      let changed = false;
      for (const name of Object.keys(raw)) {
        for (const p of [...want[name].parents]) {
          if (addTo(p, "children", name)) changed = true;
          for (const g of (want[p] ? want[p].parents : [])) if (addTo(name, "grandparents", g)) changed = true;
        }
        for (const c of [...want[name].children]) {
          if (addTo(c, "parents", name)) changed = true;
          for (const g of want[name].parents) if (addTo(c, "grandparents", g)) changed = true;
        }
        for (const p of [...want[name].partner]) if (addTo(p, "partner", name)) changed = true;
        for (const sib of [...want[name].siblings]) {
          if (!know(sib)) continue;
          if (addTo(sib, "siblings", name)) changed = true;
          for (const p of want[name].parents) if (addTo(sib, "parents", p)) changed = true;
          for (const p of want[sib].parents) if (addTo(name, "parents", p)) changed = true;
        }
      }
      if (!changed) break;
    }

    /* Diff: nur Ergänzungen */
    const plan = [];
    for (const name of Object.keys(want)) {
      for (const f of REL_FIELDS) {
        const add = [...want[name][f]].filter((x) => !raw[name][f].includes(x));
        if (add.length) plan.push({ kind: "relation", name, field: f, add: add.sort() });
      }
    }

    for (const item of this.auxIssues(notes)) plan.push(item);
    return plan;
  }
  /* Kreis: neues Feld circle, altes kreis wird mitgelesen */
  kreisOf(name, notes) {
    const fm = (notes[name] && notes[name].fm) || {};
    const field = this.settings.kreisField || "circle";
    const raw = fm[field];
    if (raw !== undefined && raw !== null && raw !== "") {
      const list = asList(raw).map(normalizeGroup).filter(Boolean);
      if (list.length) return list;
    }
    if (this.settings.kreisFallback === false) return [];
    const auto = this.autoMeta ? this.autoMeta(name) : null;
    if (auto && auto.group) return [auto.group];
    if (["partner", "eltern", "kinder", "geschwister"].some((f) => asList(fm[f]).length)) return ["family"];
    return ["none"];
  }
  autoMeta(name) {
    const me = this.settings.selfNote;
    if (!name || name === me) return null;
    const { rel } = this.buildGraph();
    const mine = rel[me] || {};
    const order = ["family", "friends", "work", "neighborhood", "acquaintances", "other"];
    let best = null;
    for (const rt of (this.settings.relTypes || DEFAULT_REL_TYPES)) {
      if (rt.field === "relation") continue;
      if (!(mine[rt.field] || []).includes(name)) continue;
      const rank = order.indexOf(rt.group);
      if (!best || rank < best.rank) {
        best = { field: rt.field, key: rt.key, label: rt.n, group: rt.group, rank: rank < 0 ? 99 : rank };
      }
    }
    return best;
  }

  auxIssues(notes) {
    const folder = this.settings.folder;
    const images = new Map();
    for (const f of this.app.vault.getFiles()) {
      if (!f.path.startsWith(`${folder}/Anhänge/`)) continue;
      if (!/\.(png|jpe?g|webp)$/i.test(f.name)) continue;
      images.set(f.name.toLowerCase(), f.name);
    }

    const out = [];

    /* Mehrdeutige Namen: gleicher Vor- und Nachname in mehreren Notizen */
    const byPair = new Map();
    for (const n of Object.keys(notes)) {
      if (notes[n].ghost) continue;
      const fm = notes[n].fm || {};
      const pair = `${String(fm.first_name || "").toLowerCase()} ${String(fm.last_name || "").toLowerCase()}`.trim();
      if (!pair) continue;
      if (!byPair.has(pair)) byPair.set(pair, []);
      byPair.get(pair).push(n);
    }
    for (const [pair, list] of byPair) {
      if (list.length < 2) continue;
      for (const n of list) {
        out.push({ kind: "duplicate_name", name: n, field: "__name", value: pair, action: "warn", others: list.filter((x) => x !== n) });
      }
    }

    for (const name of Object.keys(notes)) {
      if (notes[name].ghost) continue;
      const fm = notes[name].fm || {};

      /* Profilbild */
      const declared = [fm.image, fm.image_embedded].find(Boolean);
      if (!declared) {
        const hit = [".png", ".jpg", ".jpeg", ".webp"]
          .map((ext) => images.get((name + ext).toLowerCase()))
          .find(Boolean);
        if (hit) out.push({ kind: "image", name, field: "image", value: `[[${hit}]]`, action: "set" });
      } else {
        const m = String(declared).match(/\[\[([^\]|]+)/);
        const target = m ? m[1].trim() : String(declared).trim();
        if (target && !images.has(target.toLowerCase())) {
          out.push({ kind: "image", name, field: "image", value: target, action: "missing" });
        }
      }

      /* Kreis */
      const derived = this.kreisOf(name, notes).filter((k) => k !== "none");
      if (!fm.circle && derived.length) {
        out.push({ kind: "kreis", name, field: "circle", value: derived[0], action: "set" });
      }

      /* Verhältnis zur Ich-Person aus den Beziehungen ableiten */
      if (!fm.relation) {
        const meta = this.autoMeta(name);
        if (meta && meta.label) {
          out.push({ kind: "name", name, field: "relation", value: meta.key || meta.label, action: "set" });
        }
      }

      /* Namen */
      const parts = name.trim().split(/\s+/);
      const nachname = parts.length > 1 ? parts[parts.length - 1] : "";
      const vorname = parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0];
      if (!fm.first_name && vorname) out.push({ kind: "name", name, field: "first_name", value: vorname, action: "set" });
      if (!fm.last_name && nachname) out.push({ kind: "name", name, field: "last_name", value: nachname, action: "set" });
      const aliases = asList(fm.aliases);
      if (!aliases.length && vorname && vorname !== name) {
        out.push({ kind: "name", name, field: "aliases", value: vorname, action: "set" });
      }
    }
    return out;
  }
}

module.exports = { sectorOfField, sectorLayout, GraphBuilder };
