const { t: tr } = require("./i18n");
const { Notice, Modal, MarkdownRenderer } = require("obsidian");
const { DEFAULT_REL_TYPES, DEFAULT_SECTIONS, SECTORS, kreisDefaultValues, FIELD_LABEL, sectionHeading, sectionLabel, groupLabel } = require("./constants");
const { clean, asList, iconButton, setButtonIcon, textIconButton } = require("./util");
const { parseJournal, formatJournal, parseGifts, formatGift } = require("./markdown");

class ImageModal extends Modal {
  constructor(app, plugin, name, after) {
    super(app);
    this.plugin = plugin;
    this.name = name;
    this.after = after;
    this.pending = null;
    this.position = "50% 50%";
    this.scale = 1;
  }

  async onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: tr("image.title") });

    if (!this.name) {
      el.createEl("div", { cls: "cg-chip-empty", text: tr("ui.needName") });
      return;
    }

    const fm = await this.readFm();
    this.position = String(fm.image_position || "50% 50%");
    this.scale = Number(fm.image_scale) || 1;
    this.current = fm.image ? String(fm.image) : "";

    const editor = el.createDiv({ cls: "cg-image-editor" });
    const stage = editor.createDiv({ cls: "cg-crop-stage" });
    const crop = stage.createDiv({ cls: "cg-crop cg-crop-large" });
    editor.createEl("div", { cls: "cg-crop-hint", text: tr("image.positionHint") });

    const paint = () => {
      const m2 = this.current ? String(this.current).match(/\[\[([^\]|]+)/) : null;
      const target = m2 ? this.app.metadataCache.getFirstLinkpathDest(m2[1].trim(), "") : null;
      const url = this.pending ? this.pending.url
        : (target ? this.plugin.app.vault.adapter.getResourcePath(target.path) : "");
      crop.style.backgroundImage = url ? `url("${url}")` : "none";
      crop.style.backgroundPosition = this.position;
      const pct = `${Math.round(this.scale * 100)}%`;
      crop.style.backgroundSize = `${pct} ${pct}`;
      crop.classList.toggle("cg-crop-empty", !url);
    };
    paint();

    /* Zeiger-Ereignisse: Maus, Stift und Finger gleich behandelt */
    const pointers = new Map();
    let drag = null;
    let pinch = null;

    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

    const pan = (dx, dy) => {
      if (!drag) return;
      const rect = crop.getBoundingClientRect ? crop.getBoundingClientRect() : { width: 220, height: 220 };
      const w = rect.width || 220;
      const h = rect.height || 220;
      const base = String(drag.pos).split(/\s+/).map((v) => parseFloat(v) || 50);
      const x = clamp(base[0] - ((dx + (drag.dx || 0)) / w) * 100, 0, 100);
      const y = clamp(base[1] - ((dy + (drag.dy || 0)) / h) * 100, 0, 100);
      this.position = `${Math.round(x)}% ${Math.round(y)}%`;
      paint();
    };

    const applyPinch = () => {
      if (!pinch) return;
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.startDist > 0 && dist > 0) {
        this.scale = clamp(pinch.startScale * (dist / pinch.startDist), 1, 3);
        zoom.value = String(this.scale);
        paint();
      }
    };

    crop.onpointerdown = (ev) => {
      if (ev.preventDefault) ev.preventDefault();
      if (crop.setPointerCapture) { try { crop.setPointerCapture(ev.pointerId); } catch (e) { /* egal */ } }
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (pointers.size === 1) {
        drag = { x: ev.clientX, y: ev.clientY, pos: this.position };
        pinch = null;
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { startDist: Math.hypot(a.x - b.x, a.y - b.y), startScale: this.scale };
        drag = null;
      }
    };

    crop.onpointermove = (ev) => {
      if (!pointers.has(ev.pointerId)) return;
      if (ev.preventDefault) ev.preventDefault();
      pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (pointers.size >= 2) { applyPinch(); return; }
      if (drag) pan(ev.clientX - drag.x, ev.clientY - drag.y);
    };

    const release = (ev) => {
      pointers.delete(ev.pointerId);
      if (pointers.size === 0) { drag = null; pinch = null; }
      else if (pointers.size === 1) {
        const rest = [...pointers.values()][0];
        drag = { x: rest.x, y: rest.y, pos: this.position };
        pinch = null;
      }
    };
    crop.onpointerup = release;
    crop.onpointercancel = release;
    crop.onpointerleave = (ev) => { if (!crop.hasPointerCapture || !crop.hasPointerCapture(ev.pointerId)) release(ev); };

    /* Zoom per Mausrad und Schieber */
    crop.onwheel = (ev) => {
      if (ev.preventDefault) ev.preventDefault();
      this.scale = clamp(this.scale + (ev.deltaY < 0 ? 0.1 : -0.1), 1, 3);
      zoom.value = String(this.scale);
      paint();
    };

    const zoomRow = el.createDiv({ cls: "cg-form-row" });
    zoomRow.createEl("label", { text: tr("image.zoom"), cls: "cg-form-label" });
    const zoom = zoomRow.createEl("input", { attr: { type: "range", min: "1", max: "3", step: "0.05" }, cls: "cg-zoom" });
    zoom.value = String(this.scale);
    zoom.oninput = () => { this.scale = Number(zoom.value) || 1; paint(); };

    const bar1 = el.createDiv({ cls: "cg-bar" });
    const pick = bar1.createEl("button", { cls: "cg-btn", text: tr("image.choose") });
    const reset = bar1.createEl("button", { cls: "cg-btn", text: tr("image.reset") });
    const fileInput = bar1.createEl("input", { attr: { type: "file", accept: "image/*" } });
    fileInput.addClass("cg-hidden-input");

    pick.onclick = () => fileInput.click();
    fileInput.onchange = () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;
      this.pending = { file: f, url: typeof URL !== "undefined" && URL.createObjectURL ? URL.createObjectURL(f) : "" };
      paint();
    };
    reset.onclick = () => {
      this.position = "50% 50%";
      this.scale = 1;
      zoom.value = "1";
      paint();
    };

    const bar2 = el.createDiv({ cls: "cg-bar" });
    const save = bar2.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr("ui.save") });
    const cancel = bar2.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();

    save.onclick = async () => {
      try {
        if (this.pending) {
          const ok = await this.plugin.store.setImage(this.name, this.pending.file);
          if (!ok) { new Notice(tr("image.failed")); return; }
        }
        await this.plugin.store.patchFrontmatter(this.name, (f) => {
          f.image_position = this.position;
          f.image_scale = Number(this.scale.toFixed(2));
        });
        new Notice(tr("image.saved"));
        this.close();
        if (this.after) this.after();
        this.plugin.refreshAll();
      } catch (err) {
        new Notice(`${tr("image.failed")}: ${err && err.message ? err.message : err}`);
      }
    };
  }

  async readFm() {
    const file = this.plugin.app.vault.getAbstractFileByPath(`${this.plugin.settings.folder}/${this.name}.md`);
    if (!file) return {};
    const cache = this.plugin.app.metadataCache.getFileCache(file);
    return (cache && cache.frontmatter) || {};
  }
}

