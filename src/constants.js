const { t } = require("./i18n");

const VIEW_TYPE = "contact-graph-view";

const DEFAULT_SETTINGS = {
  selfNote: "",   // wird in den Einstellungen gesetzt
  folder: "20_Areas/24_Contacts",
  maxDepth: 3,
  defaultDepth: 2,
  showPhotos: false,
  exclude: "conflict",
  attrFields: "circle,gender,relation,met,tags",
  blobOpacity: 0.18,
  blobPad: 46,
  presets: [],
  themeColors: true,
  expandFamily: true,
  sections: [
    { id: "links", heading: "cg-links", type: "text" },
    { id: "details", heading: "cg-details", type: "text" },
    { id: "address", heading: "cg-address", type: "address" },
    { id: "interests", heading: "cg-interests", type: "text" },
    { id: "family", heading: "cg-family", type: "text" },
    { id: "journal", heading: "cg-journal", type: "journal" },
    { id: "gifts", heading: "cg-gifts", type: "gifts" },
    { id: "gifts", heading: "Gifts", type: "gifts" },
  ],
  relTypes: null,   // null = Standardkatalog unten
  kreisField: "circle",
  kreisFallback: true,
  exportFolder: "30_Resources/34_Assets/Beziehungen",
  types: {
    partner: { label: "Partner", color: "#b5563f", dashed: false, enabled: true },
    eltern: { label: "Elternteil/Kind", color: "#4a7fb5", dashed: false, enabled: true },
    geschwister: { label: "Geschwister", color: "#7a8b4a", dashed: true, enabled: true },
    verhaeltnis: { label: "Verhältnis", color: "#8b7fb5", dashed: false, enabled: true },
  },
};

const ROLE = {
  "children": "child",
  "siblings": "sibling",
  "partner": "partner",
  "parents": "parent",
  "children,children": "grandchild",
  "parents,parents": "grandparent",
  "parents,siblings": "uncle_aunt",
  "siblings,children": "nephew_niece",
  "partner,parents": "parent_in_law",
  "partner,siblings": "sibling_in_law",
  "siblings,partner": "sibling_in_law",
  "children,partner": "child_in_law",
  "parents,siblings,children": "cousin",
  "parents,parents,siblings": "great_uncle_aunt",
  "siblings,children,children": "great_nephew_niece",
};

const ROLE_M = {
  "children": "child", "siblings": "sibling", "partner": "partner", "parents": "parent",
  "children,children": "grandchild", "parents,parents": "grandparent", "parents,siblings": "uncle_aunt",
  "siblings,children": "nephew_niece", "partner,parents": "parent_in_law",
  "partner,siblings": "sibling_in_law", "siblings,partner": "sibling_in_law",
  "children,partner": "child_in_law", "parents,siblings,children": "cousin",
  "parents,parents,siblings": "great_uncle_aunt", "siblings,children,children": "great_nephew_niece",
};

const ROLE_W = {
  "children": "child", "siblings": "sibling", "partner": "partner", "parents": "parent",
  "children,children": "grandchild", "parents,parents": "grandparent", "parents,siblings": "uncle_aunt",
  "siblings,children": "nephew_niece", "partner,parents": "parent_in_law",
  "partner,siblings": "sibling_in_law", "siblings,partner": "sibling_in_law",
  "children,partner": "child_in_law", "parents,siblings,children": "cousin",
  "parents,parents,siblings": "great_uncle_aunt", "siblings,children,children": "great_nephew_niece",
};

const SECTORS = [
  { id: "family", label: () => t("groups.family") },
  { id: "friends", label: () => t("groups.friends") },
  { id: "work", label: () => t("groups.work") },
  { id: "acquaintances", label: () => t("groups.acquaintances") },
];

const SECTOR_PRIO = { family: 0, friends: 1, work: 2, acquaintances: 3 };

const PALETTE = ["#6ea8e8", "#d98b6a", "#7fbf8a", "#c79be0", "#e0c060", "#6fc3c3", "#e08a9a", "#9aa8d0"];

/* Farben aus dem Obsidian-Theme statt fester Werte */

