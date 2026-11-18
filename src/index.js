/* Einstiegspunkt: bündelt die Module zu main.js */
const ContactGraph = require("./plugin");
const { ContactGraphView } = require("./view");
const { parseJournal, formatJournal, ghostFrontmatter } = require("./markdown");
const { esc } = require("./util");
const i18n = require("./i18n");

module.exports = ContactGraph;

/* Nur für Tests */
module.exports.__test = { parseJournal, formatJournal, esc, ghostFrontmatter, ContactGraphView, i18n };
