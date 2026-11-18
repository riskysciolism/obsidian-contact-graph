/*
 * Testumgebung: bildet die Obsidian-API so weit nach, wie das Plugin sie nutzt.
 * Der Vault ist ein Verzeichnis mit Markdown-Dateien; alles bleibt im Speicher.
 */
const fs = require("fs");
const path = require("path");
const Module = require("module");
const { JSDOM } = require("jsdom");
const YAML = require("yaml");

const FIXTURE_DIR = path.join(__dirname, "..", "fixtures", "vault");
const CONTACT_FOLDER = "20_Areas/24_Contacts";

/* ---------- DOM ---------- */
function setupDom() {
  const dom = new JSDOM("<!doctype html><body></body>");
  global.document = dom.window.document;
  global.window = dom.window;
  global.HTMLElement = dom.window.HTMLElement;
  global.Element = dom.window.Element;

  const E = dom.window.Element.prototype;
  if (!E.createEl) {
    E.createEl = function (tag, opts = {}) {
      const el = document.createElement(tag);
      if (opts.cls) el.className = opts.cls;
      if (opts.text !== undefined) el.textContent = opts.text;
      if (opts.type) el.setAttribute("type", opts.type);
      if (opts.value !== undefined) { try { el.value = opts.value; } catch (e) { el.setAttribute("value", opts.value); } }
      if (opts.attr) for (const [k, v] of Object.entries(opts.attr)) el.setAttribute(k, v);
      this.appendChild(el);
      return el;
    };
    E.createDiv = function (opts = {}) { return this.createEl("div", opts); };
    E.createSpan = function (opts = {}) { return this.createEl("span", opts); };
    E.empty = function () { while (this.firstChild) this.removeChild(this.firstChild); };
    E.addClass = function (c) { this.classList.add(c); };
    E.removeClass = function (c) { this.classList.remove(c); };
    E.setText = function (t) { this.textContent = t; };
  }
  return dom;
}

/* ---------- Frontmatter ---------- */
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  try {
    return YAML.parse(m[1]) || {};
  } catch (e) {
    return {};
  }
}

function serializeFrontmatter(fm) {
  return "---\n" + YAML.stringify(fm).trimEnd() + "\n---";
}

/* ---------- Vault ---------- */
function loadVaultFiles(dir = FIXTURE_DIR) {
  const out = new Map();
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name.endsWith(".md")) {
        const rel = path.relative(FIXTURE_DIR, p).split(path.sep).join("/");
        out.set(rel, fs.readFileSync(p, "utf8"));
      }
    }
  };
  walk(dir);
  return out;
}

function makeVault(initial) {
  const files = new Map(initial || loadVaultFiles());
  const fileObj = (p) => ({
    path: p,
    basename: path.basename(p, ".md"),
    extension: "md",
    name: path.basename(p),
  });

  const vault = {
    files,
    getMarkdownFiles: () => [...files.keys()].filter((p) => p.endsWith(".md")).map(fileObj),
    getFiles: () => [...files.keys()].map(fileObj),
    getAbstractFileByPath: (p) => (files.has(p) ? fileObj(p) : null),
    read: async (f) => files.get(f.path) || "",
    cachedRead: async (f) => files.get(f.path) || "",
    create: async (p, content) => { files.set(p, content); return fileObj(p); },
    modify: async (f, content) => { files.set(f.path, content); },
    process: async (f, fn) => { files.set(f.path, fn(files.get(f.path) || "")); },
    createBinary: async (p, buf) => { files.set(p, Buffer.from(buf)); return fileObj(p); },
    modifyBinary: async (f, buf) => { files.set(f.path, Buffer.from(buf)); },
    createFolder: async () => {},
    adapter: {
      exists: async (p) => files.has(p),
      getResourcePath: (p) => `app://local/${p}`,
      readBinary: async (p) => files.get(p),
    },
  };
  return vault;
}

function makeApp(vault) {
  return {
    vault,
    metadataCache: {
      on: () => ({}),
      off: () => ({}),
      getFileCache: (f) => {
        const raw = vault.files.get(f.path);
        return { frontmatter: typeof raw === "string" ? parseFrontmatter(raw) : {} };
      },
      getFirstLinkpathDest: (link, source) => {
        const wanted = String(link || "");
        const direct = `${CONTACT_FOLDER}/${wanted}.md`;
        if (vault.files.has(direct)) return { path: direct };
        for (const path of vault.files.keys()) {
          if (path.endsWith(`/${wanted}`)) return { path };
        }
        return null;
      },
    },
    fileManager: {
      processFrontMatter: async (f, fn) => {
        const text = vault.files.get(f.path) || "";
        const fm = parseFrontmatter(text);
        fn(fm);
        const body = text.replace(/^---\n[\s\S]*?\n---/, "").replace(/^\n*/, "");
        vault.files.set(f.path, `${serializeFrontmatter(fm)}\n${body}`);
      },
    },
    workspace: {
      getLeavesOfType: () => [],
      getLeaf: () => ({ openFile: async () => {} }),
      on: () => ({}),
    },
  };
}