class GiftModal extends Modal {
  constructor(app, view, name, sec, gift, index, after) {
    super(app);
    this.view = view;
    this.name = name;
    this.sec = sec;
    this.gift = gift;
    this.index = index;
    this.after = after;
  }

  async onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: this.gift ? tr("gifts.edit") : tr("gifts.new", { title: tr("sections.gifts") }) });

    const wrap = el.createDiv({ cls: "cg-form" });
    const textRow = (label, value, placeholder) => {
      const r = wrap.createDiv({ cls: "cg-form-row" });
      r.createEl("label", { text: label, cls: "cg-form-label" });
      const i = r.createEl("input", { type: "text", cls: "cg-form-input" });
      i.value = value || "";
      if (placeholder) i.placeholder = placeholder;
      return i;
    };

    const g = this.gift || { title: "", description: "", link: "", price: "", done: "" };
    const titleI = textRow(tr("field.giftTitle"), g.title, "LEGO Technic 42100");
    const priceI = textRow(tr("field.giftPrice"), g.price, "49,99 €");
    const linkI = textRow(tr("field.giftLink"), g.link, "https://…");

    const descRow = wrap.createDiv({ cls: "cg-form-row cg-form-col" });
    descRow.createEl("label", { text: tr("field.giftDescription"), cls: "cg-form-label" });
    const descT = descRow.createEl("textarea", { cls: "cg-form-input" });
    descT.rows = 3;
    descT.value = g.description || "";

    const doneRow = wrap.createDiv({ cls: "cg-form-row" });
    doneRow.createEl("label", { text: tr("gifts.done"), cls: "cg-form-label" });
    const doneCb = doneRow.createEl("input", { attr: { type: "checkbox" } });
    doneCb.checked = !!g.done;

    const bar = el.createDiv({ cls: "cg-bar" });
    const save = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr("ui.save") });
    const cancel = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();

    save.onclick = async () => {
      const title = titleI.value.trim();
      if (!title) { new Notice(tr("gifts.needTitle")); return; }
      const next = {
        title,
        description: descT.value.trim(),
        link: linkI.value.trim(),
        price: priceI.value.trim(),
        done: doneCb.checked ? (g.done || new Date().toISOString().slice(0, 10)) : "",
      };
      const current = parseGifts(await this.view.readSection(this.name, sectionHeading(this.sec)));
      if (this.gift && this.index >= 0) current[this.index] = next;
      else current.push(next);
      await this.view.writeSection(this.name, sectionHeading(this.sec), current.map(formatGift).join("\n\n"));
      new Notice(tr("gifts.saved"));
      this.close();
      if (this.after) this.after();
      this.view.refresh();
    };

    titleI.focus();
  }
}

class ConfirmModal extends Modal {
  constructor(app, title, text, onOk) {
    super(app);
    this.title = title;
    this.text = text;
    this.onOk = onOk;
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: this.title });
    if (this.text) el.createEl("p", { text: this.text, cls: "cg-chip-empty" });
    const bar = el.createDiv({ cls: "cg-bar" });
    const ok = bar.createEl("button", { cls: "cg-btn cg-btn-danger", text: "Entfernen" });
    const no = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    ok.onclick = async () => { this.close(); if (this.onOk) await this.onOk(); };
    no.onclick = () => this.close();
  }
}

class JournalEntryModal extends Modal {
  constructor(app, view, name, sec, entry, entryIndex, after) {
    super(app);
    this.view = view;
    this.name = name;
    this.sec = sec;
    this.entry = entry;
    this.entryIndex = entryIndex;
    this.after = after;
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    const e = this.entry;
    el.createEl("h3", { text: e ? tr("journal.edit") : tr("journal.new", { title: tr("sections.journal") }) });

    const wrap = el.createDiv({ cls: "cg-form" });
    const row = (label, value, placeholder) => {
      const r = wrap.createDiv({ cls: "cg-form-row" });
      r.createEl("label", { text: label, cls: "cg-form-label" });
      const i = r.createEl("input", { type: "text", cls: "cg-form-input" });
      i.value = value || "";
      if (placeholder) i.placeholder = placeholder;
      return i;
    };

    const today = new Date().toISOString().slice(0, 10);
    const filterTyp = String(this.sec.filter || "").split(",")[0].trim();
    const dateI = row(tr("field.date"), e ? e.date : today, "2026-11-17");
    const typI = row(tr("field.type"), e ? e.typ : filterTyp, "Besprechung, Telefonat, Treffen …");
    const typList = el.createEl("datalist", { attr: { id: "cg-jl-typ" } });
    const known = new Set(["Besprechung", "Telefonat", "Treffen", tr("field.email"), "Nachricht", "Notiz"]);
    for (const t of [...known].sort()) typList.createEl("option", { value: t });
    typI.setAttribute("list", "cg-jl-typ");

    const titelI = row(tr("field.title"), e ? e.titel : "", "Worum ging es?");
    const betI = row(tr("field.participants"), e ? (e.meta.beteiligt || "") : "", "[[Name]], [[Name]]");
    betI.setAttribute("list", "cg-dl-contacts");
    const notizI = row(tr("ui.linkedNote"), e ? (e.meta.notiz || "") : "", "[[Besprechung 2026-11-17]]");
    const ortI = row(tr("field.place"), e ? (e.meta.ort || "") : "", "optional");

    const sumRow = wrap.createDiv({ cls: "cg-form-row cg-form-col" });
    sumRow.createEl("label", { text: tr("field.summary"), cls: "cg-form-label" });
    const sumT = sumRow.createEl("textarea", { cls: "cg-form-input" });
    sumT.rows = 2;
    sumT.value = e ? (e.meta.zusammenfassung || "") : "";

    const bodyRow = wrap.createDiv({ cls: "cg-form-row cg-form-col" });
    bodyRow.createEl("label", { text: tr("field.notes"), cls: "cg-form-label" });
    const bodyT = bodyRow.createEl("textarea", { cls: "cg-form-input" });
    bodyT.rows = 5;
    bodyT.value = e ? (e.body || "") : "";

    const link = (v) => String(v || "").split(",").map((s) => s.trim()).filter(Boolean)
      .map((s) => (s.startsWith("[[") ? s : `[[${s}]]`)).join(", ");

    const bar = el.createDiv({ cls: "cg-bar" });
    const save = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr("ui.save") });
    const cancel = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();

    save.onclick = async () => {
      const next = {
        date: dateI.value.trim() || today,
        typ: typI.value.trim(),
        titel: titelI.value.trim(),
        meta: {
          beteiligt: link(betI.value),
          notiz: link(notizI.value),
          ort: ortI.value.trim(),
          zusammenfassung: sumT.value.trim(),
        },
        body: bodyT.value.trim(),
      };
      const current = parseJournal(await this.view.readSection(this.name, sectionHeading(this.sec)));
      let list;
      if (this.entry && this.entryIndex >= 0) list = current.map((x, i) => (i === this.entryIndex ? next : x));
      else list = current.concat([next]);
      list.sort((a, b) => String(b.date).localeCompare(String(a.date)));
      await this.view.writeSection(this.name, sectionHeading(this.sec), list.map(formatJournal).join("\n\n"));
      new Notice("Eintrag gespeichert");
      this.close();
      if (this.after) this.after();
      this.view.refresh();
    };

    dateI.focus();
  }
}

