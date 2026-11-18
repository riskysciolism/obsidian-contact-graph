function ghostFrontmatter(name, source, field, sourceFm, today) {
  const back = field === "kinder" ? "eltern" : field === "eltern" ? "kinder" : (field || null);
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  const vorname = parts[0] || "";
  const nachname = parts.length > 1 ? parts[parts.length - 1] : "";
  const weitere = parts.length > 2 ? parts.slice(1, -1).join(" ") : "";
  const lines = ["---", `created: ${today}`, `updated: ${today}`];
  if (vorname) lines.push(`first_name: ${vorname}`);
  if (nachname) lines.push(`last_name: ${nachname}`);
  if (weitere) lines.push(`aliases: ${weitere}`);
  if (source && back) lines.push(`${back}: "[[${source}]]"`);
  lines.push("gender:", "relation:", "met:", "image:", "---", "", `# ${name}`, "");
  return lines.join("\n");
}


/* Abschnitte: erkennt ##-Überschriften, ignoriert sie aber in Codeblöcken */

function scanSections(content) {
  const lines = String(content || "").split("\n");
  const out = [];
  let fence = null;
  let cur = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const f = line.match(/^\s*(`{3,}|~{3,})/);
    if (f) {
      const marker = f[1][0];
      if (!fence) fence = marker;
      else if (fence === marker) fence = null;
    }

    if (!fence) {
      const h = line.match(/^##\s+(.+?)\s*$/);
      if (h) {
        if (cur) { cur.end = i; out.push(cur); }
        cur = { title: h[1].trim(), start: i, end: lines.length };
        continue;
      }
    }
  }
  if (cur) out.push(cur);

  return out.map((s) => ({
    title: s.title,
    start: s.start,
    end: s.end,
    text: lines.slice(s.start + 1, s.end).join("\n").trim(),
  }));
}

/* Verlauf: Einträge als Blöcke mit Kopfzeile "### Datum · Typ · Titel" */

function parseJournal(text) {
  const src = String(text || "");
  const blocks = src.split(/\n(?=###\s)/).filter((b) => /^###\s/.test(b.trim()));
  const out = [];
  for (const b of blocks) {
    const lines = b.split("\n");
    const head = lines[0].replace(/^###\s*/, "");
    const parts = head.split("·").map((s) => s.trim());
    const meta = {};
    let i = 1;
    for (; i < lines.length; i++) {
      if (!lines[i].trim()) { i++; break; }
      const mm = lines[i].match(/^(Beteiligt|Notiz|Zusammenfassung|Ort)\s*:\s*(.*)$/i);
      if (!mm) break;
      meta[mm[1].toLowerCase()] = mm[2].trim();
    }
    out.push({
      date: parts[0] || "",
      typ: parts[1] || "",
      titel: parts.slice(2).join(" · ") || "",
      meta,
      body: lines.slice(i).join("\n").trim(),
      raw: b.trim(),
    });
  }
  return out;
}

function formatJournal(e) {
  const head = `### ${e.date}${e.typ ? " · " + e.typ : ""}${e.titel ? " · " + e.titel : ""}`;
  const lines = [head];
  if (e.meta && e.meta.beteiligt) lines.push(`Beteiligt: ${e.meta.beteiligt}`);
  if (e.meta && e.meta.ort) lines.push(`Ort: ${e.meta.ort}`);
  if (e.meta && e.meta.notiz) lines.push(`Notiz: ${e.meta.notiz}`);
  if (e.meta && e.meta.zusammenfassung) lines.push(`Zusammenfassung: ${e.meta.zusammenfassung}`);
  const body = (e.body || "").trim();
  if (body) lines.push("", body);
  return lines.join("\n");
}

/* Hover: Pfad zum Zentrum hervorheben (Ansicht und Codeblock) */


/* Geschenkideen: eine Idee pro Block, Kopfzeile ist der Titel */
const GIFT_KEYS = {
  beschreibung: "description", description: "description",
  link: "link", preis: "price", price: "price",
  erledigt: "done", done: "done",
};

function parseGifts(text) {
  const blocks = String(text || "").split(/\n(?=###\s)/).filter((b) => /^###\s/.test(b.trim()));
  const out = [];
  for (const block of blocks) {
    const lines = block.split("\n");
    const title = lines[0].replace(/^###\s*/, "").trim();
    const gift = { title, description: "", link: "", price: "", done: "" };
    const rest = [];
    for (let i = 1; i < lines.length; i++) {
      const mm = lines[i].match(/^([A-Za-zÄÖÜäöü]+)\s*:\s*(.*)$/);
      const key = mm ? GIFT_KEYS[mm[1].toLowerCase()] : null;
      if (key) gift[key] = mm[2].trim();
      else rest.push(lines[i]);
    }
    const free = rest.join("\n").trim();
    if (free && !gift.description) gift.description = free;
    out.push(gift);
  }
  return out;
}

function formatGift(gift) {
  const lines = [`### ${String(gift.title || "").trim()}`];
  if (gift.description) lines.push(`Beschreibung: ${gift.description}`);
  if (gift.link) lines.push(`Link: ${gift.link}`);
  if (gift.price) lines.push(`Preis: ${gift.price}`);
  if (gift.done) lines.push(`Erledigt: ${gift.done}`);
  return lines.join("\n");
}

module.exports = { readFrontmatter, ghostFrontmatter, scanSections, parseJournal, formatJournal, parseGifts, formatGift };

/* Frontmatter einer Notiz lesen, ohne auf den Metadaten-Cache zu warten */
function readFrontmatter(text) {
  const out = {};
  const m = String(text || "").match(/^---\n([\s\S]*?)\n---/);
  if (!m) return out;
  const lines = m[1].split("\n");
  let key = null;
  for (const line of lines) {
    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (kv) {
      key = kv[1];
      const val = kv[2].trim();
      if (val === "") out[key] = [];
      else if (val.startsWith("[") && val.endsWith("]")) {
        out[key] = val.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      } else out[key] = val.replace(/^["']|["']$/g, "");
      continue;
    }
    const item = line.match(/^\s*-\s*(.*)$/);
    if (item && key) {
      if (!Array.isArray(out[key])) out[key] = [];
      out[key].push(item[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  return out;
}
