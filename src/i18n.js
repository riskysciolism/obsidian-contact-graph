/*
 * Übersetzungen. Schlüssel sind englisch, Anzeige folgt der Obsidian-Sprache.
 * Rückfall: Englisch → Deutsch → Schlüssel.
 */
const de = require("./locales/de");
const en = require("./locales/en");

/* Schlüssel mit Punkten werden in verschachtelte Objekte aufgelöst */
function normalize(node, prefix) {
  if (node === null || typeof node !== "object") return node;
  const out = {};
  for (const [rawKey, value] of Object.entries(node)) {
    let key = rawKey;
    if (prefix && key.startsWith(prefix + ".")) key = key.slice(prefix.length + 1);
    const parts = key.split(".");
    let target = out;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (typeof target[part] !== "object" || target[part] === null) target[part] = {};
      target = target[part];
    }
    const last = parts[parts.length - 1];
    const childPrefix = [prefix, key].filter(Boolean).join(".");
    target[last] = normalize(value, childPrefix);
  }
  return out;
}

const LOCALES = {
  de: normalize(de, ""),
  en: normalize(en, ""),
};
let locale = "de";

function detectLocale() {
  let raw = "";
  try {
    if (typeof window !== "undefined" && window.localStorage) raw = window.localStorage.getItem("language") || "";
    if (!raw && typeof moment !== "undefined" && moment.locale) raw = moment.locale();
    if (!raw && typeof navigator !== "undefined") raw = navigator.language || "";
  } catch (err) {
    raw = "";
  }
  setLocale(String(raw || "de").slice(0, 2));
  return locale;
}

/* Jede Sprache darf gesetzt werden; fehlt der Katalog, greift Englisch */
function setLocale(code) {
  const want = String(code || "").toLowerCase().slice(0, 2);
  locale = LOCALES[want] ? want : "en";
  return locale;
}

function getLocale() {
  return locale;
}

function lookup(dict, key) {
  const parts = String(key).split(".");
  let cur = dict;
  for (let i = 0; i < parts.length; i++) {
    if (cur === undefined || cur === null) return undefined;
    const rest = parts.slice(i).join(".");
    if (typeof cur === "object" && Object.prototype.hasOwnProperty.call(cur, rest)) return cur[rest];
    cur = cur[parts[i]];
  }
  return typeof cur === "string" ? cur : undefined;
}

/* Reihenfolge: gewünschte Sprache → Englisch (Rückfall) → Schlüssel */
function t(key, vars) {
  const order = [locale, "en"].filter((code, i, arr) => LOCALES[code] && arr.indexOf(code) === i);
  let value;
  for (const code of order) {
    value = lookup(LOCALES[code], key);
    if (value === undefined) value = lookup(LOCALES[code], "ui." + key);
    if (value !== undefined) break;
  }
  if (typeof value !== "string") return String(key);
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (m, name) => (vars[name] === undefined ? m : String(vars[name])));
}

module.exports = { t, setLocale, getLocale, detectLocale, LOCALES };