class PresetModal extends Modal {
  constructor(app, title, onSubmit) {
    super(app);
    this.titleText = title;
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: this.titleText });
    const input = contentEl.createEl("input", { type: "text", cls: "cg-preset-input" });
    input.placeholder = "Name des Presets";
    input.style.width = "100%";
    input.focus();
    const row = contentEl.createDiv({ cls: "cg-bar" });
    const ok = row.createEl("button", { text: tr("ui.save"), cls: "cg-btn on" });
    const cancel = row.createEl("button", { text: tr("ui.cancel"), cls: "cg-btn" });
    const submit = () => {
      const name = input.value.trim();
      this.close();
      if (name) this.onSubmit(name);
    };
    ok.onclick = submit;
    cancel.onclick = () => this.close();
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") submit();
      if (ev.key === "Escape") this.close();
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

/* ------------------------------------------------------------------ */


/* Beziehungskatalog: neutrale Grundform, m/w für die Anzeige */

class CompletionModal extends Modal {
  constructor(app, plugin, plan) {
    super(app);
    this.plugin = plugin;
    this.plan = plan;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h3", { text: tr("ui.commandCompleteContacts") });

    const sections = [
      { kind: "relation", title: "Beziehungen" },
      { kind: "kreis", title: "Kreise" },
      { kind: "image", title: "Profilbilder" },
      { kind: "name", title: tr("ui.groupNames") },
      { kind: "duplicate_name", title: tr("ui.groupDuplicates") },
    ];

    const byNote = new Map();
    let appliable = 0, warnings = 0;
    for (const item of this.plan) {
      if (!byNote.has(item.name)) byNote.set(item.name, []);
      byNote.get(item.name).push(item);
      if (item.action === "missing" || item.action === "warn") warnings++; else appliable++;
    }
    contentEl.createEl("p", {
      cls: "setting-item-description",
      text: `${appliable} Ergänzungen in ${byNote.size} Notizen`
        + (warnings ? ` · ${warnings} Hinweise ohne Änderung` : "")
        + ". Es wird nur hinzugefügt, nichts entfernt.",
    });

    this.boxes = [];
    const list = contentEl.createDiv({ cls: "cg-plan" });
    for (const { kind, title } of sections) {
      const entries = [...byNote.entries()]
        .map(([name, items]) => [name, items.filter((i) => i.kind === kind)])
        .filter(([, items]) => items.length)
        .sort((a, b) => a[0].localeCompare(b[0]));
      if (!entries.length) continue;
      list.createEl("h4", { text: title, cls: "cg-plan-head" });
      for (const [name, items] of entries) {
        const row = list.createDiv({ cls: "cg-plan-row" });
        const fixable = items.filter((i) => i.action !== "missing");
        let cb = null;
        if (fixable.length) {
          cb = row.createEl("input", { type: "checkbox" });
          cb.checked = kind !== "name";   // Namensfelder betreffen alle Notizen: erst auf Klick
          cb.dataset.name = name;
          this.boxes.push(cb);
        } else {
          row.createEl("span", { text: "!", cls: "cg-warn" });
        }
        const text = row.createDiv({ cls: "cg-plan-text" });
        text.createEl("strong", { text: name });
        for (const item of items) {
          if (item.kind === "relation") {
            text.createEl("div", { cls: "cg-plan-item", text: `${FIELD_LABEL[item.field] || item.field} + ${item.add.join(", ")}` });
          } else if (item.kind === "image") {
            text.createEl("div", {
              cls: item.action === "missing" ? "cg-plan-item cg-warn-text" : "cg-plan-item",
              text: item.action === "missing"
                ? `Bild fehlt: ${item.value}`
                : `Bild setzen: ${item.value}`,
            });
          } else {
            text.createEl("div", { cls: "cg-plan-item", text: `${item.field} = ${item.value}` });
          }
        }
      }
    }

    /* Fußzeile */
    const bar = contentEl.createDiv({ cls: "cg-bar" });
    const all = bar.createEl("button", { text: "alle / keine", cls: "cg-btn" });
    all.onclick = () => {
      const anyOff = this.boxes.some((b) => !b.checked);
      this.boxes.forEach((b) => { b.checked = anyOff; });
    };
    const ok = bar.createEl("button", { text: "Übernehmen", cls: "cg-btn on" });
    ok.onclick = async () => {
      const chosen = new Set(this.boxes.filter((b) => b.checked).map((b) => b.dataset.name));
      const plan = this.plan.filter((p) => chosen.has(p.name));
      ok.setText("…");
      const res = await this.plugin.applyCompletion(plan);
      this.close();
      new Notice(`Fertig: ${res.added} Einträge in ${res.changed} Notizen ergänzt.`);
      this.plugin.refreshAll();
    };
    const cancel = bar.createEl("button", { text: tr("ui.cancel"), cls: "cg-btn" });
    cancel.onclick = () => this.close();
  }

  onClose() {
    this.contentEl.empty();
  }
}


/* ------------------------------------------------------------------ */

class ContactModal extends Modal {
  constructor(app, plugin, opts) {
    super(app);
    this.plugin = plugin;
    this.opts = opts || {};
    this.name = this.opts.name || "";
    this.fm = {};
    this.body = "";
    this.values = {};
    this.relations = {};
    this.removed = {};
    this.aliasList = [];
  }

  async onOpen() {
    this.contentEl.addClass("cg-contact");
    if (!this.opts.isNew) await this.load();
    this.render();
  }

  filePath(name) {
    return `${this.plugin.settings.folder}/${name}.md`;
  }

  async load() {
    const file = this.plugin.app.vault.getAbstractFileByPath(this.filePath(this.name));
    if (!file) return;
    const cache = this.plugin.app.metadataCache.getFileCache(file);
    this.fm = (cache && cache.frontmatter) || {};
    this.body = await this.plugin.app.vault.read(file);
    for (const t2 of (this.plugin.settings.relTypes || DEFAULT_REL_TYPES)) this.relations[t2.field] = asList(this.fm[t2.field]);
    this.aliasList = asList(this.fm.aliases);
  }

