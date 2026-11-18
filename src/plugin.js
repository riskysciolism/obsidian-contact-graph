const { Plugin, Notice, Menu, MarkdownRenderer } = require("obsidian");
const { VIEW_TYPE, DEFAULT_SETTINGS, DEFAULT_SECTIONS, ROLE, ROLE_M, ROLE_W, SECTORS, PALETTE, THEME_PALETTE, THEME_GROUP_COLOR, THEME_KIND, DEFAULT_REL_TYPES, normalizeGroup, relTypeByValue, sectionHeading, sectionLabel, sectionText, groupLabel } = require("./constants");
const { t: tr, detectLocale } = require("./i18n");
const { clean, asList, esc, blobPath, attachGraphHover, attachZoom } = require("./util");
const { scanSections, parseJournal, formatJournal, parseGifts, formatGift } = require("./markdown");
const { ContactStore } = require("./store");
const { sectorLayout, GraphBuilder } = require("./graph");
const { ContactGraphView } = require("./view");
const { ContactGraphSettings } = require("./settings");
const { iconButton, setButtonIcon, textIconButton } = require("./util");
const { ConfirmModal, JournalEntryModal, GiftModal, CompletionModal, ContactModal, BulkModal, SectionEditModal, GraphConfigModal } = require("./modals");

class ContactGraph extends Plugin {
  get graph() {
    if (!this._graph) this._graph = new GraphBuilder(this.app, () => this.settings);
    return this._graph;
  }

  /* Gespeicherte Abschnitte auf Kennungen und technische Überschriften heben */
  normalizeSections() {
    const list = Array.isArray(this.settings.sections) ? this.settings.sections : null;
    if (!list) return;
    let changed = false;
    this.settings.sections = list.map((sec) => {
      const known = DEFAULT_SECTIONS.find((d) => d.id === sec.id)
        || DEFAULT_SECTIONS.find((d) => d.heading === (sec.heading || sec.title))
        || DEFAULT_SECTIONS.find((d) => sec.title && (d.aliases.includes(sec.title) || d.heading === sec.title));
      if (known) {
        const next = Object.assign({}, sec, { id: known.id, heading: known.heading, type: sec.type || known.type });
        if (sec.id !== next.id || sec.heading !== next.heading) changed = true;
        return next;
      }
      const heading = sec.heading || sec.title || sec.id;
      if (heading !== sec.heading) changed = true;
      return Object.assign({}, sec, { heading });
    });
    if (changed) this.saveData(this.settings);
  }

  get store() {
    if (!this._store) {
      this._store = new ContactStore(this.app, () => this.settings, (f) => this.relType(f));
    }
    return this._store;
  }

  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.types = Object.assign({}, DEFAULT_SETTINGS.types, this.settings.types || {});
    detectLocale();
    this.normalizeSections();
    if (Array.isArray(this.settings.sections) && !this.settings.sections.some((s) => s.type === "graph")) {
      this.settings.sections.push({ id: "graph", heading: "cg-graph", type: "graph" });
      this.saveData(this.settings);
    }

    this.registerView(VIEW_TYPE, (leaf) => new ContactGraphView(leaf, this));

    // obsidian://contact-graph?action=edit&name=…
    this.registerObsidianProtocolHandler("contact-graph", (params) => {
      if (params.action === "edit" && params.name) {
        new ContactModal(this.app, this, { name: params.name }).open();
      } else if (params.action === "new") {
        new ContactModal(this.app, this, { isNew: true }).open();
      }
    });

    this.addRibbonIcon("share-2", "Beziehungsgraph", () => this.openView());
    this.addCommand({ id: "open-graph", name: tr("ui.commandOpen"), callback: () => this.openView() });
    this.registerMarkdownCodeBlockProcessor("contact-graph", (src, el, ctx) => {
      const name = (ctx.sourcePath || "").split("/").pop().replace(/\.md$/, "");
      this.renderGraphBlock(el, src, name);
    });

    this.registerMarkdownCodeBlockProcessor("contact-card", (src, el, ctx) => {
      const name = (ctx.sourcePath || "").split("/").pop().replace(/\.md$/, "");
      this.renderContactCard(el, name, ctx);
    });

    this.addCommand({
      id: "contact-edit",
      name: "Kontakt bearbeiten",
      callback: () => {
        const active = this.app.workspace.getActiveFile();
        const name = active && active.path.startsWith(this.settings.folder + "/") ? active.basename : null;
        if (!name) { new Notice(tr("ui.noContactNote")); return; }
        new ContactModal(this.app, this, { name }).open();
      },
    });

    this.addCommand({
      id: "contact-new",
      name: "Neuen Kontakt anlegen",
      callback: () => new ContactModal(this.app, this, { isNew: true }).open(),
    });

    this.addCommand({
      id: "bulk-verhaeltnis",
      name: tr("ui.bulkTitle"),
      callback: () => new BulkModal(this.app, this).open(),
    });

    this.addCommand({
      id: "complete-relations",
      name: tr("ui.commandComplete"),
      callback: () => this.openCompletion(),
    });

    this.addCommand({
      id: "toggle-photos",
      name: "Fotos/Namen umschalten",
      callback: async () => {
        this.settings.showPhotos = !this.settings.showPhotos;
        await this.saveData(this.settings);
        this.refresh();
        new Notice(this.settings.showPhotos ? "Profilbilder an" : "Namen statt Bildern");
      },
    });
    this.addSettingTab(new ContactGraphSettings(this));