/* ---------- Obsidian-Modul-Attrappe ---------- */
function installObsidianMock() {
  const stubPath = path.join(__dirname, ".obsidian-mock.js");
  const dom = setupDom();
  fs.writeFileSync(stubPath, `
const { JSDOM } = require("jsdom");
class Notice { constructor(msg) { (global.__notices = global.__notices || []).push(String(msg)); } hide() {} }
class Modal {
  constructor(app) {
    this.app = app;
    this.modalEl = document.createElement("div");
    this.modalEl.className = "modal";
    this.contentEl = document.createElement("div");
    this.contentEl.className = "modal-content";
    this.modalEl.appendChild(this.contentEl);
    document.body.appendChild(this.modalEl);
  }
  open() { if (this.onOpen) this.onOpen(); return this; }
  close() { if (this.onClose) this.onClose(); this.modalEl.remove(); }
}
class ItemView {
  constructor(leaf) { this.leaf = leaf; this.app = leaf && leaf.app; this.contentEl = document.createElement("div"); }
  addAction() {}
  registerEvent() {}
}
class Plugin {
  constructor(app, manifest) { this.app = app; this.manifest = manifest || {}; this._data = {}; }
  async loadData() { return this._data; }
  async saveData(d) { this._data = d; }
  addCommand() {} addRibbonIcon() {} registerView() {} registerObsidianProtocolHandler() {}
  registerMarkdownCodeBlockProcessor() {} registerMarkdownPostProcessor() {} registerEditorExtension() {}
  registerEvent() {} addSettingTab() {}
}
class PluginSettingTab { constructor(app, plugin) { this.app = app; this.plugin = plugin; this.containerEl = document.createElement("div"); } }
class Setting {
  constructor(el) { this.el = el; this.controlEl = document.createElement("div"); }
  setName() { return this; } setDesc() { return this; } setHeading() { return this; } setClass() { return this; }
  addText() { return this; } addToggle() { return this; } addDropdown() { return this; }
  addButton() { return this; } addExtraButton() { return this; } addSlider() { return this; }
}
class Menu { addItem(fn) { const item = { setTitle(){return item;}, setIcon(){return item;}, onClick(){return item;} }; fn(item); } showAtMouseEvent() {} }
class TFile {}
function setIcon(el, name) {
  el.dataset.icon = name;
  el.setAttribute("data-icon", name);
}

module.exports = { setIcon,
  Plugin, ItemView, PluginSettingTab, Setting, Notice, Modal, Menu, TFile,
  MarkdownRenderer: {
    renderMarkdown: async (md, el) => { el.textContent = md; },
    render: async (app, md, el) => { el.textContent = md; },
  },
};
`);
  const orig = Module._resolveFilename;
  Module._resolveFilename = function (req, ...rest) {
    return req === "obsidian" ? stubPath : orig.call(this, req, ...rest);
  };
  return dom;
}

/* ---------- Plugin laden ---------- */
function loadPlugin(overrides = {}) {
  installObsidianMock();
  const ContactGraph = require(path.join(__dirname, "..", "..", "main.js"));
  const vault = makeVault(overrides.files);
  const app = makeApp(vault);
  const plugin = new ContactGraph(app, { id: "contact-graph" });
  plugin.settings = Object.assign({
    selfNote: "Ich Selbst",
    folder: CONTACT_FOLDER,
    maxDepth: 3,
    defaultDepth: 2,
    exclude: "",
    relTypes: null,
    themeColors: true,
    attrFields: "kreis,geschlecht,verhaeltnis",
    types: {},
    sections: [
      { title: "Verknüpfungen", type: "text" },
      { title: "Details", type: "text" },
      { title: "Adresse", type: "address" },
      { title: "Interessen", type: "text" },
      { title: "Familie", type: "text" },
      { title: "Verlauf", type: "journal" },
    ],
  }, overrides.settings || {});
  return { plugin, app, vault, ContactGraph };
}

function makeView(plugin) {
  const ContactGraphView = require(path.join(__dirname, "..", "..", "main.js")).__test.ContactGraphView;
  return new ContactGraphView({ app: plugin.app }, plugin);
}

function setIcon(el, name) {
  el.dataset.icon = name;
  el.setAttribute("data-icon", name);
}

module.exports = { setIcon, loadPlugin, makeView, setupDom, parseFrontmatter, CONTACT_FOLDER, FIXTURE_DIR };
