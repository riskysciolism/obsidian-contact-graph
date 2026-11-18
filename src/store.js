const { clean } = require("./util");
const { LEGACY_FIELDS, DEFAULT_SECTIONS, sectionHeading, canonicalHeading } = require("./constants");
const { scanSections } = require("./markdown");

class ContactStore {
  constructor(app, getSettings, resolveType) {
    this.app = app;
    this.getSettings = getSettings;
    this.resolveType = resolveType || (() => null);
  }

  get settings() { return this.getSettings() || {}; }
  get folder() { return this.settings.folder || "20_Areas/24_Contacts"; }

  path(name) { return `${this.folder}/${name}.md`; }
  file(name) { return this.app.vault.getAbstractFileByPath(this.path(name)); }
  exists(name) { return !!this.file(name); }

  async read(name) {
    const file = this.file(name);
    return file ? this.app.vault.read(file) : "";
  }

  async patchFrontmatter(name, fn) {
    const file = this.file(name);
    if (!file) return false;
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      /* Altfelder (deutsch) auf englische Schlüssel heben und danach entfernen */
      const migrated = [];
      for (const [oldKey, newKey] of Object.entries(LEGACY_FIELDS)) {
        if (fm[newKey] === undefined && fm[oldKey] !== undefined) {
          fm[newKey] = fm[oldKey];
          migrated.push(oldKey);
        }
      }
      fn(fm);
      for (const key of migrated) if (fm[key] !== undefined) delete fm[key];
      fm.updated = new Date().toISOString().slice(0, 10);
    });
    return true;
  }

  /* Beziehung in beide Richtungen eintragen */
  async addRelation(source, field, target) {
    const type = this.resolveType(field);
    const inverse = type && type.inverse ? type.inverse : field;
    const write = async (a, f, b) => this.patchFrontmatter(a, (fm) => {
      const cur = fm[f];
      const flat = Array.isArray(cur) ? cur.flat(Infinity)
        : (cur === undefined || cur === null || cur === "" ? [] : [cur]);
      const arr = flat.map((x) => String(x)).filter(Boolean);
      if (!arr.map((x) => clean(x)).includes(b)) arr.push(`[[${b}]]`);
      fm[f] = arr;
    });

    const ok1 = await write(source, field, target);
    const ok2 = await write(target, inverse, source);

    const me = this.settings.selfNote;
    if (source === me) await this.applyAutoMeta(target, field);
    if (target === me) await this.applyAutoMeta(source, inverse);
    return ok1 || ok2;
  }

  /* Verhältnis und Kreis nachziehen, wenn sie leer sind */
  async applyAutoMeta(target, field) {
    if (!target || target === this.settings.selfNote) return false;
    const rt = this.resolveType(field);
    if (!rt) return false;
    return this.patchFrontmatter(target, (fm) => {
      if (!fm.relation) fm.relation = rt.key || rt.field;
      if (!fm.circle) fm.circle = rt.group;
    });
  }

  /* Namen zerlegen: Vorname, weitere Namen, Nachname */
  splitName(full) {
    const parts = String(full || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { vorname: "", weitere: "", nachname: "" };
    if (parts.length === 1) return { vorname: parts[0], weitere: "", nachname: "" };
    return {
      vorname: parts[0],
      weitere: parts.slice(1, -1).join(" "),
      nachname: parts[parts.length - 1],
    };
  }

  async createContact(name, opts) {
    const cleanName = String(name || "").trim();
    if (!cleanName || this.exists(cleanName)) return false;
    const allowSame = !!(opts && opts.allowSameName);
    const hasSuffix = /\([^)]*\)\s*$/.test(cleanName);
    const clashes = hasSuffix ? [] : this.findByName(cleanName).filter((n) => n !== cleanName);
    if (clashes.length && !allowSame) return false;
    const { vorname, weitere, nachname } = this.splitName(cleanName);
    const today = new Date().toISOString().slice(0, 10);
    const fm = { type: "contact", created: today, updated: today, first_name: vorname, last_name: nachname };
    if (weitere) fm.aliases = weitere;
    const body = "---\n" + Object.entries(fm).map(([k, v]) => `${k}: ${v}`).join("\n")
      + "\n---\n\n```contact-card\n```\n";
    await this.app.vault.create(this.path(cleanName), body);
    return true;
  }

  async setImage(name, file) {
    const ext = (String(file.name || "").split(".").pop() || "png").toLowerCase();
    const dir = `${this.folder}/Anhänge`;
    const target = `${dir}/${name}.${ext}`;
    const buf = await file.arrayBuffer();
    const adapter = this.app.vault.adapter;
    if (adapter && typeof adapter.exists === "function" && !(await adapter.exists(dir))) {
      await this.app.vault.createFolder(dir).catch(() => {});
    }
    const existing = this.app.vault.getAbstractFileByPath(target);
    if (existing) await this.app.vault.modifyBinary(existing, buf);
    else await this.app.vault.createBinary(target, buf);
    return this.patchFrontmatter(name, (fm) => {
      fm.image = `[[${name}.${ext}]]`;
      if (!fm.image_position) fm.image_position = "50% 50%";
      if (fm.image_scale === undefined) fm.image_scale = 1;
      delete fm.image_embedded;
    });
  }


  /* Alte oder doppelte Abschnittsüberschriften auf die technische Form bringen */
  async migrateSections(name) {
    const file = this.file(name);
    if (!file) return false;
    let changed = false;

    await this.app.vault.process(file, (content) => {
      const lines = content.split("\n");
      let fence = false;
      const canonical = (title) => {
        const known = DEFAULT_SECTIONS.find((d) => d.heading === title || d.aliases.includes(title));
        return known ? known.heading : title;
      };

      /* Blöcke einsammeln */
      const blocks = [];
      let current = null;
      for (const line of lines) {
        if (/^\s*```/.test(line)) { fence = !fence; }
        const h = fence ? null : line.match(/^##\s+(.+?)\s*$/);
        if (h) {
          if (current) blocks.push(current);
          current = { title: h[1].trim(), lines: [] };
          continue;
        }
        if (current) current.lines.push(line);
        else blocks.push({ title: null, lines: [line] });
      }
      if (current) blocks.push(current);

      /* zusammenführen und umbenennen */
      const merged = new Map();
      const out = [];
      for (const block of blocks) {
        if (!block.title) { out.push(block); continue; }
        const title = canonical(block.title);
        if (title !== block.title) changed = true;
        const body = block.lines.join("\n").trim();
        if (merged.has(title)) {
          changed = true;
          const first = merged.get(title);
          if (body && !first.lines.join("\n").includes(body)) {
            first.lines.push("", body);
          }
          continue;
        }
        const entry = { title, lines: block.lines.slice() };
        merged.set(title, entry);
        out.push(entry);
      }
      if (!changed) return content;

      const rebuilt = [];
      for (const block of out) {
        if (!block.title) { rebuilt.push(...block.lines); continue; }
        const tail = rebuilt.length ? rebuilt[rebuilt.length - 1] : "";
        if (tail !== "" && tail !== undefined) rebuilt.push("");
        rebuilt.push(`## ${block.title}`, ...block.lines);
      }
      return rebuilt.join("\n");
    });
    return changed;
  }

  async fmOf(name) {
    const file = this.file(name);
    if (!file) return {};
    try { return readFrontmatter(await this.app.vault.read(file)); } catch (e) { return {}; }
  }

  /* Kontakte mit gleichem Vor- und Nachnamen */
  findByName(fullName) {
    const norm = (v) => String(v || "").trim().toLowerCase();
    const target = String(fullName || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
    const hits = [];
    for (const file of this.app.vault.getMarkdownFiles()) {
      if (this.folder && !file.path.startsWith(`${this.folder}/`)) continue;
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = (cache && cache.frontmatter) || {};
      const combined = norm(`${fm.first_name || ""} ${fm.last_name || ""}`);
      if (combined.trim()) {
        if (combined === norm(target)) hits.push(file.basename);
      } else if (norm(file.basename) === norm(target)) {
        hits.push(file.basename);
      }
    }
    return hits.sort();
  }

  /* ---------- Abschnitte ---------- */
  async readSection(name, title) {
    await this.migrateSections(name);
    title = canonicalHeading(title);
    const content = await this.read(name);
    const sec = scanSections(content).find((s) => s.title === title);
    return sec ? sec.text : "";
  }

  async writeSection(name, title, text) {
    const file = this.file(name);
    if (!file) return false;
    await this.migrateSections(name);
    title = canonicalHeading(title);
    const body = String(text || "").trim();
    await this.app.vault.process(file, (content) => {
      const lines = content.split("\n");
      let fence = false;
      const sec = scanSections(content).find((s) => s.title === title);
      if (!sec) {
        return content.replace(/\s*$/, "") + `\n\n## ${title}\n${body ? "\n" + body + "\n" : ""}`;
      }
      const block = [`## ${title}`, ""];
      if (body) block.push(body, "");
      return [...lines.slice(0, sec.start), ...block, ...lines.slice(sec.end)].join("\n")
        .replace(/\n{3,}/g, "\n\n");
    });
    return true;
  }

  async removeSection(name, title) {
    const file = this.file(name);
    if (!file) return false;
    await this.migrateSections(name);
    title = canonicalHeading(title);
    await this.app.vault.process(file, (content) => {
      const lines = content.split("\n");
      let fence = false;
      const sec = scanSections(content).find((s) => s.title === title);
      if (!sec) return content;
      return [...lines.slice(0, sec.start), ...lines.slice(sec.end)].join("\n")
        .replace(/\n{3,}/g, "\n\n");
    });
    return true;
  }

  /* ---------- Vervollständigung anwenden ---------- */
  async applyCompletion(plan) {
    const byNote = new Map();
    for (const item of plan) {
      if (item.action === "missing" || item.action === "warn") continue;
      if (!byNote.has(item.name)) byNote.set(item.name, []);
      byNote.get(item.name).push(item);
    }

    let changed = 0, added = 0;
    for (const [name, items] of byNote) {
      const ok = await this.patchFrontmatter(name, (fm) => {
        for (const item of items) {
          if (item.kind === "relation") {
            const cur = fm[item.field];
            const flat = Array.isArray(cur) ? cur.flat(Infinity)
              : (cur === undefined || cur === null || cur === "" ? [] : [cur]);
            const arr = flat.map((x) => String(x)).filter(Boolean);
            const have = arr.map((x) => clean(x));
            for (const n of item.add) {
              if (!have.includes(n)) { arr.push(`[[${n}]]`); added++; }
            }
            fm[item.field] = arr;
          } else if (item.kind === "image") {
            if (!fm[item.field]) { fm[item.field] = item.value; added++; }
          } else if (item.kind === "kreis") {
            if (!fm.circle) { fm.circle = item.value; added++; }
          } else if (item.kind === "name") {
            if (item.field === "aliases") {
              const cur = fm.aliases;
              const arr = Array.isArray(cur) ? cur.slice() : (cur ? [cur] : []);
              if (!arr.includes(item.value)) { arr.push(item.value); added++; }
              fm.aliases = arr;
            } else if (!fm[item.field]) {
              fm[item.field] = item.value;
              added++;
            }
          }
        }
      });
      if (ok) changed++;
    }
    return { changed, added };
  }
}

module.exports = { ContactStore };
