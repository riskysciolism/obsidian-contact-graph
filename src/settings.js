const { t: tr } = require("./i18n");
const { Notice, PluginSettingTab, Setting } = require("obsidian");

class ContactGraphSettings extends PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  display() {
    this.plugin.normalizeSections();
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Contact Graph" });

    new Setting(containerEl)
      .setName(tr("settings.selfNote.name"))
      .setDesc(tr("settings.selfNote.desc"))
      .addText((t) => t.setValue(this.plugin.settings.selfNote)
        .onChange(async (v) => { this.plugin.settings.selfNote = v.trim(); await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }));

    new Setting(containerEl)
      .setName(tr("settings.folder.name"))
      .setDesc(tr("settings.folder.desc"))
      .addText((t) => t.setValue(this.plugin.settings.folder)
        .onChange(async (v) => { this.plugin.settings.folder = v.trim(); await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }));

    new Setting(containerEl)
      .setName(tr("settings.depth.name"))
      .setDesc(tr("settings.depth.desc"))
      .addDropdown((d) => {
        d.addOption("1", "nur direkt").addOption("2", "bis 2. Grad").addOption("3", "bis 3. Grad");
        d.setValue(String(this.plugin.settings.defaultDepth));
        d.onChange(async (v) => { this.plugin.settings.defaultDepth = +v; await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); });
      });

    new Setting(containerEl)
      .setName(tr("settings.exclude.name"))
      .setDesc(tr("settings.exclude.desc"))
      .addText((t) => t.setValue(this.plugin.settings.exclude)
        .onChange(async (v) => { this.plugin.settings.exclude = v; await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }));

    containerEl.createEl("h3", { text: "Abschnitte der Kontaktkarte" });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: tr("ui.sectionsDesc")
        + 'Der Knopf „＋ Abschnitt“ auf der Karte legt fehlende Abschnitte in der Notiz an.',
    });

    if (!Array.isArray(this.plugin.settings.sections)) this.plugin.settings.sections = [];
    this.plugin.settings.sections.forEach((sec, idx) => {
      const row = new Setting(containerEl)
        .setName(`${idx + 1}. ${sec.title}`)
        .addText((txt) => txt.setValue(sec.title)
          .onChange(async (v) => {
            sec.title = v.trim() || sec.title;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            this.display();
          }))
        .addDropdown((d) => {
          d.addOption("text", "Text").addOption("journal", "Verlauf (Liste)")
            .addOption("address", "Adresse (Karte)").addOption("graph", "Graph (konfigurierbar)");
          d.setValue(sec.type || "text");
          d.onChange(async (v) => {
            sec.type = v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            this.display();
          });
        })
        .addText((txt) => {
          txt.setPlaceholder("Filter, z. B. Besprechung").setValue(sec.filter || "");
          txt.onChange(async (v) => {
            sec.filter = v.trim();
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          });
        });

      row.addExtraButton((b) => b.setIcon("arrow-up").setTooltip(tr("ui.up")).onClick(async () => {
        if (idx === 0) return;
        const arr = this.plugin.settings.sections;
        [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refresh();
        this.display();
      }));
      row.addExtraButton((b) => b.setIcon("arrow-down").setTooltip(tr("ui.down")).onClick(async () => {
        const arr = this.plugin.settings.sections;
        if (idx >= arr.length - 1) return;
        [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refresh();
        this.display();
      }));
      row.addExtraButton((b) => b.setIcon("trash").setTooltip(tr("ui.remove")).onClick(async () => {
        this.plugin.settings.sections.splice(idx, 1);
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refresh();
        this.display();
      }));
    });

    new Setting(containerEl)
      .setName(tr("settings.sections.add"))
      .setDesc(tr("settings.sections.addDesc"))
      .addText((txt) => {
        txt.setPlaceholder("z. B. Besprechungen");
        this.newSectionInput = txt;
      })
      .addDropdown((d) => {
        d.addOption("text", "Text").addOption("journal", "Verlauf").addOption("address", "Adresse").addOption("graph", "Graph");
        d.setValue("text");
        d.onChange((v) => { this.newSectionType = v; });
      })
      .addButton((b) => b.setButtonText(tr("ui.add")).onClick(async () => {
        const title = (this.newSectionInput && this.newSectionInput.getValue() || "").trim();
        if (!title) return;
        if (this.plugin.settings.sections.some((s) => s.title === title)) { new Notice(tr("ui.exists")); return; }
        this.plugin.settings.sections.push({ title, type: this.newSectionType || "text", filter: "" });
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refresh();
        this.display();
      }));

    containerEl.createEl("h3", { text: "Kreise (Filter)" });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Kreise sind die Chips über dem Diagramm: Familie, Arbeit, Freunde. "
        + "Sie filtern den ganzen Graphen; ohne Auswahl wird alles gezeigt.",
    });

    new Setting(containerEl)
      .setName(tr("settings.kreisField.name"))
      .setDesc(tr("settings.kreisField.desc"))
      .addText((txt) => txt.setValue(this.plugin.settings.kreisField)
        .onChange(async (v) => {
          this.plugin.settings.kreisField = v.trim() || "circle";
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName(tr("settings.kreisFallback.name"))
      .setDesc("Ohne Eintrag: Familie bei verwandtschaftlicher Verknüpfung, Arbeit bei "
        + tr("ui.kreisFallbackDesc"))
      .addToggle((tg) => tg.setValue(this.plugin.settings.kreisFallback !== false)
        .onChange(async (v) => {
          this.plugin.settings.kreisFallback = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    containerEl.createEl("h3", { text: "Merkmale" });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Frontmatter-Felder, nach denen du gruppieren und filtern kannst. Komma-getrennt.",
    });

    new Setting(containerEl)
      .setName(tr("settings.fields.name"))
      .setDesc(tr("settings.fields.desc"))
      .addText((t) => t.setValue(this.plugin.settings.attrFields)
        .onChange(async (v) => {
          this.plugin.settings.attrFields = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName(tr("settings.blobOpacity.name"))
      .setDesc(tr("settings.blobOpacity.desc"))
      .addSlider((sl) => sl.setLimits(0.05, 0.4, 0.01)
        .setValue(Number(this.plugin.settings.blobOpacity))
        .setDynamicTooltip()
        .onChange(async (v) => {
          this.plugin.settings.blobOpacity = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName(tr("settings.blobPad.name"))
      .setDesc(tr("settings.blobPad.desc"))
      .addSlider((sl) => sl.setLimits(20, 90, 2)
        .setValue(Number(this.plugin.settings.blobPad))
        .setDynamicTooltip()
        .onChange(async (v) => {
          this.plugin.settings.blobPad = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName(tr("settings.exportFolder.name"))
      .setDesc(tr("settings.exportFolder.desc"))
      .addText((t) => t.setValue(this.plugin.settings.exportFolder)
        .onChange(async (v) => {
          this.plugin.settings.exportFolder = v.trim();
          await this.plugin.saveData(this.plugin.settings);
        }));

    containerEl.createEl("h3", { text: "Presets" });
    const presets = this.plugin.settings.presets || [];
    if (!presets.length) {
      containerEl.createEl("p", { cls: "setting-item-description", text: "Noch keine Presets gespeichert." });
    }
    for (const preset of presets) {
      new Setting(containerEl)
        .setName(preset.name)
        .setDesc(`${preset.center} · Tiefe ${preset.depth} · ${preset.mode}`)
        .addButton((b) => b.setButtonText(tr("ui.delete")).setWarning().onClick(async () => {
          this.plugin.settings.presets = presets.filter((x) => x.name !== preset.name);
          await this.plugin.saveData(this.plugin.settings);
          this.display();
        }));
    }

    containerEl.createEl("h3", { text: "Farben" });
    new Setting(containerEl)
      .setName(tr("settings.themeColors.name"))
      .setDesc("Farben aus dem aktiven Obsidian-Theme statt fester Werte. Wirkt für Kanten, Blobs, "
        + "Zentrum und Platzhalter — hell wie dunkel.")
      .addToggle((tg) => tg.setValue(this.plugin.settings.themeColors !== false)
        .onChange(async (v) => {
          this.plugin.settings.themeColors = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
          this.display();
        }));

    containerEl.createEl("h3", { text: "Graph" });
    new Setting(containerEl)
      .setName(tr("settings.familyOnly.name"))
      .setDesc("An: Freunde und Kollegen sind Endstation, über sie hinaus wird nicht gesucht. "
        + "Aus: auch deren Umfeld wird einbezogen.")
      .addToggle((tg) => tg.setValue(this.plugin.settings.expandFamily !== false)
        .onChange(async (v) => {
          this.plugin.settings.expandFamily = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    containerEl.createEl("h3", { text: "Beziehungsarten" });
    if (this.plugin.settings.themeColors !== false) {
      containerEl.createEl("p", {
        cls: "setting-item-description",
        text: "Eigene Farben sind ausgeblendet, solange die Themenfarben aktiv sind.",
      });
    }
    containerEl.createEl("p", { cls: "setting-item-description", text: "Farbe, Beschriftung und Linienstil je Feld." });

    const themed = this.plugin.settings.themeColors !== false;
    for (const [key, t] of Object.entries(this.plugin.settings.types)) {
      const s = new Setting(containerEl)
        .setName(key)
        .addText((txt) => txt.setPlaceholder("Bezeichnung").setValue(t.label)
          .onChange(async (v) => { t.label = v; await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }));
      if (!themed) {
        s.addColorPicker((c) => c.setValue(t.color)
          .onChange(async (v) => { t.color = v; await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }));
      }
      s
        .addToggle((tg) => tg.setValue(t.enabled !== false).setTooltip(tr("ui.visible"))
          .onChange(async (v) => { t.enabled = v; await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }))
        .addToggle((tg) => tg.setValue(!!t.dashed).setTooltip(tr("ui.dashed"))
          .onChange(async (v) => { t.dashed = v; await this.plugin.saveData(this.plugin.settings); this.plugin.refresh(); }));
    }
  }
}

/* ------------------------------------------------------------------ */

module.exports = { ContactGraphSettings };