    this.registerEvent(this.app.workspace.on("file-open", () => {
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
        if (leaf.view) leaf.view.pinnedCenter = null;
      }
      this.refresh();
    }));
    this.registerEvent(this.app.metadataCache.on("changed", () => this.refresh()));
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
  }

  async openView() {
    const leaf = this.app.workspace.getRightLeaf(false);
    await leaf.setViewState({ type: VIEW_TYPE, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  planCompletion() { return this.graph.planCompletion(); }

  /* Profilbilder und Namensfelder */
  auxIssues(notes) { return this.graph.auxIssues(notes); }

  /* Verlaufseintrag anhängen */
  /* Kreis und Verhältnis aus den Beziehungen zur Ich-Person ableiten */
  autoMeta(name) { return this.graph.autoMeta(name); }

  /* Nach dem Verknüpfen mit mir: Verhältnis und Kreis setzen, wenn leer */
  async applyAutoMeta(target, field) { return this.store.applyAutoMeta(target, field); }

  /* Profilbild aus einer Datei übernehmen und im Anhänge-Ordner ablegen */
  async setContactImage(name, file) {
    const ok = await this.store.setImage(name, file);
    if (ok) { new Notice(`Profilbild gesetzt: ${name}`); this.refreshAll(); }
    return ok;
  }

  /* Aus einem Namen einen Kontakt anlegen: Vorname, weitere Namen, Nachname */
  splitName(full) { return this.store.splitName(full); }

  async createContactFromName(fullName) { return this.store.createContact(fullName); }

  async addRelation(source, field, target) { return this.store.addRelation(source, field, target); }

  async addJournalEntry(name, text) {
    if (!text || !text.trim()) return false;
    const current = await this.readSection(name, "cg-journal");
    const lines = String(current || "").split("\n").filter((l) => l.trim() !== "");
    lines.push(`- ${text.trim()}`);
    return this.writeSection(name, "cg-journal", lines.join("\n"));
  }

  async applyCompletion(plan) { return this.store.applyCompletion(plan); }


  /* ---------------- Graph als Codeblock ---------------- */

  parseBlockConfig(src) {
    const cfg = {};
    const cleaned = String(src || "").replace(/```[a-zA-Z]*\s*\n?/g, "");
    for (const raw of cleaned.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const m = line.match(/^([A-Za-z_]+)\s*:\s*(.*)$/);
      if (!m) continue;
      const k = m[1].toLowerCase();
      const v = m[2].trim();
      if (k === "sel" || k === "types" || k === "hide") {
        cfg[k] = v.replace(/^\[|\]$/g, "").split(",").map((s) => s.trim()).filter(Boolean);
      } else if (v === "true" || v === "false") {
        cfg[k] = v === "true";
      } else if (/^\d+$/.test(v)) {
        cfg[k] = parseInt(v, 10);
      } else {
        cfg[k] = v;
      }
    }
    return cfg;
  }

  renderGraphBlock(el, src, noteName) {
    el.empty();
    const cfg = this.parseBlockConfig(src);
    const center = cfg.center || noteName;
    const { notes, rel } = this.buildGraph();
    if (!notes[center]) {
      el.createEl("p", { cls: "cg-hint", text: `Kontakt „${center}" nicht gefunden.` });
      return;
    }

    const depth = cfg.depth || 2;
    const mode = cfg.mode || "relation";
    const sel = new Set(cfg.sel || []);
    const photos = cfg.photos === true;
    const familyOnly = cfg.expand ? String(cfg.expand).toLowerCase() !== "all" : undefined;

    /* Typen fürs Rendern ausblenden */
    const savedTypes = this.settings.types;
    const disabled = cfg.types || cfg.hide || [];
    if (disabled.length) {
      const copy = {};
      for (const [k, v] of Object.entries(savedTypes)) copy[k] = Object.assign({}, v, { enabled: !disabled.includes(k) });
      this.settings.types = copy;
    }

    try {
      const { found, edges } = this.walk(rel, notes, center, depth, familyOnly);
      const wrap = el.createDiv({ cls: "cg-canvas cg-embed" });
      wrap.innerHTML = this.svg(center, notes, found, edges, { photos, depth, mode, sel });
      const svgEl = wrap.querySelector("svg");
      if (svgEl) {
        attachGraphHover(svgEl);
        attachZoom(wrap, svgEl, this._zoomState || (this._zoomState = { z: 1 }));
        if (cfg.height) wrap.style.maxHeight = `${cfg.height}px`;
      }
      if (found.size <= 1) {
        const hint = el.createDiv({ cls: "cg-empty-hint" });
        hint.createEl("span", { text: tr("ui.graphEmpty") });
        const b = hint.createEl("button", { cls: "cg-btn", text: tr("ui.graphAddRelation") });
        b.onclick = () => new ContactModal(this.app, this, { name: center }).open();
      }

      const foot = el.createDiv({ cls: "cg-embed-foot" });
      foot.createEl("span", {
        text: `${center} · Tiefe ${depth}`
          + (mode !== "relation" ? ` · ${mode}` : "")
          + (sel.size ? ` · ${[...sel].join(", ")}` : ""),
      });
    } finally {
      this.settings.types = savedTypes;
    }
  }

  /* Aktuelle Ansicht in die offene Notiz schreiben */
  async saveConfigToNote(center, cfg) {
    const file = this.app.workspace.getActiveFile();
    if (!file) { new Notice(tr("ui.noNote")); return null; }
    const lines = [
      `center: ${center}`,
      `depth: ${cfg.depth}`,
      `mode: ${cfg.mode}`,
      `sel: ${(cfg.sel || []).join(", ")}`,
      `photos: ${!!cfg.photos}`,
    ];
    if (cfg.types && cfg.types.length) lines.push(`types: ${cfg.types.join(", ")}`);
    const block = "```contact-graph\n" + lines.join("\n") + "\n```";

    await this.app.vault.process(file, (content) => {
      const re = /```contact-graph\n[\s\S]*?```/;
      if (re.test(content)) return content.replace(re, block);
      return content.replace(/\s*$/, "") + "\n\n" + block + "\n";
    });
    return file.path;
  }

  /* ---------------- Karten-Renderer ---------------- */

  async renderContactCard(el, name, ctx) {
    el.empty();
    this.normalizeSections();
    await this.store.migrateSections(name);
    const file = this.app.vault.getAbstractFileByPath(`${this.settings.folder}/${name}.md`);
    if (!file) { el.createEl("p", { text: `Kontakt „${name}" nicht gefunden.` }); return; }
    const cache = this.app.metadataCache.getFileCache(file);
    const fm = (cache && cache.frontmatter) || {};
    const body = await this.app.vault.read(file);

    const card = el.createDiv({ cls: "cg-card" });

    /* Profilkarte: Bild, Name, Daten und Beziehungen in einem Block */
    const profile = card.createDiv({ cls: "cg-profile" });

    const media = profile.createDiv({ cls: "cg-profile-media" });
    const img = [fm.image, fm.image_embedded].find(Boolean);
    const im = img ? String(img).match(/\[\[([^\]|]+)/) : null;
    const imgFile = im ? this.app.metadataCache.getFirstLinkpathDest(im[1].trim(), file.path) : null;
    if (imgFile) {
      const node = media.createEl("img", { cls: "cg-profile-img" });
      node.src = this.app.vault.adapter.getResourcePath(imgFile.path);
      node.alt = name;
      node.style.objectPosition = String(fm.image_position || "50% 50%");
      const sc = Number(fm.image_scale) || 1;
      if (sc > 1) {
        node.style.transform = `scale(${sc})`;
        node.style.transformOrigin = String(fm.image_position || "50% 50%");
      }
    } else {
      media.createDiv({ cls: "cg-profile-initials",
        text: name.split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase() });
    }
    media.createDiv({ cls: "cg-profile-shade" });

    const editBtn = iconButton(media, "pencil", tr("ui.editContact"),
      () => new ContactModal(this.app, this, { name }).open(), "cg-profile-edit");

    const reloadCard = () => this.renderContactCard(el, name, ctx);
    const applyImage = async (file) => {
      if (!file || !/^image\//.test(file.type || "image/")) return;
      await this.setContactImage(name, file);
      reloadCard();
    };
    media.ondragover = (ev) => { ev.preventDefault(); media.addClass("cg-drop"); };
    media.ondragleave = () => media.removeClass("cg-drop");
    media.ondrop = async (ev) => {
      ev.preventDefault();
      media.removeClass("cg-drop");
      const f = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
      if (f) await applyImage(f);
    };

    const reloadBtn = iconButton(media, "refresh-cw", tr("ui.reloadCard"),
      () => this.renderContactCard(el, name, ctx), "cg-profile-edit cg-profile-reload");

    const idBox = media.createDiv({ cls: "cg-profile-id" });
    idBox.createEl("h1", { text: name, cls: "cg-profile-name" });
    const roleParts = [fm.position, fm.company].filter(Boolean);
    const roleText = roleParts.length ? roleParts.join(" · ") : (fm.arbeit || "");
    if (roleText) idBox.createEl("div", { cls: "cg-profile-role", text: String(roleText) });
    const badges = idBox.createDiv({ cls: "cg-badges" });
    const addBadge = (text, cls) => { if (text) badges.createEl("span", { cls: `cg-badge ${cls || ""}`, text: String(text) }); };
    const auto = this.autoMeta(name) || null;
    addBadge(groupLabel(fm.circle || (auto && auto.group)), "cg-badge-kreis");
    addBadge(fm.relation || (auto && auto.label), "cg-badge-verh");
    addBadge(fm.gender === "m" ? "männlich" : fm.gender === "w" ? "weiblich" : "", "cg-badge-muted");

    /* Daten und Beziehungen im selben Block */
    const bodyBox = profile.createDiv({ cls: "cg-profile-body" });
    const rows = bodyBox.createDiv({ cls: "cg-inforows" });
    const addRow = (label, value) => {
      if (value === undefined || value === null || value === "") return;
      const r = rows.createDiv({ cls: "cg-inforow" });
      r.createEl("div", { cls: "cg-inforow-label", text: label });
      r.createEl("div", { cls: "cg-inforow-value", text: String(value) });
    };
    if (fm.birthday) {
      const d = new Date(String(fm.birthday));
      const age = isNaN(d) ? null : Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000));
      addRow("Geburtstag", d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })
        + (age !== null ? ` · ${age} Jahre` : ""));
    }
    addRow("Ort", fm.location);
    addRow("E-Mail", fm.email);
    addRow("Telefon", Array.isArray(fm.phone) ? fm.phone.join(" · ") : fm.phone);
    addRow("Website", fm.website);
    addRow("Firma", fm.company);
    addRow("Zuletzt", fm.last_contact);

    /* Beziehungen: alle Typen aus dem Katalog */
    const relBox = bodyBox.createDiv({ cls: "cg-relbox" });
    const allNotes2 = this.contacts();
    for (const rt of (this.settings.relTypes || DEFAULT_REL_TYPES)) {
      const names = asList(fm[rt.field]);
      if (!names.length) continue;
      const group = relBox.createDiv({ cls: "cg-relgroup" });
      group.createDiv({ cls: "cg-cell-label", text: rt.pl || rt.n });
      const chips = group.createDiv({ cls: "cg-chips-box" });
      for (const other of names) {
        const ofm = (allNotes2[other] || {}).fm || {};
        const chip = chips.createEl("span", { cls: "cg-chip cg-chip-link", text: other });
        chip.setAttribute("title", `${other} · ${this.relLabel(rt.field, ofm.geschlecht)}`);
        chip.onclick = () => this.app.workspace.openLinkText(other, file.path, false);
      }
    }
    /* Abschnitte */
    const sections = this.parseSections(body);
    const secWrap = card.createDiv({ cls: "cg-sections" });
    const shown = [];
    for (const sec of (this.settings.sections || [])) {
      const text = sectionText(sections, sec);
      if (text === undefined) continue;                 // gibt es in dieser Notiz nicht
      shown.push(sectionHeading(sec));                            // Überschrift wird trotzdem versteckt
      const empty = !text.trim();
      const keepsEmpty = sec.type === "journal" || sec.type === "graph" || sec.type === "address";
      if (empty && !keepsEmpty) continue;               // leere Textkästen weglassen
      this.renderSection(secWrap, sec, text, file, name, el, ctx);
    }

    /* Abschnitt hinzufügen */
    const addWrap = card.createDiv({ cls: "cg-addsection" });
    const addBtn = textIconButton(addWrap, "plus", tr("section.add"), null, "cg-add-btn");
    addBtn.onclick = (ev) => {
      const menu = new Menu();
      let any = false;
      for (const sec of (this.settings.sections || [])) {
        const text = sectionText(sections, sec);
        if (text === undefined) {
          any = true;
          menu.addItem((it) => it.setTitle(sectionLabel(sec)).onClick(async () => {
            await this.app.vault.process(file, (c) => c.replace(/\s*$/, "") + `\n\n## ${sectionHeading(sec)}\n`);
            new Notice(tr("ui.sectionAdded", { title: sectionLabel(sec) }));
            this.renderContactCard(el, name, ctx);
            // direkt zum Ausfüllen öffnen
            setTimeout(() => {
              if (sec.type === "graph") {
                new GraphConfigModal(this.app, this, name, sectionHeading(sec), "",
                  () => this.renderContactCard(el, name, ctx)).open();
              } else {
                new SectionEditModal(this.app, this, name, sectionHeading(sec), "").open();
              }
            }, 120);
          }));
        } else if (!text.trim() && sec.type !== "journal") {
          any = true;
          menu.addItem((it) => it.setTitle(`${sectionLabel(sec)} (leer)`).onClick(() => {
            new SectionEditModal(this.app, this, name, sectionHeading(sec), text || "").open();
          }));
        }
      }
      if (!any) { new Notice(tr("ui.sectionAllFilled")); return; }
      menu.showAtMouseEvent(ev);
    };

    this.hideRawSections(el, shown, ctx, file);
  }

  /* Rohe Überschriften der Abschnitte ausblenden, die als Kasten erscheinen */
  hideRawSections(el, titles, ctx, file) {
    if (!titles || !titles.length) return;
    const root = el.closest(".markdown-preview-view") || el.closest(".markdown-reading-view");
    if (!root) return;

    const hide = (node) => { if (node && node.classList) node.classList.add("cg-hidden-section"); };

    /* Überschriften stecken je nach Ansicht direkt oder in einem Wrapper */
    const headingOf = (node) => {
      if (!node || !node.tagName) return null;
      if (/^H[1-6]$/.test(node.tagName)) return node;
      const inner = typeof node.querySelector === "function"
        ? node.querySelector("h1, h2, h3, h4, h5, h6") : null;
      if (!inner) return null;
      return inner.parentElement === node ? inner : null;
    };

    let hiding = false;
    const walk = (node) => {
      for (const child of [...node.children]) {
        const heading = headingOf(child);
        if (heading) {
          const level = Number(heading.tagName.slice(1));
          const text = (heading.textContent || "").trim();
          if (level === 1) { walk(child); continue; }
          if (level === 2 && titles.includes(text)) {
            hide(child);
            hiding = true;
            walk(child);
            continue;
          }
          if (level === 2) hiding = false;
          if (hiding) hide(child);
          walk(child);
          continue;
        }
        if (hiding) hide(child);
        walk(child);
      }
    };
    walk(root);
  }

  parseSections(body) {
    const map = new Map();
    for (const sec of scanSections(body)) map.set(sec.title, sec.text);
    return map;
  }

  async readSection(name, title) { return this.store.readSection(name, title); }

  async migrateSections(name) { return this.store.migrateSections(name); }

  async writeSection(name, title, text) { return this.store.writeSection(name, title, text); }

  renderSection(parent, sec, text, file, name, hostEl, ctx) {
    const box = parent.createDiv({ cls: "cg-section" });

    const head = box.createDiv({ cls: "cg-section-head" });
    head.createEl("div", { cls: "cg-section-title", text: sectionLabel(sec) });
    const tools = head.createDiv({ cls: "cg-section-tools" });
    const editBtn = iconButton(tools, "pencil", tr("ui.editSection"), null, "cg-icon-sm");
    const delBtn = iconButton(tools, "trash-2", tr("ui.removeSection"), null, "cg-icon-sm");
    delBtn.onclick = () => {
      new ConfirmModal(this.app, tr("ui.sectionRemoveConfirm", { title: sectionLabel(sec) }),
        "Überschrift und Inhalt werden aus der Notiz gelöscht.",
        async () => {
          await this.removeSection(name, sectionHeading(sec));
          new Notice(tr("ui.sectionRemoved", { title: sectionLabel(sec) }));
          this.renderContactCard(hostEl, name, ctx);
          this.refresh();
        }).open();
    };

    if (sec.type === "graph") box.classList.add("cg-section-wide");
    const body = box.createDiv({ cls: "cg-section-body" });

    const showView = () => {
      body.empty();
      if (sec.type === "journal") {
        const all = parseJournal(text);
        const filter = String(sec.filter || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
        const entries = filter.length ? all.filter((e) => filter.includes(String(e.typ).toLowerCase())) : all;
        const listWrap = body.createDiv({ cls: "cg-journal" });
        if (!entries.length) {
          listWrap.createEl("div", { cls: "cg-chip-empty",
            text: filter.length ? `Noch keine Einträge (${sec.filter}).` : tr("ui.noEntries") });
        }
        for (const e of entries) {
          const entryIdx = all.indexOf(e);
          const row = listWrap.createDiv({ cls: "cg-journal-entry" });
          const top = row.createDiv({ cls: "cg-journal-top" });
          top.createEl("span", { cls: "cg-journal-date", text: e.date });
          if (e.typ) top.createEl("span", { cls: "cg-badge cg-badge-journal", text: e.typ });
          if (e.titel) top.createEl("span", { cls: "cg-journal-title", text: e.titel });
          const acts = top.createDiv({ cls: "cg-journal-acts" });
          const ed = iconButton(acts, "pencil", tr("ui.editEntry"), () => new JournalEntryModal(this.app, this, name, sec, e, entryIdx,
            () => this.renderContactCard(hostEl, name, ctx)).open());
          const del = iconButton(acts, "trash-2", tr("ui.journalDelete"), () => new ConfirmModal(this.app, tr("ui.journalDeleteConfirm"),
            `${e.date}${e.titel ? " · " + e.titel : ""}`, async () => {
              const current = parseJournal(await this.readSection(name, sectionHeading(sec)));
              const keep = current.filter((x, i) => i !== entryIdx);
              await this.writeSection(name, sectionHeading(sec), keep.map(formatJournal).join("\n\n"));
              this.renderContactCard(hostEl, name, ctx);
              this.refresh();
            }).open());

          if (e.meta && (e.meta.beteiligt || e.meta.ort || e.meta.notiz)) {
            const meta = row.createDiv({ cls: "cg-journal-meta" });
            if (e.meta.beteiligt) {
              const line = meta.createDiv({ cls: "cg-journal-line" });
              line.createEl("span", { cls: "cg-journal-key", text: "Beteiligt: " });
              MarkdownRenderer.renderMarkdown(e.meta.beteiligt, line, file.path, this);
            }
            if (e.meta.ort) {
              const line = meta.createDiv({ cls: "cg-journal-line" });
              line.createEl("span", { cls: "cg-journal-key", text: "Ort: " });
              MarkdownRenderer.renderMarkdown(e.meta.ort, line, file.path, this);
            }
            if (e.meta.notiz) {
              const line = meta.createDiv({ cls: "cg-journal-line" });
              line.createEl("span", { cls: "cg-journal-key", text: "Notiz: " });
              MarkdownRenderer.renderMarkdown(e.meta.notiz, line, file.path, this);
            }
          }
          const extra = [e.meta && e.meta.zusammenfassung, e.body].filter(Boolean).join("\n\n");
          if (extra) {
            const txt = row.createDiv({ cls: "cg-journal-body" });
            MarkdownRenderer.renderMarkdown(extra, txt, file.path, this);
          }
        }

        /* Altbestand: einfache "- Eintrag"-Zeilen weiter anzeigen */
        const legacy = String(text).split("\n").map((l) => l.trim())
          .filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim());
        if (legacy.length && !filter.length) {
          const box2 = listWrap.createDiv({ cls: "cg-journal-legacy" });
          for (const l of legacy) box2.createEl("div", { cls: "cg-journal-line", text: `• ${l}` });
        }

        const addWrap2 = body.createDiv({ cls: "cg-bar" });
        const addEntry = textIconButton(addWrap2, "plus", tr("journal.add"), null);
        addEntry.onclick = () => new JournalEntryModal(this.app, this, name, sec, null, -1,
          () => this.renderContactCard(hostEl, name, ctx)).open();

      } else if (sec.type === "gifts") {
        const gifts = parseGifts(text);
        const list = body.createDiv({ cls: "cg-gifts" });
        if (!gifts.length) list.createEl("div", { cls: "cg-chip-empty", text: tr("gifts.empty") });

        const save = async (next) => {
          await this.writeSection(name, sectionHeading(sec), next.map(formatGift).join("\n\n"));
          this.renderContactCard(hostEl, name, ctx);
          this.refresh();
        };

        gifts.forEach((gift, idx) => {
          const row = list.createDiv({ cls: "cg-gift" + (gift.done ? " cg-gift-done" : "") });
          const cb = row.createEl("input", { attr: { type: "checkbox" }, cls: "cg-gift-check" });
          cb.checked = !!gift.done;
          cb.onclick = async (ev) => {
            ev.stopPropagation();
            const next = parseGifts(await this.readSection(name, sectionHeading(sec)));
            next[idx].done = cb.checked ? new Date().toISOString().slice(0, 10) : "";
            await save(next);
          };

          const main = row.createDiv({ cls: "cg-gift-main" });
          const top = main.createDiv({ cls: "cg-gift-top" });
          top.createEl("span", { cls: "cg-gift-title", text: gift.title });
          if (gift.price) top.createEl("span", { cls: "cg-gift-price", text: gift.price });
          if (gift.description) main.createEl("div", { cls: "cg-gift-desc", text: gift.description });
          if (gift.link) {
            const a = main.createEl("a", { cls: "cg-gift-link", text: tr("gifts.open"), href: gift.link });
            a.setAttribute("href", gift.link);
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener");
          }

          const acts = row.createDiv({ cls: "cg-gift-acts" });
          const ed = acts.createEl("button", { cls: "cg-icon-btn cg-icon-sm", attr: { title: tr("gifts.edit") } });
          setButtonIcon(ed, "pencil");
          ed.onclick = () => new GiftModal(this.app, this, name, sec, gift, idx, () => this.renderContactCard(hostEl, name, ctx)).open();
          const del = acts.createEl("button", { cls: "cg-icon-btn cg-icon-sm", attr: { title: tr("gifts.delete") } });
          setButtonIcon(del, "trash-2");
          del.onclick = () => new ConfirmModal(this.app, tr("gifts.deleteConfirm"), gift.title, async () => {
            const next = parseGifts(await this.readSection(name, sectionHeading(sec)));
            next.splice(idx, 1);
            await save(next);
          }).open();
        });

        const addWrap = body.createDiv({ cls: "cg-bar" });
        const addBtn = textIconButton(addWrap, "plus", tr("gifts.add"), null);
        addBtn.onclick = () => new GiftModal(this.app, this, name, sec, null, -1,
          () => this.renderContactCard(hostEl, name, ctx)).open();

      } else if (sec.type === "graph") {
        this.renderGraphBlock(body, text, name);
      } else if (sec.type === "address" || /^adress/i.test(sectionHeading(sec))) {
        this.renderAddress(body, text);
      } else if (!text.trim()) {
        body.createEl("div", { cls: "cg-chip-empty", text: tr("card.empty") });
      } else {
        MarkdownRenderer.renderMarkdown(text, body, file.path, this);
      }
    };

    editBtn.onclick = () => {
      if (sec.type === "graph") {
        new GraphConfigModal(this.app, this, name, sec.title, text,
          () => this.renderContactCard(hostEl, name, ctx)).open();
        return;
      }
      new SectionEditModal(this.app, this, name, sectionHeading(sec), text,
        () => this.renderContactCard(hostEl, name, ctx)).open();
    };

    showView();
  }

  async removeSection(name, title) { return this.store.removeSection(name, title); }

  async renderAddress(parent, text) {
    const address = String(text || "").replace(/\n+/g, " ").trim();
    if (!address) {
      parent.createEl("div", { cls: "cg-chip-empty", text: tr("card.empty") });
      return;
    }
    parent.createDiv({ cls: "cg-address-text", text: address });
    const box = parent.createDiv({ cls: "cg-map" });
    box.setText(tr("ui.mapLoading"));
    try {
      const key = address.toLowerCase();
      this._geoCache = this._geoCache || new Map();
      let hit = this._geoCache.get(key);
      if (!hit) {
        const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(address);
        const res = await fetch(url, { headers: { "Accept": "application/json" } });
        const data = await res.json();
        hit = data && data[0] ? { lat: +data[0].lat, lon: +data[0].lon } : null;
        this._geoCache.set(key, hit);
      }
      if (!hit) { box.setText("Keine Koordinaten gefunden."); return; }
      const d = 0.004;
      const bbox = [hit.lon - d, hit.lat - d / 2, hit.lon + d, hit.lat + d / 2].join(",");
      const frame = box.createEl("iframe", { cls: "cg-map-frame" });
      frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${hit.lat},${hit.lon}`;
      frame.setAttribute("loading", "lazy");
      box.setText("");
      box.appendChild(frame);
      const link = box.createEl("a", { cls: "cg-map-link", text: tr("ui.mapOpen") });
      link.href = `https://www.openstreetmap.org/?mlat=${hit.lat}&mlon=${hit.lon}#map=17/${hit.lat}/${hit.lon}`;
    } catch (err) {
      box.setText(tr("ui.mapUnavailable"));
    }
  }

  async openCompletion() {
    const plan = this.planCompletion();
    if (!plan.length) {
      new Notice(tr("ui.nothingDerivable"));
      return;
    }
    new CompletionModal(this.app, this, plan).open();
  }

  refreshAll() {
    this.refresh();
    for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
      const view = leaf && leaf.view;
      if (view && view.previewMode && typeof view.previewMode.rerender === "function") {
        try { view.previewMode.rerender(true); } catch (err) { /* Ansicht geschlossen */ }
      }
    }
  }

  refresh() {
    if (this._graph) this._graph.invalidate();
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      if (leaf.view && leaf.view.render) leaf.view.render();
    }
  }

  /* ---------------- Daten ---------------- */

  contacts() { return this.graph.contacts(); }

  buildGraph() { return this.graph.buildGraph(); }

  walk(rel, notes, center, depth, familyOnly) { return this.graph.walk(rel, notes, center, depth, familyOnly); }

  /* ---------------- SVG ---------------- */

  photoURI(name, notes) {
    const fm = notes[name] ? notes[name].fm : {};
    const raw = [fm.image, fm.image_embedded].find(Boolean);
    let target = null;
    if (raw) {
      const m = String(raw).match(/\[\[([^\]|]+)/);
      if (m) target = this.app.metadataCache.getFirstLinkpathDest(m[1].trim(), "");
    }
    if (!target) {
      const guess = this.app.metadataCache.getFirstLinkpathDest(name + ".png", "");
      target = guess || this.app.metadataCache.getFirstLinkpathDest(name + ".jpg", "");
    }
    if (!target) return null;
    try { return this.app.vault.adapter.getResourcePath(target.path); } catch (e) { return null; }
  }

  relType(field) {
    const list = this.settings.relTypes || DEFAULT_REL_TYPES;
    return list.find((x) => x.field === field) || null;
  }

  /* Rolle eines Knotens im Bild — auch für Tests ohne DOM */
  roleFor(name, info, notes, center) {
    const isCenter = name === center;
    const isMe = name === this.settings.selfNote;
    if (isCenter) return isMe ? tr("roles.me") : "";
    if (!info) return "";
    const key = (info.path || []).join(",");
    const g = String((notes[name] && notes[name].fm && notes[name].fm.gender) || "").toLowerCase();

    const roleKey = (g.startsWith("m") ? ROLE_M[key] : (g.startsWith("w") || g.startsWith("f")) ? ROLE_W[key] : null)
      || ROLE[key] || "";
    let role = roleKey ? this.relKeyLabel(roleKey, g) : "";

    if (key === "relation") {
      const own = clean((notes[name] && notes[name].fm && notes[name].fm.relation) || "");
      const mine = clean((notes[center] && notes[center].fm && notes[center].fm.relation) || "");
      role = this.verhaeltnisLabel(own || mine, g) || role;
    }
    if ((info.path || []).length === 1) {
      const single = this.relLabel(info.path[0], g);
      if (single) role = single;
    }
    if (notes[name] && notes[name].ghost) {
      const gk = ROLE_M[key] || ROLE_W[key] || ROLE[key] || "";
      const gRole = gk ? this.relKeyLabel(gk, g)
        : ((info.path || []).length === 1 ? this.relLabel(info.path[0], g) : "");
      role = gRole || this.relLabel("bekannte", g);
    } else if (!role) {
      role = this.pathRole(name, info, notes, g);
    }
    return role;
  }

  /* Bezeichnung aus dem Pfad: direkt = Beziehung, indirekt = "Vater von Alex" */
  pathRole(name, info, notes, gender) {
    const kinds = info.path || [];
    const last = kinds[kinds.length - 1];
    const g = String(gender || "").toLowerCase();
    const neutral = this.relLabel("bekannte", g);
    let word = "";
    if (last === "relation") {
      const v = (notes[name] && notes[name].fm.relation) || "";
      word = this.verhaeltnisLabel(clean(v), g);
    } else if (last === "parent") {
      word = this.relLabel("kinder", g);
    } else if (this.relType(last)) {
      word = this.relLabel(last, g);
    }
    if (!word) return kinds.length <= 1 ? neutral : neutral;
    if (kinds.length <= 1) return word;
    if (!info.parent) return word;
    const short = String(info.parent).split(" ")[0];
    return tr("ui.relation.via", { word, person: short });
  }

  relKeyLabel(key, gender) {
    const g = String(gender || "").toLowerCase();
    const form = g.startsWith("m") ? "m" : (g.startsWith("w") || g.startsWith("f")) ? "w" : "n";
    return tr(`relations.${key}.${form}`);
  }

  relLabel(field, gender) {
    const t2 = this.relType(field);
    if (!t2) return "";
    const g = String(gender || "").toLowerCase();
    const form = g.startsWith("m") ? "m" : (g.startsWith("w") || g.startsWith("f")) ? "w" : "n";
    const loc = tr(`relations.${t2.key}.${form}`);
    if (loc && loc !== `relations.${t2.key}.${form}`) return loc;
    return form === "m" ? (t2.m || t2.n) : form === "w" ? (t2.w || t2.n) : t2.n;
  }

  relPlural(field) {
    const t = this.relType(field);
    return t ? (t.pl || t.n) : field;
  }

  /* verhaeltnis: neutral gespeichert, geschlechtsspezifisch angezeigt */
  verhaeltnisLabel(value, gender) {
    if (!value) return "";
    const rt = this.relType(String(value)) || relTypeByValue(value);
    if (!rt) return String(value);
    const g = String(gender || "").toLowerCase();
    if (g.startsWith("m")) return rt.m || rt.n;
    if (g.startsWith("w") || g.startsWith("f")) return rt.w || rt.n;
    return rt.n;
  }

  kreisOf(name, notes) { return this.graph.kreisOf(name, notes); }

  attrValues(name, notes, field) {
    const fm = (notes[name] && notes[name].fm) || {};
    if (field === "circle") return this.kreisOf(name, notes);
    if (field === "last_name") {
      const parts = String(name).trim().split(/\s+/);
      return parts.length ? [parts[parts.length - 1]] : [];
    }
    const raw = fm[field];
    if (raw === undefined || raw === null || raw === "") return [];
    const arr = Array.isArray(raw) ? raw : [raw];
    return arr.map((v) => clean(v)).filter(Boolean);
  }

  /* Layout ohne Seiteneffekte: Positionen, Sektoren, Flächen */
  computeLayout(center, notes, found, edges, opts) {
    const probe = sectorLayout({ center, found, edges, notes, W: 0, H: 0,
      relType: (f) => this.relType(f) });
    const maxR = Math.max(200, probe.maxR);
    const W = Math.max(900, Math.round(maxR * 2 + 260));
    const H = Math.max(760, Math.round(maxR * 2 + 220));
    const cx = W / 2, cy = H / 2;

    const pos = new Map();
    for (const [n, p] of probe.pos) pos.set(n, [p[0] + cx, p[1] + cy]);

    const wedge = (a0, a1, r) => {
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const large = a1 - a0 > Math.PI ? 1 : 0;
      return `M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} `
        + `A ${r.toFixed(1)} ${r.toFixed(1)} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
    };

    return {
      center, W, H, cx, cy, pos, wedge,
      sectorOf: probe.sectorOf,
      bounds: probe.bounds,
      sectorCounts: probe.counts,
      maxR,
      mode: opts.mode || "relation",
      sel: opts.sel || new Set(),
      depth: opts.depth,
      photos: opts.photos,
    };
  }

  svg(center, notes, found, edges, opts) {
    const L = this.computeLayout(center, notes, found, edges, opts);
    const { W, H, cx, cy, pos, sectorOf, wedge } = L;
    const maxR = L.maxR;
    const photos = L.photos;
    const mode = L.mode;
    const sel = L.sel;

    const styleFor = (kind) => this.settings.types[kind === "parent" ? "eltern" : kind] || {};
    const themed = this.settings.themeColors !== false;

    const colorOf = (kind) => {
      if (!themed) return styleFor(kind).color || "var(--text-faint)";
      if (THEME_KIND[kind]) return THEME_KIND[kind];
      const rt = this.relType(kind);
      return (rt && THEME_GROUP_COLOR[rt.group]) || "var(--text-faint)";
    };
    const dashOf = (kind) => (styleFor(kind).dashed ? ' stroke-dasharray="5 5"' : "");

    const defs = [];
    const out = [];
    out.push(`<svg xmlns="http://www.w3.org/2000/svg" class="cg-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`);
    out.push(`<rect width="${W}" height="${H}" fill="var(--background-primary)"/>`);

    /* Merkmalsgruppen als Blobs */
    const blobOut = [];
    if (mode !== "relation") {
      const groups = new Map();
      for (const name of pos.keys()) {
        for (const val of this.attrValues(name, notes, mode)) {
          if (!groups.has(val)) groups.set(val, []);
          groups.get(val).push(name);
        }
      }
      const order = [...groups.keys()].sort((a, b) => groups.get(b).length - groups.get(a).length);
      const op = Number(this.settings.blobOpacity) || 0.18;
      const pad = Number(this.settings.blobPad) || 46;
      const palette = this.settings.themeColors !== false ? THEME_PALETTE : PALETTE;

      for (const value of order) {
        if (sel.size && !sel.has(value)) continue;
        const members = groups.get(value).map((n) => pos.get(n)).filter(Boolean);
        if (!members.length) continue;
        const color = palette[order.indexOf(value) % palette.length];

        if (members.length === 2) {
          blobOut.push(`<line x1="${members[0][0].toFixed(1)}" y1="${members[0][1].toFixed(1)}" `
            + `x2="${members[1][0].toFixed(1)}" y2="${members[1][1].toFixed(1)}" stroke="${color}" `
            + `stroke-opacity="${op}" stroke-width="${pad * 2}" stroke-linecap="round"/>`);
        } else {
          blobOut.push(`<path d="${blobPath(members, pad)}" fill="${color}" fill-opacity="${op}" `
            + `stroke="${color}" stroke-opacity="${Math.min(1, op + 0.37).toFixed(2)}" stroke-width="1.5"/>`);
        }

        blobOut.push(`<text x="${members[0][0].toFixed(1)}" y="${(members[0][1] - pad - 12).toFixed(1)}" `
          + `fill="${color}" font-size="10.5" font-weight="600" text-anchor="middle" opacity="0.9">`
          + `${esc(value)} (${groups.get(value).length})</text>`);
      }
      if (blobOut.length) out.push(...blobOut);
    }

    /* Sektorflächen — unsichtbar, werden beim Überfahren eingeblendet */
    for (const sec of SECTORS) {
      const b = L.bounds[sec.id];
      if (!b || b[1] - b[0] < 0.01) continue;
      out.push(`<path class="cg-sector" data-sector="${sec.id}" d="${wedge(b[0], b[1], maxR + 60)}" `
        + `fill="var(--background-secondary)" fill-opacity="0.55" stroke="var(--background-modifier-border)" `
        + `stroke-opacity="0.5" stroke-width="1"/>`);
      const mid = (b[0] + b[1]) / 2;
      const lr = maxR + 24;
      out.push(`<text class="cg-sector-label" data-sector="${sec.id}" `
        + `x="${(cx + lr * Math.cos(mid)).toFixed(1)}" y="${(cy + lr * Math.sin(mid)).toFixed(1)}" `
        + `fill="var(--text-faint)" font-size="10.5" font-weight="600" text-anchor="middle">${sec.label()}</text>`);
    }

    for (const e of edges.values()) {
      if (!pos.has(e.from) || !pos.has(e.to)) continue;
      const [x1, y1] = pos.get(e.from), [x2, y2] = pos.get(e.to);
      const kind = e.kind;
      let label;
      if (kind === "relation") {
        const v = (notes[e.from] && notes[e.from].fm.relation) || (notes[e.to] && notes[e.to].fm.relation);
        label = this.verhaeltnisLabel(clean(v || ""), "") || "Verhältnis";
      } else if (kind === "parent") {
        label = this.relLabel("kinder", (notes[e.to] && notes[e.to].fm.gender) || "");
      } else {
        const rt = this.relType(kind);
        const g2 = (notes[e.to] && notes[e.to].fm.gender) || "";
        label = rt ? this.relLabel(kind, g2) : (styleFor(kind).label || kind);
      }
      /* leicht gebogene Kanten: parallele Linien liegen nie exakt übereinander */
      const dx = x2 - x1, dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const sign = ((e.from.length + e.to.length) % 2 === 0) ? 1 : -1;
      const off = Math.min(46, Math.max(12, len * 0.09)) * sign;
      const mx = (x1 + x2) / 2 - (dy / len) * off;
      const my = (y1 + y2) / 2 + (dx / len) * off;
      out.push(`<path class="cg-edge" data-a="${esc(e.from)}" data-b="${esc(e.to)}" data-kind="${kind}" `
        + `data-label="${esc(clean(label))}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" `
        + `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" `
        + `d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" `
        + `fill="none" stroke="${colorOf(kind)}" stroke-width="1.7" opacity="0.8"${dashOf(kind)}/>`);
    }

    for (const [name, [x, y]] of pos) {
      const isCenter = name === center;
      const isMe = name === this.settings.selfNote;
      const info = found.get(name);
      if (!info) continue;
      const role = this.roleFor(name, info, notes, center);

      const chain = [];
      let cur = name;
      while (cur) { chain.unshift(cur); cur = found.get(cur) ? found.get(cur).parent : null; }

      const dimmed = mode !== "relation" && sel.size > 0
        && !this.attrValues(name, notes, mode).some((v) => sel.has(v));
      out.push(`<g class="cg-node${dimmed ? " cg-dim" : ""}" data-name="${esc(name)}" `
        + `data-sector="${sectorOf.get(name) || ""}" `
        + `data-path="${esc(chain.join("|"))}">`);
      if (photos) {
        const r = isCenter ? 46 : 38;
        const uri = this.photoURI(name, notes);
        const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
        if (isMe) {
          out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 11}" fill="var(--interactive-accent)" `
            + `fill-opacity="0.22" stroke="var(--interactive-accent)" stroke-opacity="0.6" stroke-width="2"/>`);
          out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 5}" fill="none" `
            + `stroke="var(--interactive-accent)" stroke-width="1.5"/>`);
        }
        const ghostF = !!(notes[name] && notes[name].ghost);
        out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 3}" fill="var(--background-secondary)" `
          + `stroke="${ghostF ? "var(--color-orange)" : (isCenter ? "var(--interactive-accent)" : "var(--background-modifier-border)")}" `
          + `stroke-width="${ghostF ? 2 : 2}" ${ghostF ? 'stroke-dasharray="6 4"' : ""}/>`);
        out.push(`<text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" fill="var(--text-faint)" font-size="16" `
          + `text-anchor="middle">${esc(initials)}</text>`);
        if (uri) {
          const cid = "cgclip_" + name.replace(/[^A-Za-z0-9]/g, "_");
          defs.push(`<clipPath id="${cid}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/></clipPath>`);
          out.push(`<image x="${(x - r).toFixed(1)}" y="${(y - r).toFixed(1)}" width="${r * 2}" height="${r * 2}" `
            + `preserveAspectRatio="xMidYMid slice" href="${uri}" xlink:href="${uri}" `
            + `clip-path="url(#${cid})"/>`);
          out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="none" `
            + `stroke="${isCenter || isMe ? "var(--interactive-accent)" : "var(--background-modifier-border)"}" `
            + `stroke-width="${isCenter || isMe ? 2.5 : 2}"/>`);
        }
        out.push(`<text x="${x.toFixed(1)}" y="${(y + r + 15).toFixed(1)}" fill="var(--text-normal)" font-size="12" `
          + `font-weight="600" text-anchor="middle">${esc(name)}</text>`);
        if (role) out.push(`<text x="${x.toFixed(1)}" y="${(y + r + 29).toFixed(1)}" fill="var(--text-muted)" `
          + `font-size="10.5" text-anchor="middle">${esc(role)}</text>`);
      } else {
        if (isCenter) {
          out.push(`<text x="${x.toFixed(1)}" y="${(y - 34).toFixed(1)}" fill="var(--text-accent)" font-size="9.5" `
            + `letter-spacing="1.2" font-weight="600" text-anchor="middle">ZENTRUM</text>`);
        }
        const w = Math.max(96, Math.min(190, 12 + 7.2 * Math.max(name.length, role.length)));
        const h = role ? 46 : 34;
        if (isMe) {
          out.push(`<rect x="${(x - w / 2 - 7).toFixed(1)}" y="${(y - h / 2 - 7).toFixed(1)}" `
            + `width="${w + 14}" height="${h + 14}" rx="14" fill="var(--interactive-accent)" fill-opacity="0.22" `
            + `stroke="var(--interactive-accent)" stroke-opacity="0.6" stroke-width="2"/>`);
        }
        const ghost = !!(notes[name] && notes[name].ghost);
        out.push(`<rect x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w}" height="${h}" rx="9" `
          + `fill="${isCenter ? "var(--interactive-accent)" : (isMe ? "var(--interactive-accent-hover)" : "var(--background-secondary)")}" `
          + `stroke="${ghost ? "var(--color-orange)" : (isCenter || isMe ? "var(--interactive-accent)" : "var(--background-modifier-border)")}" `
          + `stroke-width="${ghost ? 1.8 : (isCenter || isMe ? 2.5 : 1)}" `
          + `${ghost ? 'stroke-dasharray="6 4"' : ""}/>`);
        out.push(`<text x="${x.toFixed(1)}" y="${(y - (role ? 4 : -4)).toFixed(1)}" `
          + `fill="${isCenter || isMe ? "var(--text-on-accent)" : "var(--text-normal)"}" font-size="12.5" font-weight="600" `
          + `text-anchor="middle">${esc(name)}</text>`);
        if (role) out.push(`<text x="${x.toFixed(1)}" y="${(y + 13).toFixed(1)}" `
          + `fill="${isCenter || isMe ? "var(--text-on-accent)" : "var(--text-muted)"}" font-size="10.5" text-anchor="middle">${esc(role)}</text>`);
      }
      out.push("</g>");
    }

    if (defs.length) out.splice(2, 0, "<defs>" + defs.join("") + "</defs>");
    out.push("</svg>");
    return out.join("\n");
  }
};

/* ------------------------------------------------------------------ */

module.exports = ContactGraph;