const THEME_PALETTE = ["var(--color-blue)", "var(--color-orange)", "var(--color-green)",
  "var(--color-purple)", "var(--color-yellow)", "var(--color-cyan)", "var(--color-pink)", "var(--color-red)"];

const THEME_GROUP_COLOR = {
  family: "var(--color-blue)",
  friends: "var(--color-green)",
  work: "var(--color-orange)",
  neighborhood: "var(--color-cyan)",
  acquaintances: "var(--color-purple)",
  other: "var(--text-faint)",
};

const THEME_KIND = {
  partner: "var(--color-red)",
  eltern: "var(--color-blue)",
  parent: "var(--color-blue)",
  geschwister: "var(--color-green)",
  verhaeltnis: "var(--color-purple)",
};

/* konvexe Hülle (Andrew-Monoton) */

const rel = (field, key, group, inverse, aliases) => {
  const entry = { field, key, group, inverse: inverse || field };
  if (aliases) entry.aliases = aliases;
  Object.defineProperties(entry, {
    n: { get() { return t(`relations.${key}.n`); }, enumerable: true },
    m: { get() { return t(`relations.${key}.m`); }, enumerable: true },
    w: { get() { return t(`relations.${key}.w`); }, enumerable: true },
    pl: { get() { return t(`relations.${key}.pl`); }, enumerable: true },
  });
  return entry;
};

const DEFAULT_REL_TYPES = [
  /* family */
  rel("partner", "partner", "family", "partner"),
  rel("partner_ex", "ex_partner", "family", "partner_ex",
    ["ex", "ex-partner", "ex-partnerin", "ehemaliger partner", "ehemalige partnerin"]),
  rel("parents", "parent", "family", "children"),
  rel("step_parents", "step_parent", "family", "step_children"),
  rel("children", "child", "family", "parents"),
  rel("step_children", "step_child", "family", "step_parents"),
  rel("siblings", "sibling", "family", "siblings"),
  rel("step_siblings", "step_sibling", "family", "step_siblings"),
  rel("relatives", "relative", "family", "relatives"),

  /* friends */
  rel("friends", "friend", "friends", "friends"),
  rel("ex_friends", "ex_friend", "friends", "ex_friends",
    ["ehemaliger freund", "ehemalige freundin", "ex-freundin"]),

  /* work */
  rel("work", "colleague", "work", "work"),
  rel("ex_colleagues", "ex_colleague", "work", "ex_colleagues",
    ["ehemaliger arbeitskollege", "ehemalige arbeitskollegin", "ehemaliger kollege", "ehemalige kollegin", "ex-arbeitskollege"]),

  /* neighbourhood */
  rel("neighbors", "neighbor", "neighborhood", "neighbors"),
  rel("ex_neighbors", "ex_neighbor", "neighborhood", "ex_neighbors",
    ["ehemaliger nachbar", "ehemalige nachbarin"]),

  /* acquaintances */
  rel("acquaintances", "acquaintance", "acquaintances", "acquaintances"),
  rel("other", "other", "other", "other"),
];

const kreisDefaultValues = () => ["Familie", "Arbeit", "Freunde", "Nachbarn", "Verein"];

const FIELD_LABEL = {
  partner: "Partner",
  eltern: "Eltern",
  kinder: "Kinder",
  geschwister: "Geschwister",
  grosseltern: "Großeltern",
};

const REL_FIELDS_UI = [
  ["partner", "Partner"],
  ["eltern", "Eltern"],
  ["kinder", "Kinder"],
  ["geschwister", "Geschwister"],
];



/* Keine Altfeld-Zuordnung mehr: es gelten ausschließlich die englischen Schlüssel */
const LEGACY_FIELDS = {};


/* Liest Frontmatter mit englischen Schlüsseln, versteht aber alte Notizen */
function normalizeFm(fm) {
  return Object.assign({}, fm || {});
}