  journalEntries() {
    const m = this.body.match(/^## (?:Verlauf|Journal|cg-journal)\s*$([\s\S]*?)(?=^## |\Z)/m);
    if (!m) return [];
    const entries = parseJournal(m[1]);
    return entries.map((e) => [e.date, e.type, e.title].filter(Boolean).join(" · ") || e.summary || "");
  }

  textRow(parent, label, key, placeholder, listId, kind) {
    const row = parent.createDiv({ cls: "cg-form-row" });
    row.createEl("label", { text: label, cls: "cg-form-label" });
    const input = row.createEl("input", { type: kind === "date" ? "date" : "text", cls: "cg-form-input" });
    input.value = (this.fm[key] === undefined || this.fm[key] === null) ? "" : String(this.fm[key]).replace(/^\[\[|\]\]$/g, "");
    input.placeholder = placeholder || "";
    if (listId) input.setAttribute("list", listId);
    input.oninput = () => { this.values[key] = input.value.trim(); this.fm[key] = this.values[key]; };
    this.values[key] = input.value.trim();
    return input;
  }

  dateRow(parent, label, key) {
    return this.textRow(parent, label, key, "", null, "date");
  }

  selectRow(parent, label, key, options) {
    const row = parent.createDiv({ cls: "cg-form-row" });
    row.createEl("label", { text: label, cls: "cg-form-label" });
    const sel = row.createEl("select", { cls: "cg-form-input" });
    for (const [value, text] of options) sel.createEl("option", { text, value });
    const cur = (this.fm[key] === undefined || this.fm[key] === null) ? "" : String(this.fm[key]);
    if (options.some(([v]) => v === cur)) sel.value = cur;
    sel.onchange = () => { this.values[key] = sel.value; this.fm[key] = sel.value; };
    this.values[key] = sel.value;
    return sel;
  }

  relationBlock(parent, field, label) {
    const wrap = parent.createDiv({ cls: "cg-rel" });
    const head = wrap.createDiv({ cls: "cg-rel-head" });
    head.createEl("div", { text: label, cls: "cg-form-label" });
    const add = iconButton(head, "plus", tr("ui.addRelation"), null, "cg-icon-sm");
    add.onclick = () => {
      if (this.opts.isNew) { new Notice(tr("ui.saveFirst")); return; }
      new RelationPickerModal(this.app, this.plugin, this.name, field, async () => {
        await this.reloadRelations();
        this.render();
      }).open();
    };

    const box = wrap.createDiv({ cls: "cg-chips-box" });
    const paint = () => {
      box.empty();
      const list = this.relations[field] || [];
      if (!list.length) box.createEl("span", { text: "—", cls: "cg-chip-empty" });
      for (const n of list) {
        const chip = box.createEl("span", { cls: "cg-chip", text: n });
        const x = iconButton(chip, "x", tr("ui.remove"), null, "cg-chip-x");
        x.onclick = () => {
          this.relations[field] = list.filter((v) => v !== n);
          if (!this.removed[field]) this.removed[field] = new Set();
          this.removed[field].add(n);
          paint();
        };
      }
    };
    paint();
  }

  render() {
    const el = this.contentEl;
    el.empty();
    el.createEl("h3", { text: this.opts.isNew ? tr("ui.newContact") : tr("ui.contactTitle", { name: this.name }) });

    /* Datalisten */
    const contacts = Object.keys(this.plugin.contacts()).sort();
    const dl = el.createEl("datalist", { attr: { id: "cg-dl-contacts" } });
    for (const n of contacts) dl.createEl("option", { value: n });
    const files = this.plugin.app.vault.getFiles().filter((f) => f.path.startsWith(`${this.plugin.settings.folder}/Anhänge/`));
    const dlf = el.createEl("datalist", { attr: { id: "cg-dl-files" } });
    for (const f of files) dlf.createEl("option", { value: f.name });

    const verh = new Set();
    const kreise = new Set();
    const allNotes = this.plugin.contacts();
    for (const n of Object.keys(allNotes)) {
      const f2 = allNotes[n].fm || {};
      if (f2.relation) verh.add(clean(f2.relation));
      if (f2.circle) kreise.add(clean(f2.circle));
    }
    const dlv = el.createEl("datalist", { attr: { id: "cg-dl-verh" } });
    for (const v of [...verh].sort()) dlv.createEl("option", { value: v });
    const dlk = el.createEl("datalist", { attr: { id: "cg-dl-kreis" } });
    for (const v of [...kreisDefaultValues(), ...kreise].sort()) dlk.createEl("option", { value: v });

    const scroll = el.createDiv({ cls: "cg-form" });

    if (this.opts.isNew) {
      const row = scroll.createDiv({ cls: "cg-form-row" });
      row.createEl("label", { text: "Name (Dateiname)", cls: "cg-form-label" });
      const input = row.createEl("input", { type: "text", cls: "cg-form-input" });
      input.placeholder = "Vorname Nachname";
      input.oninput = () => { this.name = input.value.trim(); };
    }

    scroll.createEl("h4", { text: tr("ui.person"), cls: "cg-form-head" });
    this.textRow(scroll, tr("field.firstName"), "first_name");
    this.textRow(scroll, tr("field.lastName"), "last_name");
    this.textRow(scroll, tr("field.middleNames"), "aliases");
    const imgRow = scroll.createDiv({ cls: "cg-form-row" });
    imgRow.createEl("label", { text: tr("field.image"), cls: "cg-form-label" });
    const imgBox = imgRow.createDiv({ cls: "cg-form-input cg-img-row" });
    imgBox.createEl("span", { cls: "cg-chip-empty",
      text: this.fm.image ? String(this.fm.image).replace(/[\[\]]/g, "").split("|")[0] : tr("ui.noImage") });
    const imgBtn = imgBox.createEl("button", { cls: "cg-btn", text: tr("image.open") });
    imgBtn.onclick = () => new ImageModal(this.app, this.plugin, this.name,
      async () => { await this.load(); this.render(); }).open();

    this.dateRow(scroll, tr("field.birthday"), "birthday");
    this.selectRow(scroll, tr("field.gender"), "gender", [["", "—"], ["m", tr("gender.male")], ["w", tr("gender.female")]]);
    this.textRow(scroll, tr("field.image"), "image", "Datei in Anhänge/", "cg-dl-files");

    scroll.createEl("h4", { text: tr("ui.contactSection"), cls: "cg-form-head" });
    this.textRow(scroll, tr("field.email"), "email");
    this.textRow(scroll, tr("field.phone"), "phone");
    this.textRow(scroll, tr("field.website"), "website");
    this.textRow(scroll, tr("field.place"), "location");
    this.textRow(scroll, tr("field.company"), "company");
    this.textRow(scroll, tr("field.position"), "position");

    scroll.createEl("h4", { text: tr("ui.grouping"), cls: "cg-form-head" });
    this.textRow(scroll, tr("field.circle"), "circle", "Familie, Arbeit, Freunde …", "cg-dl-kreis");
    const verhOpts = [["", "—"]].concat((this.plugin.settings.relTypes || DEFAULT_REL_TYPES)
      .filter((rt) => rt.field !== "kinder" && rt.field !== "eltern" && rt.field !== "geschwister")
      .map((rt) => [rt.n, rt.n]));
    const curVerh = clean(this.fm.relation || "");
    if (curVerh && !verhOpts.some(([v]) => v === curVerh)) verhOpts.push([curVerh, `${curVerh} (alt)`]);
    this.selectRow(scroll, tr("ui.fieldRelation"), "relation", verhOpts);
    this.dateRow(scroll, tr("field.met"), "met");
    this.dateRow(scroll, tr("field.lastContact"), "last_contact");

    scroll.createEl("h4", { text: tr("card.relations"), cls: "cg-form-head" });
    const typesAll = (this.plugin.settings.relTypes || DEFAULT_REL_TYPES);
    const filled = typesAll.filter((rt) => (this.relations[rt.field] || []).length);
    if (!filled.length) {
      scroll.createEl("div", { cls: "cg-chip-empty", text: "Noch keine Beziehungen." });
    }
    for (const rt of filled) {
      this.relationBlock(scroll, rt.field, this.plugin.relPlural(rt.field));
    }
    const addRelRow = scroll.createDiv({ cls: "cg-bar" });
    const addRelBtn = textIconButton(addRelRow, "plus", tr("ui.addRelation"), null);
    addRelBtn.onclick = () => {
      new RelationPickerModal(this.app, this.plugin, this.name, null, async () => {
        await this.reloadRelations();
      }).open();
    };

    /* Verlauf */
    scroll.createEl("h4", { text: tr("sections.journal"), cls: "cg-form-head" });
    const journal = scroll.createDiv({ cls: "cg-journal-box" });
    const entries = this.journalEntries();
    if (!entries.length) journal.createEl("div", { text: tr("ui.noEntries"), cls: "cg-chip-empty" });
    for (const e of entries) journal.createEl("div", { text: `• ${e}`, cls: "cg-journal-line" });
    const jrow = scroll.createDiv({ cls: "cg-form-row" });
    jrow.createEl("label", { text: "Neuer Eintrag", cls: "cg-form-label" });
    const jinput = jrow.createEl("input", { type: "text", cls: "cg-form-input" });
    jinput.placeholder = "z. B. Kaffee trinken gegangen";
    const jbtn = jrow.createEl("button", { text: tr("ui.add"), cls: "cg-btn" });
    jbtn.onclick = async () => {
      if (!this.name) { new Notice(tr("ui.saveFirst")); return; }
      if (await this.plugin.addJournalEntry(this.name, jinput.value)) {
        jinput.value = "";
        await this.load();
        this.render();
      }
    };

    /* Fußzeile */
    const bar = el.createDiv({ cls: "cg-bar" });
    const ok = bar.createEl("button", { text: tr("ui.save"), cls: "cg-btn on" });
    ok.onclick = () => this.save();
    const comp = bar.createEl("button", { text: tr("ui.complete"), cls: "cg-btn" });
    comp.onclick = () => this.complete();
    const cancel = bar.createEl("button", { text: tr("ui.cancel"), cls: "cg-btn" });
    cancel.onclick = () => this.close();
  }

  async reloadRelations() {
    const fm = await this.plugin.store.fmOf(this.name);
    for (const rt of (this.plugin.settings.relTypes || DEFAULT_REL_TYPES)) {
      this.relations[rt.field] = asList(fm[rt.field]);
    }
    this.render();
  }

  async complete() {
    if (!this.name) { new Notice(tr("ui.saveFirst")); return; }
    const plan = this.plugin.planCompletion().filter((p) => p.name === this.name && p.action !== "missing");
    if (!plan.length) { new Notice(tr("ui.nothingToAdd")); return; }
    const res = await this.plugin.applyCompletion(plan);
    new Notice(`${res.added} Einträge ergänzt.`);
    await this.load();
    this.render();
    this.plugin.refreshAll();
  }

  async save() {
    if (!this.name) { new Notice(tr("ui.needName")); return; }
    const path = this.filePath(this.name);

    /* Gleicher Name schon vorhanden? */
    if (!this.plugin.store.exists(this.name) && !this.sameNameOk) {
      const clashes = this.plugin.store.findByName(this.name).filter((n) => n !== this.name);
      if (clashes.length) {
        new NameConflictModal(this.app, this.plugin, this.name, clashes, "", (res) => {
          this.sameNameOk = true;
          this.name = res.action === "create" ? res.name : res.name;
          if (res.action === "existing") { this.close(); return; }
          this.save();
        }).open();
        return;
      }
    }

    let file = this.plugin.app.vault.getAbstractFileByPath(path);
    let created = false;
    if (!file) {
      await this.plugin.app.vault.create(path, "---\n---\n\n```contact-card\n```\n");
      file = this.plugin.app.vault.getAbstractFileByPath(path);
      created = true;
    }
    const today = new Date().toISOString().slice(0, 10);
    await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
      const set = (k, v) => { if (v === "" || v === undefined) delete fm[k]; else fm[k] = v; };
      for (const k of ["first_name", "last_name", "birthday", "email", "phone", "website",
        "location", "company", "position", "circle", "relation", "met", "last_contact"]) {
        set(k, this.values[k]);
      }
      set("gender", this.values.gender || "");
      if (!this.values.vorname && !this.values.nachname) {
        const parts = this.plugin.splitName(this.name);
        if (parts.vorname) fm.first_name = parts.vorname;
        if (parts.nachname) fm.last_name = parts.nachname;
        if (parts.weitere) fm.aliases = parts.weitere;
      }
      if (!fm.type) fm.type = "contact";

      if (!fm.created) fm.created = today;
      fm.updated = today;

      /* Bild und Ausschnitt werden im eigenen Dialog gepflegt */

      /* Beziehungen zusammenführen: nichts verlieren, was im Dialog nicht zu sehen war */
      for (const rt of (this.plugin.settings.relTypes || DEFAULT_REL_TYPES)) {
        const field = rt.field;
        const removed = this.removed[field] || new Set();
        const current = asList(fm[field]).map((v) => String(v).replace(/^\[\[|\]\]$/g, "").split("|")[0].trim());
        const keep = current.filter((n) => !removed.has(n));
        for (const n of (this.relations[field] || [])) {
          if (n && !keep.includes(n)) keep.push(n);
        }
        const list = keep.filter(Boolean).map((n) => `[[${n}]]`);
        if (list.length) fm[field] = list; else delete fm[field];
      }
    });
    new Notice(`Gespeichert: ${this.name}`);
    this.close();
    this.plugin.refreshAll();
  }

  onClose() {
    this.contentEl.empty();
  }
}



