const { ItemView, Notice, TFile } = require("obsidian");
const { VIEW_TYPE, DEFAULT_REL_TYPES } = require("./constants");
const { asList, attachZoom } = require("./util");
const { ghostFrontmatter } = require("./markdown");
const { PresetModal } = require("./modals");

class ContactGraphView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return "Beziehungsgraph"; }
  getIcon() { return "share-2"; }

  async onOpen() {
    this.render();
  }

  async render() {
    const p = this.plugin;
    const container = this.contentEl;
    container.empty();
    container.addClass("cg-root");

    const active = p.app.workspace.getActiveFile();
    const fromFile = active && active.path.startsWith(p.settings.folder + "/") ? active.basename : null;
    const center = this.pinnedCenter || fromFile || p.settings.selfNote;

    const { notes, rel } = p.buildGraph();
    if (!notes[center]) {
      container.createEl("p", { text: `Keine Kontaktnotiz für „${center}" gefunden.`, cls: "cg-hint" });
      return;
    }

    /* Kreis-Filter: Familie, Arbeit, Freunde … */
    this.kreise = this.kreise || new Set();
    const kreisCount = new Map();
    for (const n of Object.keys(notes)) {
      for (const k of p.kreisOf(n, notes)) kreisCount.set(k, (kreisCount.get(k) || 0) + 1);
    }

    let viewNotes = notes, viewRel = rel;
    if (this.kreise.size) {
      const allowed = new Set([center]);
      for (const n of Object.keys(notes)) {
        if (p.kreisOf(n, notes).some((k) => this.kreise.has(k))) allowed.add(n);
      }
      viewNotes = {};
      for (const n of allowed) if (notes[n]) viewNotes[n] = notes[n];
      viewRel = {};
      for (const n of allowed) {
        if (!rel[n]) continue;
        const entry = {};
        for (const [kind, list] of Object.entries(rel[n])) entry[kind] = list.filter((x) => allowed.has(x));
        viewRel[n] = entry;
      }
    }

    const depth = this.depth || p.settings.defaultDepth;
    const { found, edges } = p.walk(viewRel, viewNotes, center, depth);

    /* Kopfzeile */
    const head = container.createDiv({ cls: "cg-head" });
    head.createEl("div", { text: center, cls: "cg-title" });
    const sub = head.createDiv({ cls: "cg-sub" });
    const ghostCount = [...found.keys()].filter((n) => notes[n] && notes[n].ghost).length;
    sub.setText(`${found.size - 1 - ghostCount} Kontakte`
      + (ghostCount ? ` · ${ghostCount} Platzhalter` : "")
      + ` · Tiefe ${depth}`);

    /* Werkzeugleiste */
    const bar = container.createDiv({ cls: "cg-bar" });

    const depthBtn = (label, d) => {
      const b = bar.createEl("button", { text: label, cls: "cg-btn" + (d === depth ? " on" : "") });
      b.onclick = () => { this.depth = d; this.render(); };
    };
    depthBtn("direkt", 1);
    depthBtn("2. Grad", 2);
    depthBtn("3. Grad", 3);

    const toggle = bar.createEl("button", {
      text: p.settings.showPhotos ? "Fotos" : "Namen",
      cls: "cg-btn on",
    });
    toggle.onclick = async () => {
      p.settings.showPhotos = !p.settings.showPhotos;
      await p.saveData(p.settings);
      this.render();
    };

    /* Presets */
    const presets = p.settings.presets || [];
    if (presets.length) {
      const pick = bar.createEl("select", { cls: "cg-select" });
      pick.createEl("option", { text: "Preset …", value: "" });
      for (const pr of presets) pick.createEl("option", { text: pr.name, value: pr.name });
      pick.onchange = () => {
        if (!pick.value) return;
        this.applyPreset(pick.value);
        pick.value = "";
      };
    }

    const saveBtn = bar.createEl("button", { text: "Preset speichern", cls: "cg-btn" });
    saveBtn.onclick = () => {
      new PresetModal(p.app, `Preset für ${center}`, async (name) => {
        if (!name) return;
        const preset = {
          name,
          center,
          depth: this.depth || p.settings.defaultDepth,
          mode: this.mode || "relation",
          sel: [...(this.sel || [])],
          photos: !!p.settings.showPhotos,
          types: Object.fromEntries(Object.entries(p.settings.types).map(([k, v]) => [k, v.enabled !== false])),
        };
        p.settings.presets = (p.settings.presets || []).filter((x) => x.name !== name).concat([preset]);
        await p.saveData(p.settings);
        new Notice(`Preset „${name}" gespeichert`);
        this.render();
      }).open();
    };

    const reloadViewBtn = iconButton(bar, "refresh-cw", tr("ui.reloadCard"), null);
    reloadViewBtn.setAttribute("aria-label", "Ansicht und Notizen neu laden");
    reloadViewBtn.onclick = () => p.refreshAll();

    const saveBlockBtn = bar.createEl("button", { text: "In Notiz", cls: "cg-btn" });
    saveBlockBtn.setAttribute("aria-label", "Konfiguration als Codeblock in die offene Notiz schreiben");
    saveBlockBtn.onclick = async () => {
      const disabled = Object.entries(p.settings.types).filter(([, v]) => v.enabled === false).map(([k]) => k);
      const path = await p.saveConfigToNote(center, {
        depth, mode: this.mode || "relation", sel: [...(this.sel || [])],
        photos: p.settings.showPhotos, types: disabled,
      });
      if (path) new Notice(`Konfiguration in ${path} geschrieben`);
    };

    const pngBtn = bar.createEl("button", { text: "PNG", cls: "cg-btn" });
    pngBtn.onclick = async () => {
      pngBtn.setText("…");
      try {
        const file = await this.exportPNG(container.querySelector("svg"), center);
        new Notice(`Gespeichert: ${file}`);
      } catch (err) {
        new Notice(`Export fehlgeschlagen: ${err.message}`);
      }
      pngBtn.setText("PNG");
    };

    if (center !== p.settings.selfNote) {
      const back = bar.createEl("button", { text: "zu mir", cls: "cg-btn" });
      back.onclick = () => {
        const f = p.app.vault.getAbstractFileByPath(`${p.settings.folder}/${p.settings.selfNote}.md`);
        if (f instanceof TFile) p.app.workspace.getLeaf(false).openFile(f);
      };
    }

    /* Kreis-Chips */
    if (kreisCount.size > 1) {
      const kreisBar = container.createDiv({ cls: "cg-bar cg-chips" });
      const allBtn = kreisBar.createEl("button", {
        text: "alle Kreise",
        cls: "cg-btn" + (this.kreise.size === 0 ? " on" : ""),
      });
      allBtn.onclick = () => { this.kreise.clear(); this.render(); };
      for (const [k, count] of [...kreisCount.entries()].sort((a, b) => b[1] - a[1])) {
        const on = this.kreise.has(k);
        const chip = kreisBar.createEl("button", { text: `${k} (${count})`, cls: "cg-btn" + (on ? " on" : "") });
        chip.onclick = () => {
          if (this.kreise.has(k)) this.kreise.delete(k); else this.kreise.add(k);
          this.render();
        };
      }
    }

    /* Merkmalsumschaltung */
    this.mode = this.mode || "relation";
    this.sel = this.sel || new Set();
    const fields = String(p.settings.attrFields || "").split(",").map((x) => x.trim()).filter(Boolean);

    const modeBar = container.createDiv({ cls: "cg-bar" });
    const modeBtn = (key, label) => {
      const b = modeBar.createEl("button", {
        text: label,
        cls: "cg-btn" + (this.mode === key ? " on" : ""),
      });
      b.onclick = () => { this.mode = key; this.sel.clear(); this.render(); };
    };
    modeBtn("relation", "Beziehungsart");
    for (const f of fields) modeBtn(f, f.charAt(0).toUpperCase() + f.slice(1));

    /* Werte-Chips */
    if (this.mode !== "relation") {
      const values = new Map();
      for (const name of found.keys()) {
        for (const v of p.attrValues(name, notes, this.mode)) {
          values.set(v, (values.get(v) || 0) + 1);
        }
      }
      if (values.size) {
        const chipBar = container.createDiv({ cls: "cg-bar cg-chips" });
        const all = chipBar.createEl("button", {
          text: "alle",
          cls: "cg-btn" + (this.sel.size === 0 ? " on" : ""),
        });
        all.onclick = () => { this.sel.clear(); this.render(); };
        for (const [v, n] of [...values.entries()].sort((a, b) => b[1] - a[1])) {
          const on = this.sel.has(v);
          const c = chipBar.createEl("button", { text: `${v} (${n})`, cls: "cg-btn" + (on ? " on" : "") });
          c.onclick = () => {
            if (this.sel.has(v)) this.sel.delete(v); else this.sel.add(v);
            this.render();
          };
        }
      } else {
        container.createEl("p", {
          text: `Keine Werte im Feld „${this.mode}" — trag es im Frontmatter der Kontakte ein.`,
          cls: "cg-hint",
        });
      }
    }

    /* Diagramm */
    const wrap = container.createDiv({ cls: "cg-canvas" });
    wrap.innerHTML = p.svg(center, notes, found, edges, {
      photos: p.settings.showPhotos,
      depth,
      mode: this.mode,
      sel: this.sel,
    });

    /* Interaktion */
    const svgEl = wrap.querySelector("svg");
    if (svgEl) {
      svgEl.addEventListener("click", (ev) => {
        if (ev.target.closest && ev.target.closest(".cg-node")) return;
        if (!this.pinnedCenter) return;
        this.pinnedCenter = null;
        this.render();
      });
      attachZoom(wrap, svgEl, p._zoomState || (p._zoomState = { z: 1 }));
      svgEl.querySelectorAll(".cg-node").forEach((node) => {
        const name = node.getAttribute("data-name");
        node.addEventListener("mouseenter", () => this.highlight(svgEl, node));
        node.addEventListener("mouseleave", () => this.clearHighlight(svgEl));
        node.addEventListener("click", () => {
          if (notes[name] && notes[name].ghost) {
            this.createGhost(name, notes);
            return;
          }
          if (name === center) return;
          this.pinnedCenter = name;
          this.render();
        });
        node.addEventListener("dblclick", (ev) => {
          ev.preventDefault();
          const f = p.app.vault.getAbstractFileByPath(`${p.settings.folder}/${name}.md`);
          if (f instanceof TFile) p.app.workspace.getLeaf(false).openFile(f);
        });
      });
    }
  }



  /* ---------------- Beziehungen setzen ---------------- */

  /* ---------------- Platzhalter ---------------- */

  async createGhost(name, notes) {
    const p = this.plugin;
    const path = `${p.settings.folder}/${name}.md`;
    const existing = p.app.vault.getAbstractFileByPath(path);
    if (existing) {
      p.app.workspace.getLeaf(false).openFile(existing);
      return;
    }

    let source = null, field = null;
    for (const [n, data] of Object.entries(notes)) {
      if (data.ghost) continue;
      const fields = [...new Set((p.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field))];
      for (const f of fields) {
        if (asList(data.fm[f]).includes(name)) { source = n; field = f; break; }
      }
      if (source) break;
    }

    const today = new Date().toISOString().slice(0, 10);
    const content = ghostFrontmatter(name, source, field, source ? notes[source].fm : {}, today);
    try {
      const file = await p.app.vault.create(path, content);
      new Notice(`Notiz „${name}" angelegt`);
      p.app.workspace.getLeaf(false).openFile(file);
    } catch (err) {
      new Notice(`Anlegen fehlgeschlagen: ${err.message}`);
    }
  }

  /* ---------------- Phase 3 ---------------- */

  applyPreset(name) {
    const p = this.plugin;
    const preset = (p.settings.presets || []).find((x) => x.name === name);
    if (!preset) return;
    this.pinnedCenter = preset.center || null;
    this.depth = preset.depth || p.settings.defaultDepth;
    this.mode = preset.mode || "relation";
    this.sel = new Set(preset.sel || []);
    p.settings.showPhotos = !!preset.photos;
    if (preset.types) {
      for (const [k, on] of Object.entries(preset.types)) {
        if (p.settings.types[k]) p.settings.types[k].enabled = on;
      }
    }
    p.saveData(p.settings);
    this.render();
    new Notice(`Preset „${name}" angewendet`);
  }

  async exportPNG(svgEl, center) {
    if (!svgEl) throw new Error("kein Diagramm sichtbar");
    const p = this.plugin;
    const clone = svgEl.cloneNode(true);
    clone.querySelectorAll(".cg-edge-label").forEach((t) => t.remove());
    clone.setAttribute("font-family", "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif");

    const cs = getComputedStyle(document.body);
    let xml = new XMLSerializer().serializeToString(clone);
    // jede verwendete Theme-Variable auflösen, sonst bleibt das PNG leer
    const names = new Set([...xml.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]));
    for (const name of names) {
      const value = (cs.getPropertyValue(name) || "").trim() || "#888888";
      xml = xml.split(`var(${name})`).join(value);
    }

    const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
    const W = Math.round((vb && vb.width) || svgEl.clientWidth || 900);
    const H = Math.round((vb && vb.height) || svgEl.clientHeight || 760);
    const scale = 2;

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error("SVG konnte nicht gerendert werden"));
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
    });

    const canvas = document.createElement("canvas");
    canvas.width = W * scale;
    canvas.height = H * scale;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = map["--background-primary"];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("Canvas lieferte kein Bild");
    const buf = await blob.arrayBuffer();

    const dir = (p.settings.exportFolder || "30_Resources/34_Assets/Beziehungen").replace(/\/+$/, "");
    if (!(await p.app.vault.adapter.exists(dir))) {
      await p.app.vault.adapter.mkdir(dir, true);
    }
    const now = new Date();
    const stamp = now.getFullYear().toString()
      + String(now.getMonth() + 1).padStart(2, "0")
      + String(now.getDate()).padStart(2, "0") + "-"
      + String(now.getHours()).padStart(2, "0")
      + String(now.getMinutes()).padStart(2, "0");
    const slug = String(center).normalize("NFD").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const path = `${dir}/graph-${slug}-${stamp}.png`;
    await p.app.vault.adapter.writeBinary(path, buf);
    return path;
  }

  renderCentered(name) {
    const p = this.plugin;
    const f = p.app.vault.getAbstractFileByPath(`${p.settings.folder}/${name}.md`);
    if (f instanceof TFile) p.app.workspace.getLeaf(false).openFile(f);
  }

  highlight(svgEl, node) {
    this.clearHighlight(svgEl);
    const path = (node.getAttribute("data-path") || "").split("|").filter(Boolean);
    if (path.length < 2) return;
    const set = new Set(path);
    svgEl.classList.add("cg-hovering");
    svgEl.querySelectorAll(".cg-node").forEach((n) => {
      n.classList.toggle("cg-on-path", set.has(n.getAttribute("data-name")));
    });
    svgEl.querySelectorAll(".cg-edge").forEach((e) => {
      const a = e.getAttribute("data-a"), b = e.getAttribute("data-b");
      let on = false, step = 0;
      for (let i = 0; i < path.length - 1; i++) {
        if ((path[i] === a && path[i + 1] === b) || (path[i] === b && path[i + 1] === a)) { on = true; step = i; }
      }
      if (!on) return;
      e.classList.add("cg-hl");
      const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("class", "cg-edge-label");
      const x1 = +e.getAttribute("x1"), y1 = +e.getAttribute("y1");
      const x2 = +e.getAttribute("x2"), y2 = +e.getAttribute("y2");
      t.setAttribute("x", ((x1 + x2) / 2).toFixed(1));
      t.setAttribute("y", ((y1 + y2) / 2 - 5).toFixed(1));
      t.setAttribute("text-anchor", "middle");
      let label = e.getAttribute("data-label") || "";
      if (e.getAttribute("data-kind") === "parent") {
        label = path[step] === a ? "Kind" : "Elternteil";
      }
      t.textContent = label;
      svgEl.appendChild(t);
    });
  }

  clearHighlight(svgEl) {
    svgEl.classList.remove("cg-hovering");
    svgEl.querySelectorAll(".cg-node").forEach((n) => n.classList.remove("cg-on-path"));
    svgEl.querySelectorAll(".cg-edge").forEach((e) => e.classList.remove("cg-hl"));
    svgEl.querySelectorAll(".cg-edge-label").forEach((t) => t.remove());
  }
}

/* ------------------------------------------------------------------ */


module.exports = { ContactGraphView };