/* Abschnitte: Kennung im Code, Überschrift in der Notiz, Anzeige übersetzt */
const DEFAULT_SECTIONS = [
  { id: "links", heading: "cg-links", type: "text", aliases: ["Links", "Verknüpfungen"] },
  { id: "details", heading: "cg-details", type: "text", aliases: ["Details"] },
  { id: "address", heading: "cg-address", type: "address", aliases: ["Address", "Adresse"] },
  { id: "interests", heading: "cg-interests", type: "text", aliases: ["Interests", "Interessen"] },
  { id: "family", heading: "cg-family", type: "text", aliases: ["Family", "Familie"] },
  { id: "journal", heading: "cg-journal", type: "journal", aliases: ["Journal", "Verlauf"] },
  { id: "gifts", heading: "cg-gifts", type: "gifts", aliases: ["Gifts", "Geschenkideen"] },
  { id: "graph", heading: "cg-graph", type: "graph", aliases: ["Graph"] },
];

function sectionHeading(sec) {
  if (!sec) return "";
  if (sec.heading) return sec.heading;
  const known = sec.id && DEFAULT_SECTIONS.find((d) => d.id === sec.id);
  if (known) return known.heading;
  return sec.title || "";
}

function sectionLabel(sec) {
  if (sec && sec.id) {
    const label = t(`sections.${sec.id}`);
    if (label && !label.startsWith("sections.")) return label;
  }
  return (sec && (sec.title || sec.heading)) || "";
}

/* Inhalt eines Abschnitts: Überschrift, Titel, Kennung oder alter Name */
function canonicalHeading(title) {
  const known = DEFAULT_SECTIONS.find((d) => d.heading === title || d.aliases.includes(title));
  return known ? known.heading : title;
}

function sectionText(sections, sec) {
  const defaults = DEFAULT_SECTIONS.find((d) => d.id === (sec && sec.id))
    || DEFAULT_SECTIONS.find((d) => d.heading === (sec && sec.heading))
    || DEFAULT_SECTIONS.find((d) => (sec && sec.title) && (d.heading === sec.title || d.aliases.includes(sec.title)))
    || DEFAULT_SECTIONS.find((d) => (sec && sec.title) && (d.aliases.includes(sec.title)));
  const names = [
    sec && sec.heading,
    defaults && defaults.heading,
    sec && sec.title,
    sec && sec.id,
    ...((defaults && defaults.aliases) || []),
    ...((sec && sec.aliases) || []),
  ].filter(Boolean);
  for (const name of names) if (sections.has(name)) return sections.get(name);
  return undefined;
}


/* Altwerte (deutsche Bezeichnungen) auf Schlüssel abbilden */
const GROUP_ALIASES = {
  familie: "family", freunde: "friends", arbeit: "work", nachbarschaft: "neighborhood",
  bekannte: "acquaintances", sonstige: "other", verein: "other",
};

function normalizeGroup(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const key = raw.toLowerCase();
  if (GROUP_ALIASES[key]) return GROUP_ALIASES[key];
  if (Object.values(GROUP_ALIASES).includes(key)) return key;
  return key;
}

function groupLabel(value) {
  if (!value) return "";
  const key = normalizeGroup(value);
  const label = t(`groups.${key}`);
  return label && !label.startsWith("groups.") ? label : String(value);
}

function relTypeByValue(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const norm = raw.toLowerCase();
  for (const rt of DEFAULT_REL_TYPES) {
    if (rt.key === norm || rt.field === norm) return rt;
    const forms = [rt.n, rt.m, rt.w];
    if (forms.some((f) => f && f.toLowerCase() === norm)) return rt;
    if ((rt.aliases || []).some((a) => String(a).toLowerCase() === norm)) return rt;
  }
  return null;
}

module.exports = { canonicalHeading,
  VIEW_TYPE, DEFAULT_SETTINGS, ROLE, ROLE_M, ROLE_W, SECTORS, SECTOR_PRIO,
  PALETTE, THEME_PALETTE, THEME_GROUP_COLOR, THEME_KIND, DEFAULT_REL_TYPES,
  kreisDefaultValues, FIELD_LABEL, REL_FIELDS_UI, normalizeGroup, relTypeByValue,
  LEGACY_FIELDS, normalizeFm, DEFAULT_SECTIONS, sectionHeading, sectionLabel, sectionText, groupLabel,
};