/* ------------------------------------------------------------------ */

class NameConflictModal extends Modal {
  constructor(app, plugin, fullName, existing, suggest, onDone) {
    super(app);
    this.plugin = plugin;
    this.fullName = fullName;
    this.existing = existing || [];
    this.suggest = suggest || "";
    this.onDone = onDone;
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: tr("ui.nameConflictTitle") });
    el.createEl("div", { cls: "cg-callout", text: tr("ui.nameConflictHint", { name: this.fullName }) });

    const list = el.createDiv({ cls: "cg-plan" });
    for (const n of this.existing) list.createEl("div", { cls: "cg-plan-row cg-plan-item", text: n });

    const row = el.createDiv({ cls: "cg-form-row" });
    row.createEl("label", { cls: "cg-form-label", text: tr("ui.nameSuffix") });
    const input = row.createEl("input", { type: "text", cls: "cg-form-input" });
    input.placeholder = tr("ui.nameSuffixHint");
    input.value = this.suggest;

    const preview = el.createDiv({ cls: "cg-plan-item" });
    const paint = () => {
      const suffix = (input.value || "").trim();
      preview.setText(`${this.fullName}${suffix ? ` (${suffix})` : ""}.md`);
    };
    input.oninput = paint;
    paint();

    const bar = el.createDiv({ cls: "cg-bar" });
    const ok = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr("ui.createSeparate") });
    const cancel = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();
    ok.onclick = async () => {
      const suffix = (input.value || "").trim();
      if (!suffix) {
        const target = this.existing[0];
        this.close();
        if (this.onDone) this.onDone({ action: "existing", name: target });
        return;
      }
      const newName = `${this.fullName} (${suffix})`;
      this.close();
      if (this.onDone) this.onDone({ action: "create", name: newName });
    };
  }
}

class BulkModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.selected = new Set();
    this.values = { relation: "", circle: "" };
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: tr("ui.bulkTitleShort") });

    const notes = this.plugin.contacts();
    this.rows = Object.keys(notes).sort().map((name) => ({
      name,
      verhaeltnis: clean((notes[name].fm || {}).relation || ""),
      kreis: clean((notes[name].fm || {}).circle || ""),
    }));

    const bar = el.createDiv({ cls: "cg-bar" });
    const search = bar.createEl("input", { type: "text", cls: "cg-form-input" });
    search.placeholder = tr("ui.filter");
    const allBtn = bar.createEl("button", { text: tr("ui.selectAll"), cls: "cg-btn" });

    const list = el.createDiv({ cls: "cg-plan" });
    const paint = (filter) => {
      list.empty();
      const f = (filter || "").toLowerCase();
      for (const row of this.rows) {
        if (f && !row.name.toLowerCase().includes(f)) continue;
        const line = list.createDiv({ cls: "cg-plan-row" });
        const cb = line.createEl("input", { type: "checkbox" });
        cb.checked = this.selected.has(row.name);
        cb.onchange = () => {
          if (cb.checked) this.selected.add(row.name);
          else this.selected.delete(row.name);
        };
        const txt = line.createDiv({ cls: "cg-plan-text" });
        txt.createEl("strong", { text: row.name });
        if (row.verhaeltnis || row.kreis) {
          const rel = row.verhaeltnis ? this.labelOf(row.verhaeltnis) : "";
          const cir = row.kreis ? this.circleLabel(row.kreis) : "";
          txt.createEl("div", {
            cls: "cg-plan-item",
            text: [rel && `${tr("field.relation")}: ${rel}`, cir && `${tr("field.circle")}: ${cir}`]
              .filter(Boolean).join(" · "),
          });
        }
      }
    };
    search.oninput = () => paint(search.value);
    allBtn.onclick = () => {
      const visible = this.rows.filter((r) => !search.value || r.name.toLowerCase().includes(search.value.toLowerCase()));
      const allOn = visible.every((r) => this.selected.has(r.name));
      for (const r of visible) {
        if (allOn) this.selected.delete(r.name);
        else this.selected.add(r.name);
      }
      paint(search.value);
    };
    paint("");

    const form = el.createDiv({ cls: "cg-form" });
    this.values = { relation: "", circle: "" };

    const selectRow = (label, key, options) => {
      const r = form.createDiv({ cls: "cg-form-row" });
      r.createEl("label", { text: label, cls: "cg-form-label" });
      const sel = r.createEl("select", { cls: "cg-form-input dropdown" });
      sel.createEl("option", { value: "", text: tr("ui.keepUnchanged") });
      for (const opt of options) sel.createEl("option", { value: opt.value, text: opt.text });
      sel.onchange = () => { this.values[key] = sel.value; };
      return sel;
    };

    selectRow(tr("field.relation"), "relation",
      DEFAULT_REL_TYPES.map((rt) => ({ value: rt.key, text: this.labelOf(rt.key) })));
    selectRow(tr("field.circle"), "circle",
      SECTORS.map((sec) => ({ value: sec.id, text: sec.label() })));

    const foot = el.createDiv({ cls: "cg-bar" });
    const ok = foot.createEl("button", { text: tr("ui.apply"), cls: "cg-btn on" });
    ok.onclick = async () => {
      const names = [...this.selected];
      if (!names.length) { new Notice(tr("ui.noContacts")); return; }
      if (!this.values.relation && !this.values.circle) { new Notice(tr("ui.needRelation")); return; }
      ok.setText("…");
      let changed = 0;
      for (const name of names) {
        const file = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.folder}/${name}.md`);
        if (!file) continue;
        await this.app.fileManager.processFrontMatter(file, (fm) => {
          if (this.values.relation) fm.relation = this.values.relation;
          if (this.values.circle) fm.circle = this.values.circle;
          fm.updated = new Date().toISOString().slice(0, 10);
        });
        changed++;
      }
      this.plugin.graph.invalidate();
      this.close();
      new Notice(tr("ui.bulkDone", { count: changed }));
      this.plugin.refreshAll();
    };
    const cancel = foot.createEl("button", { text: tr("ui.cancel"), cls: "cg-btn" });
    cancel.onclick = () => this.close();
  }

  /* Anzeigename eines Beziehungsschlüssels */
  labelOf(value) {
    const rt = DEFAULT_REL_TYPES.find((r) => r.key === value)
      || DEFAULT_REL_TYPES.find((r) => r.field === value)
      || DEFAULT_REL_TYPES.find((r) => [r.n, r.m, r.w].some((f) => f && f.toLowerCase() === String(value).toLowerCase()))
      || DEFAULT_REL_TYPES.find((r) => (r.aliases || []).some((a) => String(a).toLowerCase() === String(value).toLowerCase()));
    if (!rt) return String(value);
    return tr(`relations.${rt.key}.n`) || String(value);
  }

  circleLabel(value) {
    const sec = SECTORS.find((s) => s.id === value)
      || SECTORS.find((s) => s.label().toLowerCase() === String(value).toLowerCase());
    return sec ? sec.label() : String(value);
  }

  onClose() { this.contentEl.empty(); }
}


/* ------------------------------------------------------------------ */

class SectionEditModal extends Modal {
  constructor(app, plugin, name, title, text, after) {
    super(app);
    this.plugin = plugin;
    this.name = name;
    this.heading = title;
    this.text = text || "";
    this.after = after;
    this.editing = false;
  }

  /* Anzeigename aus der Abschnitts-Kennung, sonst die Überschrift */
  label() {
    const known = DEFAULT_SECTIONS.find((d) => d.heading === this.heading || d.id === this.heading);
    if (known) return sectionLabel(known);
    return String(this.heading || "").replace(/^cg-/, "");
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact", "cg-section-modal");
    const head = el.createDiv({ cls: "cg-sec-head" });
    head.createEl("h3", { text: this.label() });

    const tools = head.createDiv({ cls: "cg-sec-tools" });
    const previewBtn = textIconButton(tools, "eye", tr("ui.preview"), null, "cg-btn-small");
    const maxBtn = iconButton(tools, "maximize-2", tr("ui.maximize"), null, "cg-icon-sm");

    const ta = el.createEl("textarea", { cls: "cg-section-edit" });
    ta.value = this.text;
    ta.spellcheck = false;
    ta.placeholder = tr("ui.sectionPlaceholder");

    const preview = el.createDiv({ cls: "cg-sec-preview" });
    preview.hide ? preview.hide() : (preview.style.display = "none");

    const togglePreview = async () => {
      const on = preview.style.display === "none";
      if (on) {
        preview.empty();
        await MarkdownRenderer.renderMarkdown(ta.value || "", preview, "", this.plugin);
        preview.style.display = "";
        ta.style.display = "none";
        previewBtn.addClass("on");
      } else {
        preview.style.display = "none";
        ta.style.display = "";
        previewBtn.removeClass("on");
      }
    };
    previewBtn.onclick = togglePreview;

    /* Maximieren */
    const toggleMax = () => {
      const on = this.modalEl.classList.toggle("cg-maximized");
      setButtonIcon(maxBtn, on ? "minimize-2" : "maximize-2");
      maxBtn.setAttribute("title", on ? tr("ui.restore") : tr("ui.maximize"));
    };
    maxBtn.onclick = toggleMax;

    const bar = el.createDiv({ cls: "cg-bar cg-sec-bar" });
    const ok = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr("ui.save") });
    const cancel = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();

    const save = async () => {
      if (this.editing) return;
      this.editing = true;
      ok.setText("…");
      await this.plugin.writeSection(this.name, this.heading, ta.value);
      new Notice(tr("section.saved", { title: this.label() }));
      this.close();
      if (this.after) this.after();
      this.plugin.refreshAll();
    };
    ok.onclick = save;

    /* Strg/Cmd+Enter speichert, Esc schließt */
    el.onkeydown = (ev) => {
      if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") { ev.preventDefault(); save(); }
      if (ev.key === "Escape") { ev.preventDefault(); this.close(); }
    };

    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
  }

  onClose() { this.contentEl.empty(); }
}

/* ------------------------------------------------------------------ */

class GraphConfigModal extends Modal {
  constructor(app, plugin, name, title, text, after) {
    super(app);
    this.plugin = plugin;
    this.name = name;
    this.title = title;
    this.text = text || "";
    this.after = after;
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: tr("graph.configTitle", { name: this.title }) });

    const cfg = this.plugin.parseBlockConfig(this.text);
    this.cfg = {
      depth: cfg.depth || 2,
      mode: cfg.mode || "relation",
      sel: cfg.sel || [],
      photos: cfg.photos === true,
      height: cfg.height || 0,
    };

    const form = el.createDiv({ cls: "cg-form" });

    const row = (label) => {
      const r = form.createDiv({ cls: "cg-form-row" });
      r.createEl("label", { text: label, cls: "cg-form-label" });
      return r;
    };

    const depthRow = row("Tiefe");
    const depthSel = depthRow.createEl("select", { cls: "cg-form-input" });
    for (const [v, t2] of [["1", "nur direkt"], ["2", "bis 2. Grad"], ["3", "bis 3. Grad"]]) {
      depthSel.createEl("option", { text: t2, value: v });
    }
    depthSel.value = String(this.cfg.depth);
    depthSel.onchange = () => { this.cfg.depth = parseInt(depthSel.value, 10); };

    const modeRow = row(tr("ui.coloring"));
    const modeSel = modeRow.createEl("select", { cls: "cg-form-input" });
    modeSel.createEl("option", { text: "Beziehungsart", value: "relation" });
    const fields = String(this.plugin.settings.attrFields || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (!fields.includes("circle")) fields.unshift("circle");
    for (const f of fields) modeSel.createEl("option", { text: f, value: f });
    modeSel.value = this.cfg.mode;
    modeSel.onchange = () => { this.cfg.mode = modeSel.value; paintValues(); };

    const photosRow = row("Profilbilder");
    const photosCb = photosRow.createEl("input", { type: "checkbox" });
    photosCb.checked = this.cfg.photos;
    photosCb.onchange = () => { this.cfg.photos = photosCb.checked; };

    const heightRow = row(tr("ui.heightPx"));
    const heightInput = heightRow.createEl("input", { type: "text", cls: "cg-form-input" });
    heightInput.placeholder = "leer = automatisch";
    heightInput.value = this.cfg.height ? String(this.cfg.height) : "";
    heightInput.oninput = () => { this.cfg.height = parseInt(heightInput.value, 10) || 0; };

    const valuesRow = form.createDiv({ cls: "cg-rel" });
    valuesRow.createEl("div", { text: "Filter (nur diese Werte zeigen)", cls: "cg-form-label" });
    const valuesBox = valuesRow.createDiv({ cls: "cg-chips-box" });

    const paintValues = () => {
      valuesBox.empty();
      if (this.cfg.mode === "relation") {
        valuesBox.createEl("span", { cls: "cg-chip-empty", text: "Bei Beziehungsart kein Filter." });
        return;
      }
      const notes = this.plugin.contacts();
      const counts = new Map();
      for (const n of Object.keys(notes)) {
        for (const v of this.plugin.attrValues(n, notes, this.cfg.mode)) counts.set(v, (counts.get(v) || 0) + 1);
      }
      if (!counts.size) { valuesBox.createEl("span", { cls: "cg-chip-empty", text: "Keine Werte vorhanden." }); return; }
      for (const [v, c] of [...counts.entries()].sort((a, b) => b[1] - a[1])) {
        const on = this.cfg.sel.includes(v);
        const chip = valuesBox.createEl("span", { cls: "cg-chip cg-chip-link" + (on ? " cg-chip-on" : ""), text: `${v} (${c})` });
        chip.onclick = () => {
          if (this.cfg.sel.includes(v)) this.cfg.sel = this.cfg.sel.filter((x) => x !== v);
          else this.cfg.sel.push(v);
          paintValues();
        };
      }
    };
    paintValues();

    const bar = el.createDiv({ cls: "cg-bar" });
    const ok = bar.createEl("button", { cls: "cg-btn on", text: tr("ui.save") });
    ok.onclick = async () => {
      const lines = [
        `depth: ${this.cfg.depth}`,
        `mode: ${this.cfg.mode}`,
        `sel: ${this.cfg.sel.join(", ")}`,
        `photos: ${this.cfg.photos}`,
      ];
      if (this.cfg.height) lines.push(`height: ${this.cfg.height}`);
      await this.plugin.writeSection(this.name, this.title, "```yaml\n" + lines.join("\n") + "\n```");
      this.close();
      new Notice(tr("ui.graphConfigSaved"));
      if (this.after) this.after();
      this.plugin.refreshAll();
    };
    const cancel = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();
  }

  onClose() { this.contentEl.empty(); }
}


/* ------------------------------------------------------------------ */

class RelationPickerModal extends Modal {
  constructor(app, plugin, source, presetField, after) {
    super(app);
    this.plugin = plugin;
    this.source = source;
    this.presetField = presetField;
    this.after = after;
    this.chosen = new Set();
  }

  onOpen() {
    const el = this.contentEl;
    el.addClass("cg-contact");
    el.createEl("h3", { text: tr("ui.addRelations", { source: this.source }) });

    const types = this.plugin.settings.relTypes || DEFAULT_REL_TYPES;
    const typeRow = el.createDiv({ cls: "cg-form-row" });
    typeRow.createEl("label", { text: tr("field.type"), cls: "cg-form-label" });
    const sel = typeRow.createEl("select", { cls: "cg-form-input" });
    for (const rt of types) {
      sel.createEl("option", { text: `${groupLabel(rt.group)} · ${this.plugin.relLabel(rt.field, "")}`, value: rt.field });
    }
    if (this.presetField) {
      sel.value = this.presetField;
      sel.disabled = true;
      sel.addClass("cg-locked");
    }

    const searchRow = el.createDiv({ cls: "cg-form-row" });
    searchRow.createEl("label", { text: "Person", cls: "cg-form-label" });
    const search = searchRow.createEl("input", { type: "text", cls: "cg-form-input" });
    search.placeholder = "Namen suchen oder neuen Namen tippen …";

    const list = el.createDiv({ cls: "cg-plan cg-pick-list" });
    const contacts = this.plugin.contacts();

    /* Schalter: neue Kontakte anlegen oder nur verknüpfen */
    this.createNew = false;
    const modeRow = el.createDiv({ cls: "cg-form-row cg-switch-row" });
    const modeLabel = modeRow.createEl("label", { cls: "cg-form-label", text: tr("ui.createNewContact") });
    const modeBox = modeRow.createEl("input", { attr: { type: "checkbox" }, cls: "cg-switch" });
    modeBox.checked = false;
    const modeHint = modeRow.createEl("div", { cls: "cg-plan-item", text: tr("ui.createNewHint") });
    modeBox.onchange = () => {
      this.createNew = !!modeBox.checked;
      modeHint.setText(this.createNew ? tr("ui.createNewOn") : tr("ui.createNewHint"));
      modeLabel.classList.toggle("cg-on", this.createNew);
      paint();
    };

    const bar = el.createDiv({ cls: "cg-bar" });
    const applyBtn = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: "Hinzufügen" });
    const cancel = bar.createEl("button", { cls: "cg-btn", text: tr("ui.cancel") });
    cancel.onclick = () => this.close();

    const applyAll = async () => {
      const field = sel.value;
      const rt = this.plugin.relType(field);
      const typed = (search.value || "").trim();
      const names = [...this.chosen];
      if (typed && !names.includes(typed)) names.push(typed);
      if (!names.length) { new Notice(tr("ui.nothingSelected")); return; }

      applyBtn.setText("…");
      let created = 0;
      let linked = 0;
      for (const n of names) {
        let target = n;
        const exists = !!this.plugin.contacts()[n];
        if (!exists && this.createNew) {
          const clashes = this.plugin.store.findByName(n).filter((x) => x !== n);
          if (clashes.length) {
            target = await new Promise((resolve) => {
              new NameConflictModal(this.app, this.plugin, n, clashes, "", (res) => {
                resolve(res.action === "create" ? res.name : "");
              }).open();
            });
            if (!target) target = clashes[0];
          }
          if (!this.plugin.contacts()[target]) {
            await this.plugin.createContactFromName(target);
            if (this.plugin.contacts()[target]) created++;
          }
        }
        const ok = await this.plugin.addRelation(this.source, field, target);
        if (ok) linked++;
      }
      const what = rt ? (rt.pl || rt.n) : field;
      new Notice(tr("ui.relationsAdded", { what, count: linked, created }));
      this.close();
      if (this.after) this.after();
      this.plugin.refreshAll();
    };

    applyBtn.onclick = applyAll;

    const updateBar = () => {
      applyBtn.setText(this.chosen.size ? `Hinzufügen (${this.chosen.size})` : "Hinzufügen");
    };

    const paint = () => {
      list.empty();
      const typed = (search.value || "").trim();
      const q2 = typed.toLowerCase();
      const names = Object.keys(contacts)
        .filter((n) => n !== this.source && n.toLowerCase().includes(q2))
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 80);

      if (typed && !contacts[typed] && !this.chosen.has(typed)) {
        const row = list.createDiv({ cls: "cg-plan-row cg-pick-row" });
        const box = row.createDiv({ cls: "cg-plan-text" });
        box.createEl("strong", { text: `„${typed}" ist noch kein Kontakt` });
        box.createEl("div", { cls: "cg-plan-item",
          text: this.createNew ? tr("ui.willCreate") : tr("ui.willLinkOnly") });
        const pick = row.createEl("input", { attr: { type: "checkbox" } });
        pick.checked = this.chosen.has(typed);
        pick.onclick = (ev) => ev.stopPropagation();
        const toggleTyped = () => {
          if (this.chosen.has(typed)) this.chosen.delete(typed);
          else this.chosen.add(typed);
          pick.checked = this.chosen.has(typed);
          row.classList.toggle("cg-picked", this.chosen.has(typed));
          updateBar();
        };
        row.onclick = toggleTyped;
        pick.onchange = toggleTyped;
      }

      if (!names.length) {
        if (!typed || contacts[typed]) list.createEl("div", { cls: "cg-chip-empty", text: "Keine Treffer." });
        updateBar();
        return;
      }

      for (const n of names) {
        const row = list.createDiv({ cls: "cg-plan-row cg-pick-row" + (this.chosen.has(n) ? " cg-picked" : "") });
        const cb = row.createEl("input", { attr: { type: "checkbox" } });
        cb.checked = this.chosen.has(n);
        cb.onclick = (ev) => ev.stopPropagation();
        const label = row.createDiv({ cls: "cg-plan-text" });
        label.createEl("strong", { text: n });
        const ofm = contacts[n].fm || {};
        const meta = [ofm.circle, ofm.relation].filter(Boolean).join(" · ");
        if (meta) label.createEl("div", { cls: "cg-plan-item", text: String(meta) });
        const toggle = () => {
          if (this.chosen.has(n)) this.chosen.delete(n); else this.chosen.add(n);
          cb.checked = this.chosen.has(n);
          row.classList.toggle("cg-picked", this.chosen.has(n));
          updateBar();
        };
        row.onclick = toggle;
        cb.onchange = toggle;
      }
      updateBar();
    };

    sel.onchange = () => { paint(); };
    search.oninput = paint;
    paint();
    search.focus();
  }
}

/* Nur für Tests: interne Helfer ohne Obsidian-Abhängigkeit */

module.exports = { NameConflictModal, ConfirmModal, JournalEntryModal, GiftModal, ImageModal, PresetModal, CompletionModal, ContactModal, BulkModal, SectionEditModal, GraphConfigModal, RelationPickerModal };
