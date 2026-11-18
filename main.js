/* contact-graph — generiert aus src/. Nicht direkt bearbeiten. */
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// src/locales/de.js
var require_de = __commonJS({
  "src/locales/de.js"(exports2, module2) {
    module2.exports = {
      relations: {
        partner: { n: "Partner", m: "Partner", w: "Partnerin", pl: "Partner" },
        ex_partner: { n: "Ex-Partner", m: "Ex-Partner", w: "Ex-Partnerin", pl: "Ex-Partner" },
        parent: { n: "Elternteil", m: "Vater", w: "Mutter", pl: "Eltern" },
        step_parent: { n: "Stiefelternteil", m: "Stiefvater", w: "Stiefmutter", pl: "Stiefeltern" },
        child: { n: "Kind", m: "Sohn", w: "Tochter", pl: "Kinder" },
        step_child: { n: "Stiefkind", m: "Stiefsohn", w: "Stieftochter", pl: "Stiefkinder" },
        sibling: { n: "Geschwister", m: "Bruder", w: "Schwester", pl: "Geschwister" },
        step_sibling: { n: "Stiefgeschwister", m: "Stiefbruder", w: "Stiefschwester", pl: "Stiefgeschwister" },
        relative: { n: "Verwandter", m: "Verwandter", w: "Verwandte", pl: "Verwandte" },
        friend: { n: "Freund", m: "Freund", w: "Freundin", pl: "Freunde" },
        ex_friend: { n: "Ex-Freund", m: "Ex-Freund", w: "Ex-Freundin", pl: "Ex-Freunde" },
        colleague: { n: "Kollege", m: "Kollege", w: "Kollegin", pl: "Kollegen" },
        ex_colleague: { n: "Ex-Kollege", m: "Ex-Kollege", w: "Ex-Kollegin", pl: "Ex-Kollegen" },
        neighbor: { n: "Nachbar", m: "Nachbar", w: "Nachbarin", pl: "Nachbarn" },
        ex_neighbor: { n: "Ex-Nachbar", m: "Ex-Nachbar", w: "Ex-Nachbarin", pl: "Ex-Nachbarn" },
        acquaintance: { n: "Bekannter", m: "Bekannter", w: "Bekannte", pl: "Bekannte" },
        other: { n: "Kontakt", m: "Kontakt", w: "Kontakt", pl: "Sonstige" },
        grandchild: { n: "Enkelkind", m: "Enkel", w: "Enkelin", pl: "Enkel" },
        grandparent: { n: "Gro\xDFelternteil", m: "Gro\xDFvater", w: "Gro\xDFmutter", pl: "Gro\xDFeltern" },
        uncle_aunt: { n: "Onkel/Tante", m: "Onkel", w: "Tante", pl: "Onkel und Tanten" },
        nephew_niece: { n: "Neffe/Nichte", m: "Neffe", w: "Nichte", pl: "Neffen und Nichten" },
        parent_in_law: { n: "Schwiegerelternteil", m: "Schwiegervater", w: "Schwiegermutter", pl: "Schwiegereltern" },
        sibling_in_law: { n: "Schwager/Schw\xE4gerin", m: "Schwager", w: "Schw\xE4gerin", pl: "Schw\xE4ger" },
        child_in_law: { n: "Schwiegerkind", m: "Schwiegersohn", w: "Schwiegertochter", pl: "Schwiegerkinder" },
        cousin: { n: "Cousin/Cousine", m: "Cousin", w: "Cousine", pl: "Cousins" },
        great_uncle_aunt: { n: "Gro\xDFonkel/-tante", m: "Gro\xDFonkel", w: "Gro\xDFtante", pl: "Gro\xDFonkel und -tanten" },
        great_nephew_niece: { n: "Gro\xDFneffe/-nichte", m: "Gro\xDFneffe", w: "Gro\xDFnichte", pl: "Gro\xDFneffen und -nichten" }
      },
      groups: {
        family: "Familie",
        friends: "Freunde",
        work: "Arbeit",
        neighborhood: "Nachbarschaft",
        acquaintances: "Bekannte",
        other: "Sonstige"
      },
      sections: {
        links: "Verkn\xFCpfungen",
        details: "Details",
        address: "Adresse",
        interests: "Interessen",
        family: "Familie",
        journal: "Verlauf",
        graph: "Graph"
      },
      roles: {
        me: "Ich",
        unknown: "Unbekannt"
      },
      ui: {
        "command.open": "Contact Graph \xF6ffnen",
        "command.complete": "Beziehungen vervollst\xE4ndigen",
        "command.newContact": "Neuer Kontakt",
        "command.bulk": "Kontakte bearbeiten (Masse)",
        "view.title": "Beziehungsgraph",
        "graph.empty": "F\xFCr diesen Kontakt ist noch keine Beziehung hinterlegt.",
        "graph.addRelation": "Beziehung erg\xE4nzen",
        "graph.placeholders": "{count} Platzhalter",
        "graph.refresh": "Neu laden",
        "graph.export": "Als Bild speichern",
        "card.edit": "Kontakt bearbeiten",
        "card.reload": "Karte neu laden",
        "card.image": "Profilbild setzen (oder Bild hierher ziehen)",
        "card.empty": "Noch nichts eingetragen.",
        "card.relations": "Beziehungen",
        "card.none": "Noch keine Beziehungen.",
        "section.add": "Abschnitt",
        "section.edit": "Abschnitt bearbeiten",
        "section.remove": "Abschnitt entfernen",
        "section.added": "\u201E{title}\u201C angelegt",
        "section.removed": "\u201E{title}\u201C entfernt",
        "section.allFilled": "Alle Abschnitte sind gef\xFCllt.",
        "section.removeConfirm": "Abschnitt \u201E{title}\u201C entfernen?",
        "section.removeHint": "\xDCberschrift und Inhalt werden aus der Notiz gel\xF6scht.",
        "journal.empty": "Noch keine Eintr\xE4ge.",
        "journal.emptyFiltered": "Noch keine Eintr\xE4ge ({filter}).",
        "journal.add": "Eintrag",
        "journal.edit": "Eintrag bearbeiten",
        "journal.delete": "Eintrag l\xF6schen",
        "journal.new": "Eintrag \u2014 {title}",
        "journal.deleteConfirm": "Eintrag l\xF6schen?",
        "journal.saved": "Eintrag gespeichert",
        "relation.add": "Beziehungen hinzuf\xFCgen \u2014 {name}",
        "relation.type": "Typ",
        "relation.person": "Person",
        "relation.search": "Namen suchen oder neuen Namen tippen \u2026",
        "relation.addButton": "Hinzuf\xFCgen",
        "relation.addCount": "Hinzuf\xFCgen ({count})",
        "relation.nothingSelected": "Nichts ausgew\xE4hlt.",
        "relation.unknown": "\u201E{name}\u201C ist noch kein Kontakt",
        "relation.unknownHint": "Nur verkn\xFCpfen legt einen Platzhalter an. Anlegen erzeugt die Notiz mit Vorname, weiteren Namen und Nachname.",
        "relation.linkOnly": "Nur verkn\xFCpfen",
        "relation.createAndLink": "Anlegen + verkn\xFCpfen",
        "relation.linked": "{type}: {count} verkn\xFCpft",
        "relation.created": "{type}: {count} angelegt und verkn\xFCpft",
        "relation.via": "{word} von {person}",
        "relation.singleLinked": "{type}: {name} verkn\xFCpft",
        "settings.selfNote.name": "Ich-Notiz",
        "settings.selfNote.desc": "Kontakt, der dich repr\xE4sentiert. Beziehungen aus dem Feld verhaeltnis h\xE4ngen an dieser Person.",
        "settings.folder.name": "Kontaktordner",
        "settings.folder.desc": "Ordner mit den Kontaktnotizen.",
        "settings.depth.name": "Standardtiefe",
        "settings.depth.desc": "Wie viele Grade beim \xD6ffnen gezeigt werden.",
        "settings.exclude.name": "Ausschluss-Muster",
        "settings.exclude.desc": "Dateinamen mit diesem Text werden ignoriert (z. B. conflict).",
        "settings.fields.name": "Merkmalsfelder",
        "settings.fields.desc": "z. B. geschlecht, verhaeltnis, kennengelernt, tags \u2014 nachname ist immer verf\xFCgbar.",
        "settings.familyOnly.name": "Nur Familienzweige weiter aufl\xF6sen",
        "settings.themeColors.name": "Themenfarben",
        "settings.themeColors.desc": "Farben aus dem aktiven Obsidian-Theme statt fester Werte. Wirkt f\xFCr Kanten, Blobs, ",
        "settings.sections.add": "Abschnitt hinzuf\xFCgen",
        "settings.sections.addDesc": "Name des Abschnitts (entspricht der \xDCberschrift ## Name in der Notiz).",
        "settings.kreisField.name": "Feld f\xFCr den Kreis",
        "settings.kreisField.desc": "Frontmatter-Feld, das den Kreis angibt, z. B. kreis: Freunde.",
        "settings.kreisFallback.name": "Kreis ableiten, wenn leer",
        "settings.blobOpacity.name": "Blob-Deckkraft",
        "settings.blobOpacity.desc": "F\xFCllung der Gelee-H\xFCllen, 0,05 bis 0,40.",
        "settings.blobPad.name": "Blob-Rand",
        "settings.blobPad.desc": "Wie weit die H\xFClle \xFCber die Knoten hinausreicht, in Pixeln.",
        "settings.exportFolder.name": "Export-Ordner",
        "settings.exportFolder.desc": "Wohin die PNG-Datei geschrieben wird.",
        "ui.add": "hinzuf\xFCgen",
        "ui.remove": "entfernen",
        "ui.delete": "l\xF6schen",
        "ui.up": "nach oben",
        "ui.down": "nach unten",
        "ui.visible": "sichtbar",
        "ui.dashed": "gestrichelt",
        "ui.save": "Speichern",
        "ui.cancel": "Abbrechen",
        "ui.exists": "Gibt es schon.",
        "ui.needName": "Bitte einen Namen angeben.",
        "ui.saveFirst": "Bitte zuerst speichern.",
        "ui.needRelation": "Bitte Verh\xE4ltnis oder Kreis angeben.",
        "ui.noContacts": "Keine Kontakte ausgew\xE4hlt.",
        "ui.noContactNote": "Keine Kontaktnotiz ge\xF6ffnet.",
        "ui.noNote": "Keine Notiz ge\xF6ffnet.",
        "ui.nothingToAdd": "F\xFCr diesen Kontakt ist nichts zu erg\xE4nzen.",
        "ui.nothingDerivable": "Nichts zu erg\xE4nzen \u2014 alle ableitbaren Beziehungen stehen schon in den Notizen.",
        "ui.graphConfigSaved": "Graph-Konfiguration gespeichert",
        "ui.sectionAllFilled": "Alle Abschnitte sind gef\xFCllt.",
        "ui.relationCreateAndLink": "Anlegen + verkn\xFCpfen",
        "ui.graphAddRelation": "Beziehung erg\xE4nzen",
        "ui.commandComplete": "Beziehungen vervollst\xE4ndigen",
        "ui.commandOpen": "Beziehungsgraph \xF6ffnen",
        "ui.pickImage": "Bild w\xE4hlen",
        "ui.journalDelete": "Eintrag l\xF6schen",
        "ui.journalDeleteConfirm": "Eintrag l\xF6schen?",
        "ui.coloring": "F\xE4rbung",
        "ui.graphEmpty": "F\xFCr diesen Kontakt ist noch keine Beziehung hinterlegt.",
        "ui.heightPx": "H\xF6he (px)",
        "ui.mapOpen": "In OpenStreetMap \xF6ffnen",
        "ui.mapLoading": "Karte l\xE4dt \u2026",
        "ui.mapUnavailable": "Karte nicht verf\xFCgbar.",
        "ui.commandCompleteContacts": "Kontakte vervollst\xE4ndigen",
        "ui.addSectionName": "Name hinzuf\xFCgen \u2026",
        "ui.nothingSelected": "Nichts ausgew\xE4hlt.",
        "ui.noEntries": "Noch keine Eintr\xE4ge.",
        "ui.unknownHint": "Nur verkn\xFCpfen legt einen Platzhalter an. Anlegen erzeugt die Notiz mit Vorname, weiteren Namen und Nachname.",
        "ui.linkOnly": "Nur verkn\xFCpfen",
        "ui.resetView": "Standardgr\xF6\xDFe und Mitte",
        "ui.bulkTitle": "Verh\xE4ltnis f\xFCr mehrere Kontakte setzen",
        "ui.bulkTitleShort": "Verh\xE4ltnis f\xFCr mehrere Kontakte",
        "ui.fieldRelation": "Verh\xE4ltnis zu mir",
        "ui.kreisFallbackDesc": "Verh\xE4ltnis zur Ich-Person, sonst Sonstige.",
        "ui.linkedNote": "Verkn\xFCpfte Notiz",
        "ui.complete": "Vervollst\xE4ndigen",
        "ui.bigger": "gr\xF6\xDFer",
        "ui.sectionsDesc": "Diese Abschnitte erscheinen als K\xE4sten \u2014 in dieser Reihenfolge und nur, wenn sie Inhalt haben. ",
        "field.firstName": "Vorname",
        "field.lastName": "Nachname",
        "field.middleNames": "Weitere Namen (Komma)",
        "field.birthday": "Geburtstag",
        "field.gender": "Geschlecht",
        "field.email": "E-Mail",
        "field.phone": "Telefon",
        "field.website": "Website",
        "field.company": "Firma",
        "field.position": "Position",
        "field.circle": "Kreis",
        "field.met": "Kennengelernt",
        "field.lastContact": "Letzter Kontakt",
        "field.image": "Profilbild",
        "field.place": "Ort",
        "field.date": "Datum",
        "field.title": "Titel",
        "field.type": "Typ",
        "field.participants": "Beteiligte",
        "field.summary": "Zusammenfassung",
        "field.notes": "Notizen",
        "field.address": "Adresse",
        "gender.male": "m\xE4nnlich",
        "gender.female": "weiblich",
        "ui.noImage": "kein Bild",
        "ui.contact": "Kontakt",
        "ui.grouping": "Einordnung",
        "ui.person": "Person",
        "ui.cardEdit": "Kontakt bearbeiten",
        "sections.gifts": "Geschenkideen",
        "gifts.empty": "Noch keine Geschenkideen.",
        "gifts.add": "Geschenkidee",
        "gifts.edit": "Geschenkidee bearbeiten",
        "gifts.new": "Geschenkidee \u2014 {title}",
        "gifts.delete": "Geschenkidee l\xF6schen",
        "gifts.deleteConfirm": "Geschenkidee l\xF6schen?",
        "gifts.done": "Erledigt",
        "gifts.open": "\xD6ffnen",
        "gifts.saved": "Geschenkidee gespeichert",
        "gifts.needTitle": "Bitte einen Titel angeben.",
        "field.giftTitle": "Titel",
        "field.giftDescription": "Beschreibung",
        "field.giftLink": "Link",
        "field.giftPrice": "Preis",
        "settings.gifts.hint": "Geschenkideen stehen als Liste im Abschnitt \u201E{section}\u201C.",
        "image.position": "Bildausschnitt",
        "image.positionHint": "Ziehen, um den Ausschnitt zu w\xE4hlen.",
        "image.reset": "Mitte",
        "ui.checked": "abgehakt",
        "ui.unchecked": "offen",
        "image.title": "Profilbild",
        "image.choose": "Bild w\xE4hlen",
        "image.open": "Profilbild \xE4ndern",
        "image.saved": "Profilbild gespeichert",
        "image.zoom": "Zoom",
        "image.failed": "Profilbild konnte nicht gespeichert werden",
        "field.relation": "Verh\xE4ltnis",
        "ui.filter": "filtern \u2026",
        "ui.selectAll": "alle / keine",
        "ui.keepUnchanged": "\u2014 nicht \xE4ndern \u2014",
        "ui.apply": "\xDCbernehmen",
        "ui.bulkDone": "{count} Kontakte aktualisiert.",
        "ui.createNewContact": "Neue Kontakte anlegen",
        "ui.createNewHint": "Aus: nur verkn\xFCpfen \u2014 die Notiz entsteht sp\xE4ter.",
        "ui.createNewOn": "An: fehlende Kontakte werden als Notiz angelegt.",
        "ui.willCreate": "Wird beim Hinzuf\xFCgen angelegt.",
        "ui.willLinkOnly": "Wird nur verkn\xFCpft, ohne eigene Notiz.",
        "ui.relationsAdded": "{what}: {count} verkn\xFCpft, {created} neu angelegt.",
        "ui.addRelation": "Beziehung hinzuf\xFCgen",
        "ui.addRelations": "Beziehungen hinzuf\xFCgen \u2014 {source}",
        "ui.newContact": "Neuer Kontakt",
        "ui.contactTitle": "Kontakt: {name}",
        "ui.contactSection": "Kontakt",
        "graph.configTitle": "Graph konfigurieren \u2014 {name}",
        "ui.nameConflictTitle": "Name bereits vorhanden",
        "ui.nameConflictHint": "\u201E{name}\u201C existiert schon. Gib einen Zusatz an, damit beide unterscheidbar bleiben.",
        "ui.nameSuffix": "Zusatz",
        "ui.nameSuffixHint": "z. B. Feuerwehr, Arbeit, Dortmund",
        "ui.createSeparate": "Als eigene Person anlegen",
        "ui.groupNames": "Namensfelder",
        "ui.groupDuplicates": "Doppelte Namen",
        "sections.links": "Verkn\xFCpfungen",
        "sections.details": "Details",
        "sections.address": "Adresse",
        "sections.interests": "Interessen",
        "sections.family": "Familie",
        "sections.journal": "Verlauf",
        "sections.graph": "Graph",
        "ui.maximize": "Vergr\xF6\xDFern",
        "ui.restore": "Verkleinern",
        "ui.preview": "Vorschau",
        "section.saved": "\u201E{title}\u201C gespeichert",
        "ui.editContact": "Kontakt bearbeiten",
        "ui.reloadCard": "Karte neu laden",
        "ui.editSection": "Abschnitt bearbeiten",
        "ui.removeSection": "Abschnitt entfernen",
        "ui.editEntry": "Eintrag bearbeiten",
        "ui.entryNew": "Eintrag"
      }
    };
  }
});

// src/locales/en.js
var require_en = __commonJS({
  "src/locales/en.js"(exports2, module2) {
    module2.exports = {
      relations: {
        partner: { n: "Partner", m: "Partner", w: "Partner", pl: "Partners" },
        ex_partner: { n: "Ex-partner", m: "Ex-partner", w: "Ex-partner", pl: "Ex-partners" },
        parent: { n: "Parent", m: "Father", w: "Mother", pl: "Parents" },
        step_parent: { n: "Step-parent", m: "Stepfather", w: "Stepmother", pl: "Step-parents" },
        child: { n: "Child", m: "Son", w: "Daughter", pl: "Children" },
        step_child: { n: "Step-child", m: "Stepson", w: "Stepdaughter", pl: "Step-children" },
        sibling: { n: "Sibling", m: "Brother", w: "Sister", pl: "Siblings" },
        step_sibling: { n: "Step-sibling", m: "Stepbrother", w: "Stepsister", pl: "Step-siblings" },
        relative: { n: "Relative", m: "Relative", w: "Relative", pl: "Relatives" },
        friend: { n: "Friend", m: "Friend", w: "Friend", pl: "Friends" },
        ex_friend: { n: "Ex-friend", m: "Ex-friend", w: "Ex-friend", pl: "Ex-friends" },
        colleague: { n: "Colleague", m: "Colleague", w: "Colleague", pl: "Colleagues" },
        ex_colleague: { n: "Ex-colleague", m: "Ex-colleague", w: "Ex-colleague", pl: "Ex-colleagues" },
        neighbor: { n: "Neighbour", m: "Neighbour", w: "Neighbour", pl: "Neighbours" },
        ex_neighbor: { n: "Ex-neighbour", m: "Ex-neighbour", w: "Ex-neighbour", pl: "Ex-neighbours" },
        acquaintance: { n: "Acquaintance", m: "Acquaintance", w: "Acquaintance", pl: "Acquaintances" },
        other: { n: "Contact", m: "Contact", w: "Contact", pl: "Others" },
        grandchild: { n: "Grandchild", m: "Grandson", w: "Granddaughter", pl: "Grandchildren" },
        grandparent: { n: "Grandparent", m: "Grandfather", w: "Grandmother", pl: "Grandparents" },
        uncle_aunt: { n: "Uncle/aunt", m: "Uncle", w: "Aunt", pl: "Uncles and aunts" },
        nephew_niece: { n: "Nephew/niece", m: "Nephew", w: "Niece", pl: "Nephews and nieces" },
        parent_in_law: { n: "Parent-in-law", m: "Father-in-law", w: "Mother-in-law", pl: "Parents-in-law" },
        sibling_in_law: { n: "Sibling-in-law", m: "Brother-in-law", w: "Sister-in-law", pl: "Siblings-in-law" },
        child_in_law: { n: "Child-in-law", m: "Son-in-law", w: "Daughter-in-law", pl: "Children-in-law" },
        cousin: { n: "Cousin", m: "Cousin", w: "Cousin", pl: "Cousins" },
        great_uncle_aunt: { n: "Great-uncle/aunt", m: "Great-uncle", w: "Great-aunt", pl: "Great-uncles and aunts" },
        great_nephew_niece: { n: "Great-nephew/niece", m: "Great-nephew", w: "Great-niece", pl: "Great-nephews and nieces" }
      },
      groups: {
        family: "Family",
        friends: "Friends",
        work: "Work",
        neighborhood: "Neighbourhood",
        acquaintances: "Acquaintances",
        other: "Other"
      },
      sections: {
        links: "Links",
        details: "Details",
        address: "Address",
        interests: "Interests",
        family: "Family",
        journal: "Journal",
        graph: "Graph"
      },
      roles: {
        me: "Me",
        unknown: "Unknown"
      },
      ui: {
        "command.open": "Open contact graph",
        "command.complete": "Complete relations",
        "command.newContact": "New contact",
        "command.bulk": "Edit contacts (bulk)",
        "view.title": "Relation graph",
        "graph.empty": "No relations stored for this contact yet.",
        "graph.addRelation": "Add relation",
        "graph.placeholders": "{count} placeholders",
        "graph.refresh": "Reload",
        "graph.export": "Save as image",
        "card.edit": "Edit contact",
        "card.reload": "Reload card",
        "card.image": "Set profile picture (or drop an image here)",
        "card.empty": "Nothing here yet.",
        "card.relations": "Relations",
        "card.none": "No relations yet.",
        "section.add": "Section",
        "section.edit": "Edit section",
        "section.remove": "Remove section",
        "section.added": "\u201C{title}\u201D created",
        "section.removed": "\u201C{title}\u201D removed",
        "section.allFilled": "All sections are filled.",
        "section.removeConfirm": "Remove section \u201C{title}\u201D?",
        "section.removeHint": "Heading and content will be deleted from the note.",
        "journal.empty": "No entries yet.",
        "journal.emptyFiltered": "No entries yet ({filter}).",
        "journal.add": "Entry",
        "journal.edit": "Edit entry",
        "journal.delete": "Delete entry",
        "journal.new": "Entry \u2014 {title}",
        "journal.deleteConfirm": "Delete entry?",
        "journal.saved": "Entry saved",
        "relation.add": "Add relations \u2014 {name}",
        "relation.type": "Type",
        "relation.person": "Person",
        "relation.search": "Search names or type a new one \u2026",
        "relation.addButton": "Add",
        "relation.addCount": "Add ({count})",
        "relation.nothingSelected": "Nothing selected.",
        "relation.unknown": "\u201C{name}\u201D is not a contact yet",
        "relation.unknownHint": "Link only creates a placeholder. Create makes the note with first name, middle names and last name.",
        "relation.linkOnly": "Link only",
        "relation.createAndLink": "Create + link",
        "relation.linked": "{type}: {count} linked",
        "relation.created": "{type}: {count} created and linked",
        "relation.via": "{word} of {person}",
        "relation.singleLinked": "{type}: {name} linked",
        "settings.selfNote.name": "My contact note",
        "settings.selfNote.desc": "The contact that represents you. Relations from the verhaeltnis field attach here.",
        "settings.folder.name": "Contact folder",
        "settings.folder.desc": "Folder containing the contact notes.",
        "settings.depth.name": "Default depth",
        "settings.depth.desc": "How many degrees to show when opening.",
        "settings.exclude.name": "Exclude pattern",
        "settings.exclude.desc": "File names containing this text are ignored (e.g. conflict).",
        "settings.fields.name": "Attribute fields",
        "settings.fields.desc": "e.g. geschlecht, verhaeltnis, kennengelernt, tags \u2014 nachname is always available.",
        "settings.familyOnly.name": "Resolve family branches only",
        "settings.themeColors.name": "Theme colours",
        "settings.themeColors.desc": "Colours from the active Obsidian theme instead of fixed values. Applies to edges, blobs, ",
        "settings.sections.add": "Add section",
        "settings.sections.addDesc": "Section name (matches the heading ## Name in the note).",
        "settings.kreisField.name": "Field for the circle",
        "settings.kreisField.desc": "Frontmatter field holding the circle, e.g. kreis: friends.",
        "settings.kreisFallback.name": "Derive circle when empty",
        "settings.blobOpacity.name": "Blob opacity",
        "settings.blobOpacity.desc": "Fill of the jelly hulls, 0.05 to 0.40.",
        "settings.blobPad.name": "Blob padding",
        "settings.blobPad.desc": "How far the hull extends beyond the nodes, in pixels.",
        "settings.exportFolder.name": "Export folder",
        "settings.exportFolder.desc": "Where the PNG file is written.",
        "ui.add": "add",
        "ui.remove": "remove",
        "ui.delete": "delete",
        "ui.up": "up",
        "ui.down": "down",
        "ui.visible": "visible",
        "ui.dashed": "dashed",
        "ui.save": "Save",
        "ui.cancel": "Cancel",
        "ui.exists": "Already exists.",
        "ui.needName": "Please enter a name.",
        "ui.saveFirst": "Save first.",
        "ui.needRelation": "Please provide a relation or circle.",
        "ui.noContacts": "No contacts selected.",
        "ui.noContactNote": "No contact note open.",
        "ui.noNote": "No note open.",
        "ui.nothingToAdd": "Nothing to add for this contact.",
        "ui.nothingDerivable": "Nothing to add \u2014 all derivable relations are already in the notes.",
        "ui.graphConfigSaved": "Graph configuration saved",
        "ui.sectionAllFilled": "All sections are filled.",
        "ui.relationCreateAndLink": "Create + link",
        "ui.graphAddRelation": "Add relation",
        "ui.commandComplete": "Complete relations",
        "ui.commandOpen": "Open relation graph",
        "ui.pickImage": "Choose image",
        "ui.journalDelete": "Delete entry",
        "ui.journalDeleteConfirm": "Delete entry?",
        "ui.coloring": "Colouring",
        "ui.graphEmpty": "No relations stored for this contact yet.",
        "ui.heightPx": "Height (px)",
        "ui.mapOpen": "Open in OpenStreetMap",
        "ui.mapLoading": "Map is loading \u2026",
        "ui.mapUnavailable": "Map not available.",
        "ui.commandCompleteContacts": "Complete contacts",
        "ui.addSectionName": "Add section name \u2026",
        "ui.nothingSelected": "Nothing selected.",
        "ui.noEntries": "No entries yet.",
        "ui.unknownHint": "Link only creates a placeholder. Create makes the note with first name, middle names and last name.",
        "ui.linkOnly": "Link only",
        "ui.resetView": "Default size and centre",
        "ui.bulkTitle": "Set relations for several contacts",
        "ui.bulkTitleShort": "Relations for several contacts",
        "ui.fieldRelation": "Relation to me",
        "ui.kreisFallbackDesc": "Relation to me, otherwise other.",
        "ui.linkedNote": "Linked note",
        "ui.complete": "Complete",
        "ui.bigger": "larger",
        "ui.sectionsDesc": "These sections appear as boxes \u2014 in this order and only when they have content. ",
        "field.firstName": "First name",
        "field.lastName": "Last name",
        "field.middleNames": "Middle names (comma)",
        "field.birthday": "Birthday",
        "field.gender": "Gender",
        "field.email": "Email",
        "field.phone": "Phone",
        "field.website": "Website",
        "field.company": "Company",
        "field.position": "Position",
        "field.circle": "Circle",
        "field.met": "Met",
        "field.lastContact": "Last contact",
        "field.image": "Profile picture",
        "field.place": "Place",
        "field.date": "Date",
        "field.title": "Title",
        "field.type": "Type",
        "field.participants": "Participants",
        "field.summary": "Summary",
        "field.notes": "Notes",
        "field.address": "Address",
        "gender.male": "male",
        "gender.female": "female",
        "ui.noImage": "no image",
        "ui.contact": "Contact",
        "ui.grouping": "Grouping",
        "ui.person": "Person",
        "ui.cardEdit": "Edit contact",
        "sections.gifts": "Gift ideas",
        "gifts.empty": "No gift ideas yet.",
        "gifts.add": "Gift idea",
        "gifts.edit": "Edit gift idea",
        "gifts.new": "Gift idea \u2014 {title}",
        "gifts.delete": "Delete gift idea",
        "gifts.deleteConfirm": "Delete gift idea?",
        "gifts.done": "Done",
        "gifts.open": "Open",
        "gifts.saved": "Gift idea saved",
        "gifts.needTitle": "Please enter a title.",
        "field.giftTitle": "Title",
        "field.giftDescription": "Description",
        "field.giftLink": "Link",
        "field.giftPrice": "Price",
        "settings.gifts.hint": "Gift ideas live as a list in the \u201C{section}\u201D section.",
        "image.position": "Image position",
        "image.positionHint": "Drag to choose the crop.",
        "image.reset": "Centre",
        "ui.checked": "checked",
        "ui.unchecked": "open",
        "image.title": "Profile picture",
        "image.choose": "Choose image",
        "image.open": "Change picture",
        "image.saved": "Picture saved",
        "image.zoom": "Zoom",
        "image.failed": "Could not save the picture",
        "field.relation": "Relation",
        "ui.filter": "filter \u2026",
        "ui.selectAll": "all / none",
        "ui.keepUnchanged": "\u2014 keep unchanged \u2014",
        "ui.apply": "Apply",
        "ui.bulkDone": "{count} contacts updated.",
        "ui.createNewContact": "Create new contacts",
        "ui.createNewHint": "Off: link only \u2014 the note is created later.",
        "ui.createNewOn": "On: missing contacts are created as notes.",
        "ui.willCreate": "Will be created when you add.",
        "ui.willLinkOnly": "Linked only, without its own note.",
        "ui.relationsAdded": "{what}: {count} linked, {created} created.",
        "ui.addRelation": "Add relation",
        "ui.addRelations": "Add relations \u2014 {source}",
        "ui.newContact": "New contact",
        "ui.contactTitle": "Contact: {name}",
        "ui.contactSection": "Contact",
        "graph.configTitle": "Configure graph \u2014 {name}",
        "ui.nameConflictTitle": "Name already in use",
        "ui.nameConflictHint": "\u201C{name}\u201D already exists. Add a distinguishing suffix.",
        "ui.nameSuffix": "Suffix",
        "ui.nameSuffixHint": "e.g. fire brigade, work, Dortmund",
        "ui.createSeparate": "Create as separate person",
        "ui.groupNames": "Name fields",
        "ui.groupDuplicates": "Duplicate names",
        "sections.links": "Links",
        "sections.details": "Details",
        "sections.address": "Address",
        "sections.interests": "Interests",
        "sections.family": "Family",
        "sections.journal": "Journal",
        "sections.graph": "Graph",
        "ui.maximize": "Maximize",
        "ui.restore": "Restore",
        "ui.preview": "Preview",
        "section.saved": "\u201C{title}\u201D saved",
        "ui.editContact": "Edit contact",
        "ui.reloadCard": "Reload card",
        "ui.editSection": "Edit section",
        "ui.removeSection": "Remove section",
        "ui.editEntry": "Edit entry",
        "ui.entryNew": "Entry"
      }
    };
  }
});

// src/i18n.js
var require_i18n = __commonJS({
  "src/i18n.js"(exports2, module2) {
    var de = require_de();
    var en = require_en();
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
    var LOCALES = {
      de: normalize(de, ""),
      en: normalize(en, "")
    };
    var locale = "de";
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
        if (cur === void 0 || cur === null) return void 0;
        const rest = parts.slice(i).join(".");
        if (typeof cur === "object" && Object.prototype.hasOwnProperty.call(cur, rest)) return cur[rest];
        cur = cur[parts[i]];
      }
      return typeof cur === "string" ? cur : void 0;
    }
    function t(key, vars) {
      const order = [locale, "en"].filter((code, i, arr) => LOCALES[code] && arr.indexOf(code) === i);
      let value;
      for (const code of order) {
        value = lookup(LOCALES[code], key);
        if (value === void 0) value = lookup(LOCALES[code], "ui." + key);
        if (value !== void 0) break;
      }
      if (typeof value !== "string") return String(key);
      if (!vars) return value;
      return value.replace(/\{(\w+)\}/g, (m, name) => vars[name] === void 0 ? m : String(vars[name]));
    }
    module2.exports = { t, setLocale, getLocale, detectLocale, LOCALES };
  }
});

// src/constants.js
var require_constants = __commonJS({
  "src/constants.js"(exports2, module2) {
    var { t } = require_i18n();
    var VIEW_TYPE = "contact-graph-view";
    var DEFAULT_SETTINGS = {
      selfNote: "",
      // wird in den Einstellungen gesetzt
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
        { id: "gifts", heading: "Gifts", type: "gifts" }
      ],
      relTypes: null,
      // null = Standardkatalog unten
      kreisField: "circle",
      kreisFallback: true,
      exportFolder: "30_Resources/34_Assets/Beziehungen",
      types: {
        partner: { label: "Partner", color: "#b5563f", dashed: false, enabled: true },
        eltern: { label: "Elternteil/Kind", color: "#4a7fb5", dashed: false, enabled: true },
        geschwister: { label: "Geschwister", color: "#7a8b4a", dashed: true, enabled: true },
        verhaeltnis: { label: "Verh\xE4ltnis", color: "#8b7fb5", dashed: false, enabled: true }
      }
    };
    var ROLE = {
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
      "siblings,children,children": "great_nephew_niece"
    };
    var ROLE_M = {
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
      "siblings,children,children": "great_nephew_niece"
    };
    var ROLE_W = {
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
      "siblings,children,children": "great_nephew_niece"
    };
    var SECTORS = [
      { id: "family", label: () => t("groups.family") },
      { id: "friends", label: () => t("groups.friends") },
      { id: "work", label: () => t("groups.work") },
      { id: "acquaintances", label: () => t("groups.acquaintances") }
    ];
    var SECTOR_PRIO = { family: 0, friends: 1, work: 2, acquaintances: 3 };
    var PALETTE = ["#6ea8e8", "#d98b6a", "#7fbf8a", "#c79be0", "#e0c060", "#6fc3c3", "#e08a9a", "#9aa8d0"];
    var THEME_PALETTE = [
      "var(--color-blue)",
      "var(--color-orange)",
      "var(--color-green)",
      "var(--color-purple)",
      "var(--color-yellow)",
      "var(--color-cyan)",
      "var(--color-pink)",
      "var(--color-red)"
    ];
    var THEME_GROUP_COLOR = {
      family: "var(--color-blue)",
      friends: "var(--color-green)",
      work: "var(--color-orange)",
      neighborhood: "var(--color-cyan)",
      acquaintances: "var(--color-purple)",
      other: "var(--text-faint)"
    };
    var THEME_KIND = {
      partner: "var(--color-red)",
      eltern: "var(--color-blue)",
      parent: "var(--color-blue)",
      geschwister: "var(--color-green)",
      verhaeltnis: "var(--color-purple)"
    };
    var rel = (field, key, group, inverse, aliases) => {
      const entry = { field, key, group, inverse: inverse || field };
      if (aliases) entry.aliases = aliases;
      Object.defineProperties(entry, {
        n: { get() {
          return t(`relations.${key}.n`);
        }, enumerable: true },
        m: { get() {
          return t(`relations.${key}.m`);
        }, enumerable: true },
        w: { get() {
          return t(`relations.${key}.w`);
        }, enumerable: true },
        pl: { get() {
          return t(`relations.${key}.pl`);
        }, enumerable: true }
      });
      return entry;
    };
    var DEFAULT_REL_TYPES = [
      /* family */
      rel("partner", "partner", "family", "partner"),
      rel(
        "partner_ex",
        "ex_partner",
        "family",
        "partner_ex",
        ["ex", "ex-partner", "ex-partnerin", "ehemaliger partner", "ehemalige partnerin"]
      ),
      rel("parents", "parent", "family", "children"),
      rel("step_parents", "step_parent", "family", "step_children"),
      rel("children", "child", "family", "parents"),
      rel("step_children", "step_child", "family", "step_parents"),
      rel("siblings", "sibling", "family", "siblings"),
      rel("step_siblings", "step_sibling", "family", "step_siblings"),
      rel("relatives", "relative", "family", "relatives"),
      /* friends */
      rel("friends", "friend", "friends", "friends"),
      rel(
        "ex_friends",
        "ex_friend",
        "friends",
        "ex_friends",
        ["ehemaliger freund", "ehemalige freundin", "ex-freundin"]
      ),
      /* work */
      rel("work", "colleague", "work", "work"),
      rel(
        "ex_colleagues",
        "ex_colleague",
        "work",
        "ex_colleagues",
        ["ehemaliger arbeitskollege", "ehemalige arbeitskollegin", "ehemaliger kollege", "ehemalige kollegin", "ex-arbeitskollege"]
      ),
      /* neighbourhood */
      rel("neighbors", "neighbor", "neighborhood", "neighbors"),
      rel(
        "ex_neighbors",
        "ex_neighbor",
        "neighborhood",
        "ex_neighbors",
        ["ehemaliger nachbar", "ehemalige nachbarin"]
      ),
      /* acquaintances */
      rel("acquaintances", "acquaintance", "acquaintances", "acquaintances"),
      rel("other", "other", "other", "other")
    ];
    var kreisDefaultValues = () => ["Familie", "Arbeit", "Freunde", "Nachbarn", "Verein"];
    var FIELD_LABEL = {
      partner: "Partner",
      eltern: "Eltern",
      kinder: "Kinder",
      geschwister: "Geschwister",
      grosseltern: "Gro\xDFeltern"
    };
    var REL_FIELDS_UI = [
      ["partner", "Partner"],
      ["eltern", "Eltern"],
      ["kinder", "Kinder"],
      ["geschwister", "Geschwister"]
    ];
    var LEGACY_FIELDS = {};
    function normalizeFm(fm) {
      return Object.assign({}, fm || {});
    }
    var DEFAULT_SECTIONS = [
      { id: "links", heading: "cg-links", type: "text", aliases: ["Links", "Verkn\xFCpfungen"] },
      { id: "details", heading: "cg-details", type: "text", aliases: ["Details"] },
      { id: "address", heading: "cg-address", type: "address", aliases: ["Address", "Adresse"] },
      { id: "interests", heading: "cg-interests", type: "text", aliases: ["Interests", "Interessen"] },
      { id: "family", heading: "cg-family", type: "text", aliases: ["Family", "Familie"] },
      { id: "journal", heading: "cg-journal", type: "journal", aliases: ["Journal", "Verlauf"] },
      { id: "gifts", heading: "cg-gifts", type: "gifts", aliases: ["Gifts", "Geschenkideen"] },
      { id: "graph", heading: "cg-graph", type: "graph", aliases: ["Graph"] }
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
      return sec && (sec.title || sec.heading) || "";
    }
    function canonicalHeading(title) {
      const known = DEFAULT_SECTIONS.find((d) => d.heading === title || d.aliases.includes(title));
      return known ? known.heading : title;
    }
    function sectionText(sections, sec) {
      const defaults = DEFAULT_SECTIONS.find((d) => d.id === (sec && sec.id)) || DEFAULT_SECTIONS.find((d) => d.heading === (sec && sec.heading)) || DEFAULT_SECTIONS.find((d) => sec && sec.title && (d.heading === sec.title || d.aliases.includes(sec.title))) || DEFAULT_SECTIONS.find((d) => sec && sec.title && d.aliases.includes(sec.title));
      const names = [
        sec && sec.heading,
        defaults && defaults.heading,
        sec && sec.title,
        sec && sec.id,
        ...defaults && defaults.aliases || [],
        ...sec && sec.aliases || []
      ].filter(Boolean);
      for (const name of names) if (sections.has(name)) return sections.get(name);
      return void 0;
    }
    var GROUP_ALIASES = {
      familie: "family",
      freunde: "friends",
      arbeit: "work",
      nachbarschaft: "neighborhood",
      bekannte: "acquaintances",
      sonstige: "other",
      verein: "other"
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
    module2.exports = {
      canonicalHeading,
      VIEW_TYPE,
      DEFAULT_SETTINGS,
      ROLE,
      ROLE_M,
      ROLE_W,
      SECTORS,
      SECTOR_PRIO,
      PALETTE,
      THEME_PALETTE,
      THEME_GROUP_COLOR,
      THEME_KIND,
      DEFAULT_REL_TYPES,
      kreisDefaultValues,
      FIELD_LABEL,
      REL_FIELDS_UI,
      normalizeGroup,
      relTypeByValue,
      LEGACY_FIELDS,
      normalizeFm,
      DEFAULT_SECTIONS,
      sectionHeading,
      sectionLabel,
      sectionText,
      groupLabel
    };
  }
});

// src/util.js
var require_util = __commonJS({
  "src/util.js"(exports2, module2) {
    var { setIcon } = require("obsidian");
    var clean = (v) => String(v).trim().replace(/^!?\[\[|\]\]$/g, "").split("|")[0].replace(/#.*$/, "").trim();
    var asList = (v) => {
      if (v === void 0 || v === null || v === "") return [];
      const arr = Array.isArray(v) ? v : [v];
      return arr.map(clean).filter(Boolean);
    };
    function attachGraphHover(svgEl) {
      const clear = () => {
        svgEl.classList.remove("cg-hovering");
        svgEl.querySelectorAll(".cg-sector, .cg-sector-label").forEach((s) => s.classList.remove("cg-on"));
        svgEl.querySelectorAll(".cg-node").forEach((n) => n.classList.remove("cg-on-path"));
        svgEl.querySelectorAll(".cg-edge").forEach((e) => e.classList.remove("cg-hl"));
        svgEl.querySelectorAll(".cg-edge-label").forEach((t) => t.remove());
      };
      svgEl.querySelectorAll(".cg-node").forEach((node) => {
        node.addEventListener("mouseenter", () => {
          clear();
          const path = (node.getAttribute("data-path") || "").split("|").filter(Boolean);
          if (path.length < 2) return;
          const set = new Set(path);
          svgEl.classList.add("cg-hovering");
          const sec = node.getAttribute("data-sector");
          if (sec) {
            svgEl.querySelectorAll(`.cg-sector[data-sector="${sec}"], .cg-sector-label[data-sector="${sec}"]`).forEach((s) => s.classList.add("cg-on"));
          }
          svgEl.querySelectorAll(".cg-node").forEach((n) => {
            n.classList.toggle("cg-on-path", set.has(n.getAttribute("data-name")));
          });
          svgEl.querySelectorAll(".cg-edge").forEach((e) => {
            const a = e.getAttribute("data-a"), b = e.getAttribute("data-b");
            let on = false, step = 0;
            for (let i = 0; i < path.length - 1; i++) {
              if (path[i] === a && path[i + 1] === b || path[i] === b && path[i + 1] === a) {
                on = true;
                step = i;
              }
            }
            if (!on) return;
            e.classList.add("cg-hl");
            const x1 = +e.getAttribute("x1"), y1 = +e.getAttribute("y1");
            const x2 = +e.getAttribute("x2"), y2 = +e.getAttribute("y2");
            const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            t.setAttribute("class", "cg-edge-label");
            t.setAttribute("x", ((x1 + x2) / 2).toFixed(1));
            t.setAttribute("y", ((y1 + y2) / 2 - 5).toFixed(1));
            t.setAttribute("text-anchor", "middle");
            let label = e.getAttribute("data-label") || "";
            if (e.getAttribute("data-kind") === "parent") label = path[step] === a ? "Kind" : "Elternteil";
            t.textContent = label;
            svgEl.appendChild(t);
          });
        });
        node.addEventListener("mouseleave", clear);
      });
    }
    function attachZoom(container, svgEl, state) {
      const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
      const W = vb && vb.width || 900;
      const H = vb && vb.height || 760;
      svgEl.setAttribute("width", W);
      svgEl.setAttribute("height", H);
      const host = container.parentElement || container;
      host.classList.add("cg-zoom-host");
      const bar = host.createDiv({ cls: "cg-zoom" });
      const out = bar.createEl("button", { text: "\u2212", cls: "cg-zoom-btn", attr: { title: "kleiner" } });
      const label = bar.createEl("span", { cls: "cg-zoom-label" });
      const inp = bar.createEl("button", { text: "\uFF0B", cls: "cg-zoom-btn", attr: { title: "gr\xF6\xDFer" } });
      const reset = bar.createEl("button", { text: "\u27F2", cls: "cg-zoom-btn", attr: { title: "Standardgr\xF6\xDFe und Mitte" } });
      const centerView = () => {
        const maxX = container.scrollWidth - container.clientWidth;
        const maxY = container.scrollHeight - container.clientHeight;
        container.scrollLeft = maxX > 0 ? Math.round(maxX / 2) : 0;
        container.scrollTop = maxY > 0 ? Math.round(maxY / 2) : 0;
      };
      const base = () => {
        if (container.classList.contains("cg-embed")) {
          const w = container.clientWidth || W;
          return { w: Math.min(W, w), h: 0 };
        }
        return { w: W, h: H };
      };
      const apply = (z, anchor) => {
        const prev = state.z || 1;
        const next = Math.min(3, Math.max(0.35, z));
        const b = base();
        if (Math.abs(next - prev) < 1e-3 && svgEl.style.width) return;
        state.z = next;
        svgEl.style.maxWidth = "none";
        svgEl.style.maxHeight = "none";
        svgEl.style.width = `${Math.round(b.w * next)}px`;
        svgEl.style.height = b.h ? `${Math.round(b.h * next)}px` : "auto";
        label.setText(`${Math.round(next * 100)} %`);
        if (anchor) {
          const k = next / prev;
          container.scrollLeft = (container.scrollLeft + anchor.x) * k - anchor.x;
          container.scrollTop = (container.scrollTop + anchor.y) * k - anchor.y;
        }
      };
      const viewAnchor = () => ({ x: container.clientWidth / 2, y: container.clientHeight / 2 });
      out.onclick = () => apply((state.z || 1) / 1.2, viewAnchor());
      inp.onclick = () => apply((state.z || 1) * 1.2, viewAnchor());
      reset.onclick = () => {
        state.z = 1;
        const b = base();
        svgEl.style.width = `${Math.round(b.w)}px`;
        svgEl.style.height = b.h ? `${Math.round(b.h)}px` : "auto";
        label.setText("100 %");
        centerView();
      };
      container.addEventListener("wheel", (ev) => {
        if (!ev.ctrlKey) return;
        ev.preventDefault();
        const rect = container.getBoundingClientRect();
        apply((state.z || 1) * (ev.deltaY < 0 ? 1.1 : 0.9), { x: ev.clientX - rect.left, y: ev.clientY - rect.top });
      }, { passive: false });
      let startDist = 0, startZ = 1, startAnchor = null;
      const dist = (touches) => Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
      const mid = (touches) => {
        const rect = container.getBoundingClientRect();
        return {
          x: (touches[0].clientX + touches[1].clientX) / 2 - rect.left,
          y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top
        };
      };
      container.addEventListener("touchstart", (ev) => {
        if (ev.touches.length === 2) {
          startDist = dist(ev.touches);
          startZ = state.z || 1;
          startAnchor = mid(ev.touches);
        }
      }, { passive: true });
      container.addEventListener("touchmove", (ev) => {
        if (ev.touches.length === 2 && startDist) {
          ev.preventDefault();
          apply(startZ * (dist(ev.touches) / startDist), startAnchor);
        }
      }, { passive: false });
      container.addEventListener("touchend", () => {
        startDist = 0;
        startAnchor = null;
      }, { passive: true });
      apply(state.z || 1);
      centerView();
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(centerView);
      setTimeout(centerView, 80);
    }
    function hull(points) {
      const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      if (pts.length < 3) return pts;
      const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      const lower = [];
      for (const p of pts) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
        lower.push(p);
      }
      const upper = [];
      for (const p of pts.slice().reverse()) {
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
        upper.push(p);
      }
      lower.pop();
      upper.pop();
      return lower.concat(upper);
    }
    function blobPath(points, pad) {
      if (!points.length) return "";
      if (points.length < 3) {
        const [x, y] = points[0];
        return `M ${(x - pad).toFixed(1)} ${y.toFixed(1)} a ${pad} ${pad} 0 1 0 ${pad * 2} 0 a ${pad} ${pad} 0 1 0 ${-pad * 2} 0`;
      }
      const centre = points.reduce((a, p) => [a[0] + p[0] / points.length, a[1] + p[1] / points.length], [0, 0]);
      const expanded = points.map(([x, y]) => {
        const dx = x - centre[0], dy = y - centre[1];
        const len = Math.hypot(dx, dy) || 1;
        return [x + dx / len * pad, y + dy / len * pad];
      });
      const h = hull(expanded);
      if (h.length < 3) {
        const [x, y] = h[0] || centre;
        return `M ${(x - pad).toFixed(1)} ${y.toFixed(1)} a ${pad} ${pad} 0 1 0 ${pad * 2} 0 a ${pad} ${pad} 0 1 0 ${-pad * 2} 0`;
      }
      let d = `M ${h[0][0].toFixed(1)} ${h[0][1].toFixed(1)}`;
      for (let i = 0; i < h.length; i++) {
        const p0 = h[(i - 1 + h.length) % h.length], p1 = h[i];
        const p2 = h[(i + 1) % h.length], p3 = h[(i + 2) % h.length];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      return d + " Z";
    }
    var esc2 = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    module2.exports = { iconButton: iconButton2, setButtonIcon, textIconButton, clean, asList, esc: esc2, hull, blobPath, attachGraphHover, attachZoom };
    function iconButton2(parent, icon, title, onClick, cls) {
      const btn = parent.createEl("button", {
        cls: `cg-icon-btn ${cls || ""}`.trim(),
        attr: { title: title || "", "aria-label": title || "", type: "button" }
      });
      btn.dataset.icon = icon;
      try {
        setIcon(btn, icon);
      } catch (e) {
        btn.setText("");
      }
      if (onClick) btn.onclick = onClick;
      return btn;
    }
    function setButtonIcon(btn, icon, title) {
      btn.empty();
      btn.dataset.icon = icon;
      try {
        setIcon(btn, icon);
      } catch (e) {
      }
      if (title) {
        btn.setAttribute("title", title);
        btn.setAttribute("aria-label", title);
      }
      return btn;
    }
    function textIconButton(parent, icon, label, onClick, cls) {
      const btn = parent.createEl("button", { cls: `cg-btn cg-text-btn ${cls || ""}`.trim(), attr: { type: "button" } });
      const ico = btn.createSpan({ cls: "cg-btn-ico" });
      try {
        setIcon(ico, icon);
      } catch (e) {
      }
      btn.createSpan({ cls: "cg-btn-label", text: label });
      if (onClick) btn.onclick = onClick;
      return btn;
    }
  }
});

// src/markdown.js
var require_markdown = __commonJS({
  "src/markdown.js"(exports2, module2) {
    function ghostFrontmatter2(name, source, field, sourceFm, today) {
      const back = field === "kinder" ? "eltern" : field === "eltern" ? "kinder" : field || null;
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
            if (cur) {
              cur.end = i;
              out.push(cur);
            }
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
        text: lines.slice(s.start + 1, s.end).join("\n").trim()
      }));
    }
    function parseJournal2(text) {
      const src = String(text || "");
      const blocks = src.split(/\n(?=###\s)/).filter((b) => /^###\s/.test(b.trim()));
      const out = [];
      for (const b of blocks) {
        const lines = b.split("\n");
        const head = lines[0].replace(/^###\s*/, "");
        const parts = head.split("\xB7").map((s) => s.trim());
        const meta = {};
        let i = 1;
        for (; i < lines.length; i++) {
          if (!lines[i].trim()) {
            i++;
            break;
          }
          const mm = lines[i].match(/^(Beteiligt|Notiz|Zusammenfassung|Ort)\s*:\s*(.*)$/i);
          if (!mm) break;
          meta[mm[1].toLowerCase()] = mm[2].trim();
        }
        out.push({
          date: parts[0] || "",
          typ: parts[1] || "",
          titel: parts.slice(2).join(" \xB7 ") || "",
          meta,
          body: lines.slice(i).join("\n").trim(),
          raw: b.trim()
        });
      }
      return out;
    }
    function formatJournal2(e) {
      const head = `### ${e.date}${e.typ ? " \xB7 " + e.typ : ""}${e.titel ? " \xB7 " + e.titel : ""}`;
      const lines = [head];
      if (e.meta && e.meta.beteiligt) lines.push(`Beteiligt: ${e.meta.beteiligt}`);
      if (e.meta && e.meta.ort) lines.push(`Ort: ${e.meta.ort}`);
      if (e.meta && e.meta.notiz) lines.push(`Notiz: ${e.meta.notiz}`);
      if (e.meta && e.meta.zusammenfassung) lines.push(`Zusammenfassung: ${e.meta.zusammenfassung}`);
      const body = (e.body || "").trim();
      if (body) lines.push("", body);
      return lines.join("\n");
    }
    var GIFT_KEYS = {
      beschreibung: "description",
      description: "description",
      link: "link",
      preis: "price",
      price: "price",
      erledigt: "done",
      done: "done"
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
    module2.exports = { readFrontmatter: readFrontmatter2, ghostFrontmatter: ghostFrontmatter2, scanSections, parseJournal: parseJournal2, formatJournal: formatJournal2, parseGifts, formatGift };
    function readFrontmatter2(text) {
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
  }
});

// src/store.js
var require_store = __commonJS({
  "src/store.js"(exports2, module2) {
    var { clean } = require_util();
    var { LEGACY_FIELDS, DEFAULT_SECTIONS, sectionHeading, canonicalHeading } = require_constants();
    var { scanSections } = require_markdown();
    var ContactStore = class {
      constructor(app, getSettings, resolveType) {
        this.app = app;
        this.getSettings = getSettings;
        this.resolveType = resolveType || (() => null);
      }
      get settings() {
        return this.getSettings() || {};
      }
      get folder() {
        return this.settings.folder || "20_Areas/24_Contacts";
      }
      path(name) {
        return `${this.folder}/${name}.md`;
      }
      file(name) {
        return this.app.vault.getAbstractFileByPath(this.path(name));
      }
      exists(name) {
        return !!this.file(name);
      }
      async read(name) {
        const file = this.file(name);
        return file ? this.app.vault.read(file) : "";
      }
      async patchFrontmatter(name, fn) {
        const file = this.file(name);
        if (!file) return false;
        await this.app.fileManager.processFrontMatter(file, (fm) => {
          const migrated = [];
          for (const [oldKey, newKey] of Object.entries(LEGACY_FIELDS)) {
            if (fm[newKey] === void 0 && fm[oldKey] !== void 0) {
              fm[newKey] = fm[oldKey];
              migrated.push(oldKey);
            }
          }
          fn(fm);
          for (const key of migrated) if (fm[key] !== void 0) delete fm[key];
          fm.updated = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        });
        return true;
      }
      /* Beziehung in beide Richtungen eintragen */
      async addRelation(source, field, target) {
        const type = this.resolveType(field);
        const inverse = type && type.inverse ? type.inverse : field;
        const write = async (a, f, b) => this.patchFrontmatter(a, (fm) => {
          const cur = fm[f];
          const flat = Array.isArray(cur) ? cur.flat(Infinity) : cur === void 0 || cur === null || cur === "" ? [] : [cur];
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
          nachname: parts[parts.length - 1]
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
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const fm = { type: "contact", created: today, updated: today, first_name: vorname, last_name: nachname };
        if (weitere) fm.aliases = weitere;
        const body = "---\n" + Object.entries(fm).map(([k, v]) => `${k}: ${v}`).join("\n") + "\n---\n\n```contact-card\n```\n";
        await this.app.vault.create(this.path(cleanName), body);
        return true;
      }
      async setImage(name, file) {
        const ext = (String(file.name || "").split(".").pop() || "png").toLowerCase();
        const dir = `${this.folder}/Anh\xE4nge`;
        const target = `${dir}/${name}.${ext}`;
        const buf = await file.arrayBuffer();
        const adapter = this.app.vault.adapter;
        if (adapter && typeof adapter.exists === "function" && !await adapter.exists(dir)) {
          await this.app.vault.createFolder(dir).catch(() => {
          });
        }
        const existing = this.app.vault.getAbstractFileByPath(target);
        if (existing) await this.app.vault.modifyBinary(existing, buf);
        else await this.app.vault.createBinary(target, buf);
        return this.patchFrontmatter(name, (fm) => {
          fm.image = `[[${name}.${ext}]]`;
          if (!fm.image_position) fm.image_position = "50% 50%";
          if (fm.image_scale === void 0) fm.image_scale = 1;
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
          const blocks = [];
          let current = null;
          for (const line of lines) {
            if (/^\s*```/.test(line)) {
              fence = !fence;
            }
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
          const merged = /* @__PURE__ */ new Map();
          const out = [];
          for (const block of blocks) {
            if (!block.title) {
              out.push(block);
              continue;
            }
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
            if (!block.title) {
              rebuilt.push(...block.lines);
              continue;
            }
            const tail = rebuilt.length ? rebuilt[rebuilt.length - 1] : "";
            if (tail !== "" && tail !== void 0) rebuilt.push("");
            rebuilt.push(`## ${block.title}`, ...block.lines);
          }
          return rebuilt.join("\n");
        });
        return changed;
      }
      async fmOf(name) {
        const file = this.file(name);
        if (!file) return {};
        try {
          return readFrontmatter(await this.app.vault.read(file));
        } catch (e) {
          return {};
        }
      }
      /* Kontakte mit gleichem Vor- und Nachnamen */
      findByName(fullName) {
        const norm = (v) => String(v || "").trim().toLowerCase();
        const target = String(fullName || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
        const hits = [];
        for (const file of this.app.vault.getMarkdownFiles()) {
          if (this.folder && !file.path.startsWith(`${this.folder}/`)) continue;
          const cache = this.app.metadataCache.getFileCache(file);
          const fm = cache && cache.frontmatter || {};
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
            return content.replace(/\s*$/, "") + `

## ${title}
${body ? "\n" + body + "\n" : ""}`;
          }
          const block = [`## ${title}`, ""];
          if (body) block.push(body, "");
          return [...lines.slice(0, sec.start), ...block, ...lines.slice(sec.end)].join("\n").replace(/\n{3,}/g, "\n\n");
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
          return [...lines.slice(0, sec.start), ...lines.slice(sec.end)].join("\n").replace(/\n{3,}/g, "\n\n");
        });
        return true;
      }
      /* ---------- Vervollständigung anwenden ---------- */
      async applyCompletion(plan) {
        const byNote = /* @__PURE__ */ new Map();
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
                const flat = Array.isArray(cur) ? cur.flat(Infinity) : cur === void 0 || cur === null || cur === "" ? [] : [cur];
                const arr = flat.map((x) => String(x)).filter(Boolean);
                const have = arr.map((x) => clean(x));
                for (const n of item.add) {
                  if (!have.includes(n)) {
                    arr.push(`[[${n}]]`);
                    added++;
                  }
                }
                fm[item.field] = arr;
              } else if (item.kind === "image") {
                if (!fm[item.field]) {
                  fm[item.field] = item.value;
                  added++;
                }
              } else if (item.kind === "kreis") {
                if (!fm.circle) {
                  fm.circle = item.value;
                  added++;
                }
              } else if (item.kind === "name") {
                if (item.field === "aliases") {
                  const cur = fm.aliases;
                  const arr = Array.isArray(cur) ? cur.slice() : cur ? [cur] : [];
                  if (!arr.includes(item.value)) {
                    arr.push(item.value);
                    added++;
                  }
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
    };
    module2.exports = { ContactStore };
  }
});

// src/graph.js
var require_graph = __commonJS({
  "src/graph.js"(exports2, module2) {
    var { SECTORS, SECTOR_PRIO, DEFAULT_REL_TYPES, relTypeByValue, normalizeGroup } = require_constants();
    var { asList } = require_util();
    function sectorOfField(field, relType) {
      const rt = relType ? relType(field) : null;
      const g = rt ? rt.group : null;
      if (g === "family") return "family";
      if (g === "friends") return "friends";
      if (g === "work") return "work";
      return "acquaintances";
    }
    function sectorLayout({ center, found, edges, notes, relType, W, H }) {
      const cx = W / 2, cy = H / 2;
      const names = [...found.keys()];
      const sectorOf = /* @__PURE__ */ new Map([[center, "family"]]);
      const kindSector = (kind, other) => {
        if (kind === "parent") return "family";
        if (kind === "relation") {
          const v = notes[other] && notes[other].fm && notes[other].fm.relation || "";
          const rt2 = v ? relTypeByValue(v) || (relType ? relType(String(v)) : null) : null;
          if (rt2) return sectorOfField(rt2.field, relType);
          return "acquaintances";
        }
        const rt = relType ? relType(kind) : null;
        return rt ? sectorOfField(rt.field, relType) : "acquaintances";
      };
      const directKinds = /* @__PURE__ */ new Map();
      for (const e of edges.values()) {
        if (e.from !== center && e.to !== center) continue;
        const other = e.from === center ? e.to : e.from;
        if (!directKinds.has(other)) directKinds.set(other, []);
        directKinds.get(other).push(e.kind);
      }
      for (const n of names) {
        if (n === center) continue;
        const info = found.get(n) || {};
        const path = info.path || [];
        const kinds = directKinds.get(n) || [];
        let sec;
        if (path.length <= 1 && kinds.length) {
          sec = "acquaintances";
          for (const k of kinds) {
            const s = kindSector(k, n);
            if (SECTOR_PRIO[s] < SECTOR_PRIO[sec]) sec = s;
          }
        } else {
          sec = kindSector(path[0], n);
        }
        sectorOf.set(n, sec);
      }
      const counts = { family: 0, friends: 0, work: 0, acquaintances: 0 };
      for (const n of names) if (n !== center) counts[sectorOf.get(n)]++;
      const present = SECTORS.filter((s) => counts[s.id] > 0);
      const minAngle = 0.55;
      let total = present.reduce((a2, s) => a2 + counts[s.id], 0) || 1;
      let angles = {};
      if (!present.length) {
        angles = { family: 2 * Math.PI };
      } else {
        let sum = 0;
        for (const s of present) {
          angles[s.id] = Math.max(minAngle, counts[s.id] / total * (2 * Math.PI - minAngle * present.length));
          sum += angles[s.id];
        }
        const scale = 2 * Math.PI / sum;
        for (const s of present) angles[s.id] *= scale;
      }
      const bounds = {};
      let a = -Math.PI / 2;
      for (const s of SECTORS) {
        const span = angles[s.id] || 0;
        bounds[s.id] = [a, a + span];
        a += span;
      }
      const pos = /* @__PURE__ */ new Map([[center, [cx, cy]]]);
      const family = names.filter((n) => n !== center && sectorOf.get(n) === "family");
      const famBounds = bounds.family || [0, 0];
      const aMid = (famBounds[0] + famBounds[1]) / 2;
      const ancBounds = [famBounds[0], aMid];
      const descBounds = [aMid, famBounds[1]];
      const genOf = /* @__PURE__ */ new Map();
      const famAdj = /* @__PURE__ */ new Map();
      for (const n of [center, ...family]) famAdj.set(n, []);
      for (const e of edges.values()) {
        const a2 = e.from, b2 = e.to;
        if (!famAdj.has(a2) || !famAdj.has(b2)) continue;
        if (e.kind === "parent") {
          famAdj.get(a2).push([b2, 1]);
          famAdj.get(b2).push([a2, -1]);
        } else if (["partner", "partner_ex", "geschwister", "stiefgeschwister"].includes(e.kind)) {
          famAdj.get(a2).push([b2, 0]);
          famAdj.get(b2).push([a2, 0]);
        }
      }
      genOf.set(center, 0);
      const queue = [center];
      for (let i = 0; i < queue.length; i++) {
        const n = queue[i];
        for (const [o, step] of famAdj.get(n) || []) {
          if (genOf.has(o)) continue;
          genOf.set(o, genOf.get(n) + step);
          queue.push(o);
        }
      }
      for (const n of family) if (!genOf.has(n)) genOf.set(n, 0);
      const baseR = 260, stepR = 140;
      const ancestors = family.filter((n) => genOf.get(n) < 0).sort((x, y) => genOf.get(y) - genOf.get(x));
      const descendants = family.filter((n) => genOf.get(n) > 0).sort((x, y) => genOf.get(x) - genOf.get(y));
      const same = family.filter((n) => genOf.get(n) === 0);
      const placeArc = (list, bounds2, rOffset) => {
        if (!list.length) return;
        const gens = [...new Set(list.map((n) => Math.abs(genOf.get(n))))].sort((x, y) => x - y);
        let idx = 0;
        for (const g of gens) {
          const group = list.filter((n) => Math.abs(genOf.get(n)) === g);
          const r = baseR + (g - 1) * stepR + (rOffset || 0);
          const span = bounds2[1] - bounds2[0];
          group.forEach((n, i) => {
            const ang = bounds2[0] + span * (i + 1) / (group.length + 1);
            pos.set(n, [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]);
          });
          idx += group.length;
        }
      };
      placeArc(ancestors, ancBounds, 0);
      placeArc(descendants, descBounds, 75);
      same.forEach((n, i) => {
        const span = famBounds[1] - famBounds[0];
        const ang = famBounds[0] + span * (i + 1) / (same.length + 1);
        pos.set(n, [cx + 120 * Math.cos(ang), cy + 120 * Math.sin(ang)]);
      });
      for (const sec of SECTORS) {
        if (sec.id === "family") continue;
        const list = names.filter((n) => n !== center && sectorOf.get(n) === sec.id);
        if (!list.length) continue;
        const [a0, a1] = bounds[sec.id];
        const span = a1 - a0;
        const minArc = 130;
        let idx = 0;
        let band = 0;
        while (idx < list.length) {
          const r = 170 + band * 120;
          const capacity = Math.max(1, Math.floor(span * r / minArc));
          const take = Math.min(capacity, list.length - idx);
          for (let i = 0; i < take; i++) {
            const ang = a0 + span * (i + 0.5) / take;
            const rr = r + (i % 2 ? 24 : -24);
            pos.set(list[idx + i], [cx + rr * Math.cos(ang), cy + rr * Math.sin(ang)]);
          }
          idx += take;
          band++;
        }
      }
      const minD = 115;
      const others = names.filter((n) => n !== center);
      for (let it = 0; it < 160; it++) {
        let moved = false;
        for (let i = 0; i < others.length; i++) {
          for (let j = i + 1; j < others.length; j++) {
            const a2 = others[i], b2 = others[j];
            const A = pos.get(a2), B = pos.get(b2);
            let dx = B[0] - A[0], dy = B[1] - A[1];
            let d = Math.hypot(dx, dy);
            if (d >= minD) continue;
            if (d < 0.01) {
              dx = Math.cos(i + j);
              dy = Math.sin(i + j);
              d = 0.01;
            }
            const f = (minD - d) / d * 0.52;
            A[0] -= dx * f;
            A[1] -= dy * f;
            B[0] += dx * f;
            B[1] += dy * f;
            moved = true;
          }
        }
        if (!moved) break;
        for (const n of others) {
          const P = pos.get(n);
          let ang = Math.atan2(P[1], P[0]);
          let r = Math.hypot(P[0], P[1]);
          const b = bounds[sectorOf.get(n)];
          if (b && b[1] - b[0] > 1e-3) {
            const m2 = 0.05;
            while (ang < b[0] + m2) ang += 2 * Math.PI;
            while (ang > b[1] - m2) ang -= 2 * Math.PI;
          }
          r = Math.max(90, r);
          pos.set(n, [r * Math.cos(ang), r * Math.sin(ang)]);
        }
      }
      let maxR = 0;
      for (const p of pos.values()) maxR = Math.max(maxR, Math.hypot(p[0] - cx, p[1] - cy));
      return { pos, cx, cy, bounds, sectorOf, counts, maxR };
    }
    var GraphBuilder = class {
      constructor(app, getSettings) {
        this.app = app;
        this.getSettings = getSettings;
        this._cache = null;
        this._cacheAt = 0;
      }
      get settings() {
        return this.getSettings() || {};
      }
      invalidate() {
        this._cache = null;
        this._cacheAt = 0;
      }
      contacts() {
        const notes = {};
        for (const f of this.app.vault.getMarkdownFiles()) {
          if (!f.path.startsWith(this.settings.folder + "/")) continue;
          if (this.settings.exclude && f.path.toLowerCase().includes(this.settings.exclude.toLowerCase())) continue;
          const cache = this.app.metadataCache.getFileCache(f);
          notes[f.basename] = { file: f, fm: cache && cache.frontmatter || {} };
        }
        return notes;
      }
      buildGraph() {
        const now = Date.now();
        if (this._cache && this._cacheAt && now - this._cacheAt < 1500) return this._cache;
        const notes = this.contacts();
        const self = this.settings.selfNote;
        const rel = {};
        const ensure = (n) => {
          if (!rel[n]) rel[n] = { partner: [], parents: [], children: [], siblings: [], relation: [] };
          for (const rt of this.settings.relTypes || DEFAULT_REL_TYPES) {
            if (!rel[n][rt.field]) rel[n][rt.field] = [];
          }
          return rel[n];
        };
        for (const name of Object.keys(notes)) {
          const e = ensure(name);
          const allFields = (this.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field).concat(["partner", "parents", "children", "siblings"]);
          for (const f of [...new Set(allFields)]) {
            e[f] = asList(notes[name].fm[f]).filter((target) => {
              if (!(target in notes)) {
                notes[target] = { ghost: true, fm: {} };
                ensure(target);
              }
              return true;
            });
          }
        }
        const link = (a, b, f1, f2) => {
          if (!a || !b || a === b) return;
          ensure(a);
          ensure(b);
          if (!rel[a][f1].includes(b)) rel[a][f1].push(b);
          if (!rel[b][f2].includes(a)) rel[b][f2].push(a);
        };
        for (const name of Object.keys(rel)) {
          for (const p of [...rel[name].parents]) link(name, p, "parents", "children");
          for (const k of [...rel[name].children]) link(name, k, "children", "parents");
          for (const sib of [...rel[name].siblings]) link(name, sib, "siblings", "siblings");
          for (const pa of [...rel[name].partner]) link(name, pa, "partner", "partner");
          for (const rt of this.settings.relTypes || DEFAULT_REL_TYPES) {
            if (["partner", "parents", "children", "siblings"].includes(rt.field)) continue;
            const inv = rt.inverse || rt.field;
            for (const other of [...rel[name][rt.field] || []]) link(name, other, rt.field, inv);
          }
        }
        for (const name of Object.keys(notes)) {
          const v = notes[name].fm.relation;
          if (v) link(self, name, "relation", "relation");
        }
        this._cache = { notes, rel, self };
        this._cacheAt = Date.now();
        return this._cache;
      }
      walk(rel, notes, center, depth, familyOnly) {
        const FAMILY = /* @__PURE__ */ new Set([
          "partner",
          "partner_ex",
          "parents",
          "children",
          "siblings",
          "step_parents",
          "step_children",
          "step_siblings",
          "relatives",
          "grandparents"
        ]);
        const famOnly = familyOnly === void 0 ? this.settings.expandFamily !== false : familyOnly;
        const familyReach = /* @__PURE__ */ new Map([[center, true]]);
        const found = /* @__PURE__ */ new Map([[center, { depth: 0, path: [], parent: null }]]);
        const edges = /* @__PURE__ */ new Map();
        const enabled = this.settings.types;
        const addEdge = (a, b, kind) => {
          if (!a || !b || a === b) return;
          let key, from = a, to = b, type = kind;
          if (kind === "parents" || kind === "children") {
            const parent = kind === "parents" ? b : a;
            const child = kind === "children" ? a : b;
            from = parent;
            to = child;
            type = "parent";
            key = `parent:${parent}|${child}`;
          } else {
            const s = [a, b].sort();
            key = `${kind}:${s[0]}|${s[1]}`;
            from = s[0];
            to = s[1];
          }
          const t = enabled[kind] || enabled[type];
          if (t && t.enabled === false) return;
          if (!edges.has(key)) edges.set(key, { from, to, kind: type });
        };
        let frontier = [center];
        for (let d = 1; d <= depth; d++) {
          const next = [];
          for (const name of frontier) {
            if (name === this.settings.selfNote && center !== this.settings.selfNote) continue;
            if (famOnly && !familyReach.get(name)) continue;
            const data = rel[name] || {};
            const kinds = (this.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field).concat(["relation"]);
            for (const kind of kinds) {
              for (const other of data[kind] || []) {
                if (other === name || !(other in notes)) continue;
                const famNext = !!familyReach.get(name) && FAMILY.has(kind);
                const allowed = !famOnly || famNext || d === 1;
                if (!allowed) continue;
                addEdge(name, other, kind);
                if (!found.has(other)) {
                  found.set(other, { depth: d, path: [...found.get(name).path, kind], parent: name });
                  familyReach.set(other, famNext);
                  next.push(other);
                }
              }
            }
          }
          frontier = next;
          if (!frontier.length) break;
        }
        return { found, edges };
      }
      planCompletion() {
        const REL_FIELDS = [...new Set((this.settings.relTypes || DEFAULT_REL_TYPES).map((r) => r.field))].concat(["grandparents"]);
        const notes = this.contacts();
        const raw = {};
        for (const name of Object.keys(notes)) {
          if (notes[name].ghost) continue;
          raw[name] = {};
          for (const f of REL_FIELDS) raw[name][f] = asList(notes[name].fm[f]);
        }
        const know = (n) => raw[n] !== void 0;
        const want = {};
        for (const name of Object.keys(raw)) {
          want[name] = {};
          for (const f of REL_FIELDS) want[name][f] = new Set(raw[name][f]);
        }
        const addTo = (name, field, value) => {
          if (!know(name) || !know(value) || name === value) return false;
          if (want[name][field].has(value)) return false;
          want[name][field].add(value);
          return true;
        };
        for (let pass = 0; pass < 6; pass++) {
          let changed = false;
          for (const name of Object.keys(raw)) {
            for (const p of [...want[name].parents]) {
              if (addTo(p, "children", name)) changed = true;
              for (const g of want[p] ? want[p].parents : []) if (addTo(name, "grandparents", g)) changed = true;
            }
            for (const c of [...want[name].children]) {
              if (addTo(c, "parents", name)) changed = true;
              for (const g of want[name].parents) if (addTo(c, "grandparents", g)) changed = true;
            }
            for (const p of [...want[name].partner]) if (addTo(p, "partner", name)) changed = true;
            for (const sib of [...want[name].siblings]) {
              if (!know(sib)) continue;
              if (addTo(sib, "siblings", name)) changed = true;
              for (const p of want[name].parents) if (addTo(sib, "parents", p)) changed = true;
              for (const p of want[sib].parents) if (addTo(name, "parents", p)) changed = true;
            }
          }
          if (!changed) break;
        }
        const plan = [];
        for (const name of Object.keys(want)) {
          for (const f of REL_FIELDS) {
            const add = [...want[name][f]].filter((x) => !raw[name][f].includes(x));
            if (add.length) plan.push({ kind: "relation", name, field: f, add: add.sort() });
          }
        }
        for (const item of this.auxIssues(notes)) plan.push(item);
        return plan;
      }
      /* Kreis: neues Feld circle, altes kreis wird mitgelesen */
      kreisOf(name, notes) {
        const fm = notes[name] && notes[name].fm || {};
        const field = this.settings.kreisField || "circle";
        const raw = fm[field];
        if (raw !== void 0 && raw !== null && raw !== "") {
          const list = asList(raw).map(normalizeGroup).filter(Boolean);
          if (list.length) return list;
        }
        if (this.settings.kreisFallback === false) return [];
        const auto = this.autoMeta ? this.autoMeta(name) : null;
        if (auto && auto.group) return [auto.group];
        if (["partner", "eltern", "kinder", "geschwister"].some((f) => asList(fm[f]).length)) return ["family"];
        return ["none"];
      }
      autoMeta(name) {
        const me = this.settings.selfNote;
        if (!name || name === me) return null;
        const { rel } = this.buildGraph();
        const mine = rel[me] || {};
        const order = ["family", "friends", "work", "neighborhood", "acquaintances", "other"];
        let best = null;
        for (const rt of this.settings.relTypes || DEFAULT_REL_TYPES) {
          if (rt.field === "relation") continue;
          if (!(mine[rt.field] || []).includes(name)) continue;
          const rank = order.indexOf(rt.group);
          if (!best || rank < best.rank) {
            best = { field: rt.field, key: rt.key, label: rt.n, group: rt.group, rank: rank < 0 ? 99 : rank };
          }
        }
        return best;
      }
      auxIssues(notes) {
        const folder = this.settings.folder;
        const images = /* @__PURE__ */ new Map();
        for (const f of this.app.vault.getFiles()) {
          if (!f.path.startsWith(`${folder}/Anh\xE4nge/`)) continue;
          if (!/\.(png|jpe?g|webp)$/i.test(f.name)) continue;
          images.set(f.name.toLowerCase(), f.name);
        }
        const out = [];
        const byPair = /* @__PURE__ */ new Map();
        for (const n of Object.keys(notes)) {
          if (notes[n].ghost) continue;
          const fm = notes[n].fm || {};
          const pair = `${String(fm.first_name || "").toLowerCase()} ${String(fm.last_name || "").toLowerCase()}`.trim();
          if (!pair) continue;
          if (!byPair.has(pair)) byPair.set(pair, []);
          byPair.get(pair).push(n);
        }
        for (const [pair, list] of byPair) {
          if (list.length < 2) continue;
          for (const n of list) {
            out.push({ kind: "duplicate_name", name: n, field: "__name", value: pair, action: "warn", others: list.filter((x) => x !== n) });
          }
        }
        for (const name of Object.keys(notes)) {
          if (notes[name].ghost) continue;
          const fm = notes[name].fm || {};
          const declared = [fm.image, fm.image_embedded].find(Boolean);
          if (!declared) {
            const hit = [".png", ".jpg", ".jpeg", ".webp"].map((ext) => images.get((name + ext).toLowerCase())).find(Boolean);
            if (hit) out.push({ kind: "image", name, field: "image", value: `[[${hit}]]`, action: "set" });
          } else {
            const m = String(declared).match(/\[\[([^\]|]+)/);
            const target = m ? m[1].trim() : String(declared).trim();
            if (target && !images.has(target.toLowerCase())) {
              out.push({ kind: "image", name, field: "image", value: target, action: "missing" });
            }
          }
          const derived = this.kreisOf(name, notes).filter((k) => k !== "none");
          if (!fm.circle && derived.length) {
            out.push({ kind: "kreis", name, field: "circle", value: derived[0], action: "set" });
          }
          if (!fm.relation) {
            const meta = this.autoMeta(name);
            if (meta && meta.label) {
              out.push({ kind: "name", name, field: "relation", value: meta.key || meta.label, action: "set" });
            }
          }
          const parts = name.trim().split(/\s+/);
          const nachname = parts.length > 1 ? parts[parts.length - 1] : "";
          const vorname = parts.length > 1 ? parts.slice(0, -1).join(" ") : parts[0];
          if (!fm.first_name && vorname) out.push({ kind: "name", name, field: "first_name", value: vorname, action: "set" });
          if (!fm.last_name && nachname) out.push({ kind: "name", name, field: "last_name", value: nachname, action: "set" });
          const aliases = asList(fm.aliases);
          if (!aliases.length && vorname && vorname !== name) {
            out.push({ kind: "name", name, field: "aliases", value: vorname, action: "set" });
          }
        }
        return out;
      }
    };
    module2.exports = { sectorOfField, sectorLayout, GraphBuilder };
  }
});

// src/modals.js
var require_modals = __commonJS({
  "src/modals.js"(exports2, module2) {
    var { t: tr2 } = require_i18n();
    var { Notice, Modal, MarkdownRenderer } = require("obsidian");
    var { DEFAULT_REL_TYPES, DEFAULT_SECTIONS, SECTORS, kreisDefaultValues, FIELD_LABEL, sectionHeading, sectionLabel, groupLabel } = require_constants();
    var { clean, asList, iconButton: iconButton2, setButtonIcon, textIconButton } = require_util();
    var { parseJournal: parseJournal2, formatJournal: formatJournal2, parseGifts, formatGift } = require_markdown();
    var ImageModal = class extends Modal {
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
        el.createEl("h3", { text: tr2("image.title") });
        if (!this.name) {
          el.createEl("div", { cls: "cg-chip-empty", text: tr2("ui.needName") });
          return;
        }
        const fm = await this.readFm();
        this.position = String(fm.image_position || "50% 50%");
        this.scale = Number(fm.image_scale) || 1;
        this.current = fm.image ? String(fm.image) : "";
        const editor = el.createDiv({ cls: "cg-image-editor" });
        const stage = editor.createDiv({ cls: "cg-crop-stage" });
        const crop = stage.createDiv({ cls: "cg-crop cg-crop-large" });
        editor.createEl("div", { cls: "cg-crop-hint", text: tr2("image.positionHint") });
        const paint = () => {
          const m2 = this.current ? String(this.current).match(/\[\[([^\]|]+)/) : null;
          const target = m2 ? this.app.metadataCache.getFirstLinkpathDest(m2[1].trim(), "") : null;
          const url = this.pending ? this.pending.url : target ? this.plugin.app.vault.adapter.getResourcePath(target.path) : "";
          crop.style.backgroundImage = url ? `url("${url}")` : "none";
          crop.style.backgroundPosition = this.position;
          const pct = `${Math.round(this.scale * 100)}%`;
          crop.style.backgroundSize = `${pct} ${pct}`;
          crop.classList.toggle("cg-crop-empty", !url);
        };
        paint();
        const pointers = /* @__PURE__ */ new Map();
        let drag = null;
        let pinch = null;
        const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
        const pan = (dx, dy) => {
          if (!drag) return;
          const rect = crop.getBoundingClientRect ? crop.getBoundingClientRect() : { width: 220, height: 220 };
          const w = rect.width || 220;
          const h = rect.height || 220;
          const base = String(drag.pos).split(/\s+/).map((v) => parseFloat(v) || 50);
          const x = clamp(base[0] - (dx + (drag.dx || 0)) / w * 100, 0, 100);
          const y = clamp(base[1] - (dy + (drag.dy || 0)) / h * 100, 0, 100);
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
          if (crop.setPointerCapture) {
            try {
              crop.setPointerCapture(ev.pointerId);
            } catch (e) {
            }
          }
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
          if (pointers.size >= 2) {
            applyPinch();
            return;
          }
          if (drag) pan(ev.clientX - drag.x, ev.clientY - drag.y);
        };
        const release = (ev) => {
          pointers.delete(ev.pointerId);
          if (pointers.size === 0) {
            drag = null;
            pinch = null;
          } else if (pointers.size === 1) {
            const rest = [...pointers.values()][0];
            drag = { x: rest.x, y: rest.y, pos: this.position };
            pinch = null;
          }
        };
        crop.onpointerup = release;
        crop.onpointercancel = release;
        crop.onpointerleave = (ev) => {
          if (!crop.hasPointerCapture || !crop.hasPointerCapture(ev.pointerId)) release(ev);
        };
        crop.onwheel = (ev) => {
          if (ev.preventDefault) ev.preventDefault();
          this.scale = clamp(this.scale + (ev.deltaY < 0 ? 0.1 : -0.1), 1, 3);
          zoom.value = String(this.scale);
          paint();
        };
        const zoomRow = el.createDiv({ cls: "cg-form-row" });
        zoomRow.createEl("label", { text: tr2("image.zoom"), cls: "cg-form-label" });
        const zoom = zoomRow.createEl("input", { attr: { type: "range", min: "1", max: "3", step: "0.05" }, cls: "cg-zoom" });
        zoom.value = String(this.scale);
        zoom.oninput = () => {
          this.scale = Number(zoom.value) || 1;
          paint();
        };
        const bar1 = el.createDiv({ cls: "cg-bar" });
        const pick = bar1.createEl("button", { cls: "cg-btn", text: tr2("image.choose") });
        const reset = bar1.createEl("button", { cls: "cg-btn", text: tr2("image.reset") });
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
        const save = bar2.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr2("ui.save") });
        const cancel = bar2.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
        cancel.onclick = () => this.close();
        save.onclick = async () => {
          try {
            if (this.pending) {
              const ok = await this.plugin.store.setImage(this.name, this.pending.file);
              if (!ok) {
                new Notice(tr2("image.failed"));
                return;
              }
            }
            await this.plugin.store.patchFrontmatter(this.name, (f) => {
              f.image_position = this.position;
              f.image_scale = Number(this.scale.toFixed(2));
            });
            new Notice(tr2("image.saved"));
            this.close();
            if (this.after) this.after();
            this.plugin.refreshAll();
          } catch (err) {
            new Notice(`${tr2("image.failed")}: ${err && err.message ? err.message : err}`);
          }
        };
      }
      async readFm() {
        const file = this.plugin.app.vault.getAbstractFileByPath(`${this.plugin.settings.folder}/${this.name}.md`);
        if (!file) return {};
        const cache = this.plugin.app.metadataCache.getFileCache(file);
        return cache && cache.frontmatter || {};
      }
    };
    var GiftModal = class extends Modal {
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
        el.createEl("h3", { text: this.gift ? tr2("gifts.edit") : tr2("gifts.new", { title: tr2("sections.gifts") }) });
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
        const titleI = textRow(tr2("field.giftTitle"), g.title, "LEGO Technic 42100");
        const priceI = textRow(tr2("field.giftPrice"), g.price, "49,99 \u20AC");
        const linkI = textRow(tr2("field.giftLink"), g.link, "https://\u2026");
        const descRow = wrap.createDiv({ cls: "cg-form-row cg-form-col" });
        descRow.createEl("label", { text: tr2("field.giftDescription"), cls: "cg-form-label" });
        const descT = descRow.createEl("textarea", { cls: "cg-form-input" });
        descT.rows = 3;
        descT.value = g.description || "";
        const doneRow = wrap.createDiv({ cls: "cg-form-row" });
        doneRow.createEl("label", { text: tr2("gifts.done"), cls: "cg-form-label" });
        const doneCb = doneRow.createEl("input", { attr: { type: "checkbox" } });
        doneCb.checked = !!g.done;
        const bar = el.createDiv({ cls: "cg-bar" });
        const save = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr2("ui.save") });
        const cancel = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
        cancel.onclick = () => this.close();
        save.onclick = async () => {
          const title = titleI.value.trim();
          if (!title) {
            new Notice(tr2("gifts.needTitle"));
            return;
          }
          const next = {
            title,
            description: descT.value.trim(),
            link: linkI.value.trim(),
            price: priceI.value.trim(),
            done: doneCb.checked ? g.done || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : ""
          };
          const current = parseGifts(await this.view.readSection(this.name, sectionHeading(this.sec)));
          if (this.gift && this.index >= 0) current[this.index] = next;
          else current.push(next);
          await this.view.writeSection(this.name, sectionHeading(this.sec), current.map(formatGift).join("\n\n"));
          new Notice(tr2("gifts.saved"));
          this.close();
          if (this.after) this.after();
          this.view.refresh();
        };
        titleI.focus();
      }
    };
    var ConfirmModal = class extends Modal {
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
        const no = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
        ok.onclick = async () => {
          this.close();
          if (this.onOk) await this.onOk();
        };
        no.onclick = () => this.close();
      }
    };
    var JournalEntryModal = class extends Modal {
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
        el.createEl("h3", { text: e ? tr2("journal.edit") : tr2("journal.new", { title: tr2("sections.journal") }) });
        const wrap = el.createDiv({ cls: "cg-form" });
        const row = (label, value, placeholder) => {
          const r = wrap.createDiv({ cls: "cg-form-row" });
          r.createEl("label", { text: label, cls: "cg-form-label" });
          const i = r.createEl("input", { type: "text", cls: "cg-form-input" });
          i.value = value || "";
          if (placeholder) i.placeholder = placeholder;
          return i;
        };
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const filterTyp = String(this.sec.filter || "").split(",")[0].trim();
        const dateI = row(tr2("field.date"), e ? e.date : today, "2026-11-17");
        const typI = row(tr2("field.type"), e ? e.typ : filterTyp, "Besprechung, Telefonat, Treffen \u2026");
        const typList = el.createEl("datalist", { attr: { id: "cg-jl-typ" } });
        const known = /* @__PURE__ */ new Set(["Besprechung", "Telefonat", "Treffen", tr2("field.email"), "Nachricht", "Notiz"]);
        for (const t of [...known].sort()) typList.createEl("option", { value: t });
        typI.setAttribute("list", "cg-jl-typ");
        const titelI = row(tr2("field.title"), e ? e.titel : "", "Worum ging es?");
        const betI = row(tr2("field.participants"), e ? e.meta.beteiligt || "" : "", "[[Name]], [[Name]]");
        betI.setAttribute("list", "cg-dl-contacts");
        const notizI = row(tr2("ui.linkedNote"), e ? e.meta.notiz || "" : "", "[[Besprechung 2026-11-17]]");
        const ortI = row(tr2("field.place"), e ? e.meta.ort || "" : "", "optional");
        const sumRow = wrap.createDiv({ cls: "cg-form-row cg-form-col" });
        sumRow.createEl("label", { text: tr2("field.summary"), cls: "cg-form-label" });
        const sumT = sumRow.createEl("textarea", { cls: "cg-form-input" });
        sumT.rows = 2;
        sumT.value = e ? e.meta.zusammenfassung || "" : "";
        const bodyRow = wrap.createDiv({ cls: "cg-form-row cg-form-col" });
        bodyRow.createEl("label", { text: tr2("field.notes"), cls: "cg-form-label" });
        const bodyT = bodyRow.createEl("textarea", { cls: "cg-form-input" });
        bodyT.rows = 5;
        bodyT.value = e ? e.body || "" : "";
        const link = (v) => String(v || "").split(",").map((s) => s.trim()).filter(Boolean).map((s) => s.startsWith("[[") ? s : `[[${s}]]`).join(", ");
        const bar = el.createDiv({ cls: "cg-bar" });
        const save = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr2("ui.save") });
        const cancel = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
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
              zusammenfassung: sumT.value.trim()
            },
            body: bodyT.value.trim()
          };
          const current = parseJournal2(await this.view.readSection(this.name, sectionHeading(this.sec)));
          let list;
          if (this.entry && this.entryIndex >= 0) list = current.map((x, i) => i === this.entryIndex ? next : x);
          else list = current.concat([next]);
          list.sort((a, b) => String(b.date).localeCompare(String(a.date)));
          await this.view.writeSection(this.name, sectionHeading(this.sec), list.map(formatJournal2).join("\n\n"));
          new Notice("Eintrag gespeichert");
          this.close();
          if (this.after) this.after();
          this.view.refresh();
        };
        dateI.focus();
      }
    };
    var PresetModal = class extends Modal {
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
        const ok = row.createEl("button", { text: tr2("ui.save"), cls: "cg-btn on" });
        const cancel = row.createEl("button", { text: tr2("ui.cancel"), cls: "cg-btn" });
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
    };
    var CompletionModal = class extends Modal {
      constructor(app, plugin, plan) {
        super(app);
        this.plugin = plugin;
        this.plan = plan;
      }
      onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h3", { text: tr2("ui.commandCompleteContacts") });
        const sections = [
          { kind: "relation", title: "Beziehungen" },
          { kind: "kreis", title: "Kreise" },
          { kind: "image", title: "Profilbilder" },
          { kind: "name", title: tr2("ui.groupNames") },
          { kind: "duplicate_name", title: tr2("ui.groupDuplicates") }
        ];
        const byNote = /* @__PURE__ */ new Map();
        let appliable = 0, warnings = 0;
        for (const item of this.plan) {
          if (!byNote.has(item.name)) byNote.set(item.name, []);
          byNote.get(item.name).push(item);
          if (item.action === "missing" || item.action === "warn") warnings++;
          else appliable++;
        }
        contentEl.createEl("p", {
          cls: "setting-item-description",
          text: `${appliable} Erg\xE4nzungen in ${byNote.size} Notizen` + (warnings ? ` \xB7 ${warnings} Hinweise ohne \xC4nderung` : "") + ". Es wird nur hinzugef\xFCgt, nichts entfernt."
        });
        this.boxes = [];
        const list = contentEl.createDiv({ cls: "cg-plan" });
        for (const { kind, title } of sections) {
          const entries = [...byNote.entries()].map(([name, items]) => [name, items.filter((i) => i.kind === kind)]).filter(([, items]) => items.length).sort((a, b) => a[0].localeCompare(b[0]));
          if (!entries.length) continue;
          list.createEl("h4", { text: title, cls: "cg-plan-head" });
          for (const [name, items] of entries) {
            const row = list.createDiv({ cls: "cg-plan-row" });
            const fixable = items.filter((i) => i.action !== "missing");
            let cb = null;
            if (fixable.length) {
              cb = row.createEl("input", { type: "checkbox" });
              cb.checked = kind !== "name";
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
                  text: item.action === "missing" ? `Bild fehlt: ${item.value}` : `Bild setzen: ${item.value}`
                });
              } else {
                text.createEl("div", { cls: "cg-plan-item", text: `${item.field} = ${item.value}` });
              }
            }
          }
        }
        const bar = contentEl.createDiv({ cls: "cg-bar" });
        const all = bar.createEl("button", { text: "alle / keine", cls: "cg-btn" });
        all.onclick = () => {
          const anyOff = this.boxes.some((b) => !b.checked);
          this.boxes.forEach((b) => {
            b.checked = anyOff;
          });
        };
        const ok = bar.createEl("button", { text: "\xDCbernehmen", cls: "cg-btn on" });
        ok.onclick = async () => {
          const chosen = new Set(this.boxes.filter((b) => b.checked).map((b) => b.dataset.name));
          const plan = this.plan.filter((p) => chosen.has(p.name));
          ok.setText("\u2026");
          const res = await this.plugin.applyCompletion(plan);
          this.close();
          new Notice(`Fertig: ${res.added} Eintr\xE4ge in ${res.changed} Notizen erg\xE4nzt.`);
          this.plugin.refreshAll();
        };
        const cancel = bar.createEl("button", { text: tr2("ui.cancel"), cls: "cg-btn" });
        cancel.onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var ContactModal = class extends Modal {
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
        this.fm = cache && cache.frontmatter || {};
        this.body = await this.plugin.app.vault.read(file);
        for (const t2 of this.plugin.settings.relTypes || DEFAULT_REL_TYPES) this.relations[t2.field] = asList(this.fm[t2.field]);
        this.aliasList = asList(this.fm.aliases);
      }
      journalEntries() {
        const m = this.body.match(/^## (?:Verlauf|Journal|cg-journal)\s*$([\s\S]*?)(?=^## |\Z)/m);
        if (!m) return [];
        const entries = parseJournal2(m[1]);
        return entries.map((e) => [e.date, e.type, e.title].filter(Boolean).join(" \xB7 ") || e.summary || "");
      }
      textRow(parent, label, key, placeholder, listId, kind) {
        const row = parent.createDiv({ cls: "cg-form-row" });
        row.createEl("label", { text: label, cls: "cg-form-label" });
        const input = row.createEl("input", { type: kind === "date" ? "date" : "text", cls: "cg-form-input" });
        input.value = this.fm[key] === void 0 || this.fm[key] === null ? "" : String(this.fm[key]).replace(/^\[\[|\]\]$/g, "");
        input.placeholder = placeholder || "";
        if (listId) input.setAttribute("list", listId);
        input.oninput = () => {
          this.values[key] = input.value.trim();
          this.fm[key] = this.values[key];
        };
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
        const cur = this.fm[key] === void 0 || this.fm[key] === null ? "" : String(this.fm[key]);
        if (options.some(([v]) => v === cur)) sel.value = cur;
        sel.onchange = () => {
          this.values[key] = sel.value;
          this.fm[key] = sel.value;
        };
        this.values[key] = sel.value;
        return sel;
      }
      relationBlock(parent, field, label) {
        const wrap = parent.createDiv({ cls: "cg-rel" });
        const head = wrap.createDiv({ cls: "cg-rel-head" });
        head.createEl("div", { text: label, cls: "cg-form-label" });
        const add = iconButton2(head, "plus", tr2("ui.addRelation"), null, "cg-icon-sm");
        add.onclick = () => {
          if (this.opts.isNew) {
            new Notice(tr2("ui.saveFirst"));
            return;
          }
          new RelationPickerModal(this.app, this.plugin, this.name, field, async () => {
            await this.reloadRelations();
            this.render();
          }).open();
        };
        const box = wrap.createDiv({ cls: "cg-chips-box" });
        const paint = () => {
          box.empty();
          const list = this.relations[field] || [];
          if (!list.length) box.createEl("span", { text: "\u2014", cls: "cg-chip-empty" });
          for (const n of list) {
            const chip = box.createEl("span", { cls: "cg-chip", text: n });
            const x = iconButton2(chip, "x", tr2("ui.remove"), null, "cg-chip-x");
            x.onclick = () => {
              this.relations[field] = list.filter((v) => v !== n);
              if (!this.removed[field]) this.removed[field] = /* @__PURE__ */ new Set();
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
        el.createEl("h3", { text: this.opts.isNew ? tr2("ui.newContact") : tr2("ui.contactTitle", { name: this.name }) });
        const contacts = Object.keys(this.plugin.contacts()).sort();
        const dl = el.createEl("datalist", { attr: { id: "cg-dl-contacts" } });
        for (const n of contacts) dl.createEl("option", { value: n });
        const files = this.plugin.app.vault.getFiles().filter((f) => f.path.startsWith(`${this.plugin.settings.folder}/Anh\xE4nge/`));
        const dlf = el.createEl("datalist", { attr: { id: "cg-dl-files" } });
        for (const f of files) dlf.createEl("option", { value: f.name });
        const verh = /* @__PURE__ */ new Set();
        const kreise = /* @__PURE__ */ new Set();
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
          input.oninput = () => {
            this.name = input.value.trim();
          };
        }
        scroll.createEl("h4", { text: tr2("ui.person"), cls: "cg-form-head" });
        this.textRow(scroll, tr2("field.firstName"), "first_name");
        this.textRow(scroll, tr2("field.lastName"), "last_name");
        this.textRow(scroll, tr2("field.middleNames"), "aliases");
        const imgRow = scroll.createDiv({ cls: "cg-form-row" });
        imgRow.createEl("label", { text: tr2("field.image"), cls: "cg-form-label" });
        const imgBox = imgRow.createDiv({ cls: "cg-form-input cg-img-row" });
        imgBox.createEl("span", {
          cls: "cg-chip-empty",
          text: this.fm.image ? String(this.fm.image).replace(/[\[\]]/g, "").split("|")[0] : tr2("ui.noImage")
        });
        const imgBtn = imgBox.createEl("button", { cls: "cg-btn", text: tr2("image.open") });
        imgBtn.onclick = () => new ImageModal(
          this.app,
          this.plugin,
          this.name,
          async () => {
            await this.load();
            this.render();
          }
        ).open();
        this.dateRow(scroll, tr2("field.birthday"), "birthday");
        this.selectRow(scroll, tr2("field.gender"), "gender", [["", "\u2014"], ["m", tr2("gender.male")], ["w", tr2("gender.female")]]);
        this.textRow(scroll, tr2("field.image"), "image", "Datei in Anh\xE4nge/", "cg-dl-files");
        scroll.createEl("h4", { text: tr2("ui.contactSection"), cls: "cg-form-head" });
        this.textRow(scroll, tr2("field.email"), "email");
        this.textRow(scroll, tr2("field.phone"), "phone");
        this.textRow(scroll, tr2("field.website"), "website");
        this.textRow(scroll, tr2("field.place"), "location");
        this.textRow(scroll, tr2("field.company"), "company");
        this.textRow(scroll, tr2("field.position"), "position");
        scroll.createEl("h4", { text: tr2("ui.grouping"), cls: "cg-form-head" });
        this.textRow(scroll, tr2("field.circle"), "circle", "Familie, Arbeit, Freunde \u2026", "cg-dl-kreis");
        const verhOpts = [["", "\u2014"]].concat((this.plugin.settings.relTypes || DEFAULT_REL_TYPES).filter((rt) => rt.field !== "kinder" && rt.field !== "eltern" && rt.field !== "geschwister").map((rt) => [rt.n, rt.n]));
        const curVerh = clean(this.fm.relation || "");
        if (curVerh && !verhOpts.some(([v]) => v === curVerh)) verhOpts.push([curVerh, `${curVerh} (alt)`]);
        this.selectRow(scroll, tr2("ui.fieldRelation"), "relation", verhOpts);
        this.dateRow(scroll, tr2("field.met"), "met");
        this.dateRow(scroll, tr2("field.lastContact"), "last_contact");
        scroll.createEl("h4", { text: tr2("card.relations"), cls: "cg-form-head" });
        const typesAll = this.plugin.settings.relTypes || DEFAULT_REL_TYPES;
        const filled = typesAll.filter((rt) => (this.relations[rt.field] || []).length);
        if (!filled.length) {
          scroll.createEl("div", { cls: "cg-chip-empty", text: "Noch keine Beziehungen." });
        }
        for (const rt of filled) {
          this.relationBlock(scroll, rt.field, this.plugin.relPlural(rt.field));
        }
        const addRelRow = scroll.createDiv({ cls: "cg-bar" });
        const addRelBtn = textIconButton(addRelRow, "plus", tr2("ui.addRelation"), null);
        addRelBtn.onclick = () => {
          new RelationPickerModal(this.app, this.plugin, this.name, null, async () => {
            await this.reloadRelations();
          }).open();
        };
        scroll.createEl("h4", { text: tr2("sections.journal"), cls: "cg-form-head" });
        const journal = scroll.createDiv({ cls: "cg-journal-box" });
        const entries = this.journalEntries();
        if (!entries.length) journal.createEl("div", { text: tr2("ui.noEntries"), cls: "cg-chip-empty" });
        for (const e of entries) journal.createEl("div", { text: `\u2022 ${e}`, cls: "cg-journal-line" });
        const jrow = scroll.createDiv({ cls: "cg-form-row" });
        jrow.createEl("label", { text: "Neuer Eintrag", cls: "cg-form-label" });
        const jinput = jrow.createEl("input", { type: "text", cls: "cg-form-input" });
        jinput.placeholder = "z. B. Kaffee trinken gegangen";
        const jbtn = jrow.createEl("button", { text: tr2("ui.add"), cls: "cg-btn" });
        jbtn.onclick = async () => {
          if (!this.name) {
            new Notice(tr2("ui.saveFirst"));
            return;
          }
          if (await this.plugin.addJournalEntry(this.name, jinput.value)) {
            jinput.value = "";
            await this.load();
            this.render();
          }
        };
        const bar = el.createDiv({ cls: "cg-bar" });
        const ok = bar.createEl("button", { text: tr2("ui.save"), cls: "cg-btn on" });
        ok.onclick = () => this.save();
        const comp = bar.createEl("button", { text: tr2("ui.complete"), cls: "cg-btn" });
        comp.onclick = () => this.complete();
        const cancel = bar.createEl("button", { text: tr2("ui.cancel"), cls: "cg-btn" });
        cancel.onclick = () => this.close();
      }
      async reloadRelations() {
        const fm = await this.plugin.store.fmOf(this.name);
        for (const rt of this.plugin.settings.relTypes || DEFAULT_REL_TYPES) {
          this.relations[rt.field] = asList(fm[rt.field]);
        }
        this.render();
      }
      async complete() {
        if (!this.name) {
          new Notice(tr2("ui.saveFirst"));
          return;
        }
        const plan = this.plugin.planCompletion().filter((p) => p.name === this.name && p.action !== "missing");
        if (!plan.length) {
          new Notice(tr2("ui.nothingToAdd"));
          return;
        }
        const res = await this.plugin.applyCompletion(plan);
        new Notice(`${res.added} Eintr\xE4ge erg\xE4nzt.`);
        await this.load();
        this.render();
        this.plugin.refreshAll();
      }
      async save() {
        if (!this.name) {
          new Notice(tr2("ui.needName"));
          return;
        }
        const path = this.filePath(this.name);
        if (!this.plugin.store.exists(this.name) && !this.sameNameOk) {
          const clashes = this.plugin.store.findByName(this.name).filter((n) => n !== this.name);
          if (clashes.length) {
            new NameConflictModal(this.app, this.plugin, this.name, clashes, "", (res) => {
              this.sameNameOk = true;
              this.name = res.action === "create" ? res.name : res.name;
              if (res.action === "existing") {
                this.close();
                return;
              }
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
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
          const set = (k, v) => {
            if (v === "" || v === void 0) delete fm[k];
            else fm[k] = v;
          };
          for (const k of [
            "first_name",
            "last_name",
            "birthday",
            "email",
            "phone",
            "website",
            "location",
            "company",
            "position",
            "circle",
            "relation",
            "met",
            "last_contact"
          ]) {
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
          for (const rt of this.plugin.settings.relTypes || DEFAULT_REL_TYPES) {
            const field = rt.field;
            const removed = this.removed[field] || /* @__PURE__ */ new Set();
            const current = asList(fm[field]).map((v) => String(v).replace(/^\[\[|\]\]$/g, "").split("|")[0].trim());
            const keep = current.filter((n) => !removed.has(n));
            for (const n of this.relations[field] || []) {
              if (n && !keep.includes(n)) keep.push(n);
            }
            const list = keep.filter(Boolean).map((n) => `[[${n}]]`);
            if (list.length) fm[field] = list;
            else delete fm[field];
          }
        });
        new Notice(`Gespeichert: ${this.name}`);
        this.close();
        this.plugin.refreshAll();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var NameConflictModal = class extends Modal {
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
        el.createEl("h3", { text: tr2("ui.nameConflictTitle") });
        el.createEl("div", { cls: "cg-callout", text: tr2("ui.nameConflictHint", { name: this.fullName }) });
        const list = el.createDiv({ cls: "cg-plan" });
        for (const n of this.existing) list.createEl("div", { cls: "cg-plan-row cg-plan-item", text: n });
        const row = el.createDiv({ cls: "cg-form-row" });
        row.createEl("label", { cls: "cg-form-label", text: tr2("ui.nameSuffix") });
        const input = row.createEl("input", { type: "text", cls: "cg-form-input" });
        input.placeholder = tr2("ui.nameSuffixHint");
        input.value = this.suggest;
        const preview = el.createDiv({ cls: "cg-plan-item" });
        const paint = () => {
          const suffix = (input.value || "").trim();
          preview.setText(`${this.fullName}${suffix ? ` (${suffix})` : ""}.md`);
        };
        input.oninput = paint;
        paint();
        const bar = el.createDiv({ cls: "cg-bar" });
        const ok = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr2("ui.createSeparate") });
        const cancel = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
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
    };
    var BulkModal = class extends Modal {
      constructor(app, plugin) {
        super(app);
        this.plugin = plugin;
        this.selected = /* @__PURE__ */ new Set();
        this.values = { relation: "", circle: "" };
      }
      onOpen() {
        const el = this.contentEl;
        el.addClass("cg-contact");
        el.createEl("h3", { text: tr2("ui.bulkTitleShort") });
        const notes = this.plugin.contacts();
        this.rows = Object.keys(notes).sort().map((name) => ({
          name,
          verhaeltnis: clean((notes[name].fm || {}).relation || ""),
          kreis: clean((notes[name].fm || {}).circle || "")
        }));
        const bar = el.createDiv({ cls: "cg-bar" });
        const search = bar.createEl("input", { type: "text", cls: "cg-form-input" });
        search.placeholder = tr2("ui.filter");
        const allBtn = bar.createEl("button", { text: tr2("ui.selectAll"), cls: "cg-btn" });
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
                text: [rel && `${tr2("field.relation")}: ${rel}`, cir && `${tr2("field.circle")}: ${cir}`].filter(Boolean).join(" \xB7 ")
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
          sel.createEl("option", { value: "", text: tr2("ui.keepUnchanged") });
          for (const opt of options) sel.createEl("option", { value: opt.value, text: opt.text });
          sel.onchange = () => {
            this.values[key] = sel.value;
          };
          return sel;
        };
        selectRow(
          tr2("field.relation"),
          "relation",
          DEFAULT_REL_TYPES.map((rt) => ({ value: rt.key, text: this.labelOf(rt.key) }))
        );
        selectRow(
          tr2("field.circle"),
          "circle",
          SECTORS.map((sec) => ({ value: sec.id, text: sec.label() }))
        );
        const foot = el.createDiv({ cls: "cg-bar" });
        const ok = foot.createEl("button", { text: tr2("ui.apply"), cls: "cg-btn on" });
        ok.onclick = async () => {
          const names = [...this.selected];
          if (!names.length) {
            new Notice(tr2("ui.noContacts"));
            return;
          }
          if (!this.values.relation && !this.values.circle) {
            new Notice(tr2("ui.needRelation"));
            return;
          }
          ok.setText("\u2026");
          let changed = 0;
          for (const name of names) {
            const file = this.app.vault.getAbstractFileByPath(`${this.plugin.settings.folder}/${name}.md`);
            if (!file) continue;
            await this.app.fileManager.processFrontMatter(file, (fm) => {
              if (this.values.relation) fm.relation = this.values.relation;
              if (this.values.circle) fm.circle = this.values.circle;
              fm.updated = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
            });
            changed++;
          }
          this.plugin.graph.invalidate();
          this.close();
          new Notice(tr2("ui.bulkDone", { count: changed }));
          this.plugin.refreshAll();
        };
        const cancel = foot.createEl("button", { text: tr2("ui.cancel"), cls: "cg-btn" });
        cancel.onclick = () => this.close();
      }
      /* Anzeigename eines Beziehungsschlüssels */
      labelOf(value) {
        const rt = DEFAULT_REL_TYPES.find((r) => r.key === value) || DEFAULT_REL_TYPES.find((r) => r.field === value) || DEFAULT_REL_TYPES.find((r) => [r.n, r.m, r.w].some((f) => f && f.toLowerCase() === String(value).toLowerCase())) || DEFAULT_REL_TYPES.find((r) => (r.aliases || []).some((a) => String(a).toLowerCase() === String(value).toLowerCase()));
        if (!rt) return String(value);
        return tr2(`relations.${rt.key}.n`) || String(value);
      }
      circleLabel(value) {
        const sec = SECTORS.find((s) => s.id === value) || SECTORS.find((s) => s.label().toLowerCase() === String(value).toLowerCase());
        return sec ? sec.label() : String(value);
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var SectionEditModal = class extends Modal {
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
        const previewBtn = textIconButton(tools, "eye", tr2("ui.preview"), null, "cg-btn-small");
        const maxBtn = iconButton2(tools, "maximize-2", tr2("ui.maximize"), null, "cg-icon-sm");
        const ta = el.createEl("textarea", { cls: "cg-section-edit" });
        ta.value = this.text;
        ta.spellcheck = false;
        ta.placeholder = tr2("ui.sectionPlaceholder");
        const preview = el.createDiv({ cls: "cg-sec-preview" });
        preview.hide ? preview.hide() : preview.style.display = "none";
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
        const toggleMax = () => {
          const on = this.modalEl.classList.toggle("cg-maximized");
          setButtonIcon(maxBtn, on ? "minimize-2" : "maximize-2");
          maxBtn.setAttribute("title", on ? tr2("ui.restore") : tr2("ui.maximize"));
        };
        maxBtn.onclick = toggleMax;
        const bar = el.createDiv({ cls: "cg-bar cg-sec-bar" });
        const ok = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: tr2("ui.save") });
        const cancel = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
        cancel.onclick = () => this.close();
        const save = async () => {
          if (this.editing) return;
          this.editing = true;
          ok.setText("\u2026");
          await this.plugin.writeSection(this.name, this.heading, ta.value);
          new Notice(tr2("section.saved", { title: this.label() }));
          this.close();
          if (this.after) this.after();
          this.plugin.refreshAll();
        };
        ok.onclick = save;
        el.onkeydown = (ev) => {
          if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") {
            ev.preventDefault();
            save();
          }
          if (ev.key === "Escape") {
            ev.preventDefault();
            this.close();
          }
        };
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var GraphConfigModal = class extends Modal {
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
        el.createEl("h3", { text: tr2("graph.configTitle", { name: this.title }) });
        const cfg = this.plugin.parseBlockConfig(this.text);
        this.cfg = {
          depth: cfg.depth || 2,
          mode: cfg.mode || "relation",
          sel: cfg.sel || [],
          photos: cfg.photos === true,
          height: cfg.height || 0
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
        depthSel.onchange = () => {
          this.cfg.depth = parseInt(depthSel.value, 10);
        };
        const modeRow = row(tr2("ui.coloring"));
        const modeSel = modeRow.createEl("select", { cls: "cg-form-input" });
        modeSel.createEl("option", { text: "Beziehungsart", value: "relation" });
        const fields = String(this.plugin.settings.attrFields || "").split(",").map((s) => s.trim()).filter(Boolean);
        if (!fields.includes("circle")) fields.unshift("circle");
        for (const f of fields) modeSel.createEl("option", { text: f, value: f });
        modeSel.value = this.cfg.mode;
        modeSel.onchange = () => {
          this.cfg.mode = modeSel.value;
          paintValues();
        };
        const photosRow = row("Profilbilder");
        const photosCb = photosRow.createEl("input", { type: "checkbox" });
        photosCb.checked = this.cfg.photos;
        photosCb.onchange = () => {
          this.cfg.photos = photosCb.checked;
        };
        const heightRow = row(tr2("ui.heightPx"));
        const heightInput = heightRow.createEl("input", { type: "text", cls: "cg-form-input" });
        heightInput.placeholder = "leer = automatisch";
        heightInput.value = this.cfg.height ? String(this.cfg.height) : "";
        heightInput.oninput = () => {
          this.cfg.height = parseInt(heightInput.value, 10) || 0;
        };
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
          const counts = /* @__PURE__ */ new Map();
          for (const n of Object.keys(notes)) {
            for (const v of this.plugin.attrValues(n, notes, this.cfg.mode)) counts.set(v, (counts.get(v) || 0) + 1);
          }
          if (!counts.size) {
            valuesBox.createEl("span", { cls: "cg-chip-empty", text: "Keine Werte vorhanden." });
            return;
          }
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
        const ok = bar.createEl("button", { cls: "cg-btn on", text: tr2("ui.save") });
        ok.onclick = async () => {
          const lines = [
            `depth: ${this.cfg.depth}`,
            `mode: ${this.cfg.mode}`,
            `sel: ${this.cfg.sel.join(", ")}`,
            `photos: ${this.cfg.photos}`
          ];
          if (this.cfg.height) lines.push(`height: ${this.cfg.height}`);
          await this.plugin.writeSection(this.name, this.title, "```yaml\n" + lines.join("\n") + "\n```");
          this.close();
          new Notice(tr2("ui.graphConfigSaved"));
          if (this.after) this.after();
          this.plugin.refreshAll();
        };
        const cancel = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
        cancel.onclick = () => this.close();
      }
      onClose() {
        this.contentEl.empty();
      }
    };
    var RelationPickerModal = class extends Modal {
      constructor(app, plugin, source, presetField, after) {
        super(app);
        this.plugin = plugin;
        this.source = source;
        this.presetField = presetField;
        this.after = after;
        this.chosen = /* @__PURE__ */ new Set();
      }
      onOpen() {
        const el = this.contentEl;
        el.addClass("cg-contact");
        el.createEl("h3", { text: tr2("ui.addRelations", { source: this.source }) });
        const types = this.plugin.settings.relTypes || DEFAULT_REL_TYPES;
        const typeRow = el.createDiv({ cls: "cg-form-row" });
        typeRow.createEl("label", { text: tr2("field.type"), cls: "cg-form-label" });
        const sel = typeRow.createEl("select", { cls: "cg-form-input" });
        for (const rt of types) {
          sel.createEl("option", { text: `${groupLabel(rt.group)} \xB7 ${this.plugin.relLabel(rt.field, "")}`, value: rt.field });
        }
        if (this.presetField) {
          sel.value = this.presetField;
          sel.disabled = true;
          sel.addClass("cg-locked");
        }
        const searchRow = el.createDiv({ cls: "cg-form-row" });
        searchRow.createEl("label", { text: "Person", cls: "cg-form-label" });
        const search = searchRow.createEl("input", { type: "text", cls: "cg-form-input" });
        search.placeholder = "Namen suchen oder neuen Namen tippen \u2026";
        const list = el.createDiv({ cls: "cg-plan cg-pick-list" });
        const contacts = this.plugin.contacts();
        this.createNew = false;
        const modeRow = el.createDiv({ cls: "cg-form-row cg-switch-row" });
        const modeLabel = modeRow.createEl("label", { cls: "cg-form-label", text: tr2("ui.createNewContact") });
        const modeBox = modeRow.createEl("input", { attr: { type: "checkbox" }, cls: "cg-switch" });
        modeBox.checked = false;
        const modeHint = modeRow.createEl("div", { cls: "cg-plan-item", text: tr2("ui.createNewHint") });
        modeBox.onchange = () => {
          this.createNew = !!modeBox.checked;
          modeHint.setText(this.createNew ? tr2("ui.createNewOn") : tr2("ui.createNewHint"));
          modeLabel.classList.toggle("cg-on", this.createNew);
          paint();
        };
        const bar = el.createDiv({ cls: "cg-bar" });
        const applyBtn = bar.createEl("button", { cls: "cg-btn cg-btn-accent", text: "Hinzuf\xFCgen" });
        const cancel = bar.createEl("button", { cls: "cg-btn", text: tr2("ui.cancel") });
        cancel.onclick = () => this.close();
        const applyAll = async () => {
          const field = sel.value;
          const rt = this.plugin.relType(field);
          const typed = (search.value || "").trim();
          const names = [...this.chosen];
          if (typed && !names.includes(typed)) names.push(typed);
          if (!names.length) {
            new Notice(tr2("ui.nothingSelected"));
            return;
          }
          applyBtn.setText("\u2026");
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
          const what = rt ? rt.pl || rt.n : field;
          new Notice(tr2("ui.relationsAdded", { what, count: linked, created }));
          this.close();
          if (this.after) this.after();
          this.plugin.refreshAll();
        };
        applyBtn.onclick = applyAll;
        const updateBar = () => {
          applyBtn.setText(this.chosen.size ? `Hinzuf\xFCgen (${this.chosen.size})` : "Hinzuf\xFCgen");
        };
        const paint = () => {
          list.empty();
          const typed = (search.value || "").trim();
          const q2 = typed.toLowerCase();
          const names = Object.keys(contacts).filter((n) => n !== this.source && n.toLowerCase().includes(q2)).sort((a, b) => a.localeCompare(b)).slice(0, 80);
          if (typed && !contacts[typed] && !this.chosen.has(typed)) {
            const row = list.createDiv({ cls: "cg-plan-row cg-pick-row" });
            const box = row.createDiv({ cls: "cg-plan-text" });
            box.createEl("strong", { text: `\u201E${typed}" ist noch kein Kontakt` });
            box.createEl("div", {
              cls: "cg-plan-item",
              text: this.createNew ? tr2("ui.willCreate") : tr2("ui.willLinkOnly")
            });
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
            const meta = [ofm.circle, ofm.relation].filter(Boolean).join(" \xB7 ");
            if (meta) label.createEl("div", { cls: "cg-plan-item", text: String(meta) });
            const toggle = () => {
              if (this.chosen.has(n)) this.chosen.delete(n);
              else this.chosen.add(n);
              cb.checked = this.chosen.has(n);
              row.classList.toggle("cg-picked", this.chosen.has(n));
              updateBar();
            };
            row.onclick = toggle;
            cb.onchange = toggle;
          }
          updateBar();
        };
        sel.onchange = () => {
          paint();
        };
        search.oninput = paint;
        paint();
        search.focus();
      }
    };
    module2.exports = { NameConflictModal, ConfirmModal, JournalEntryModal, GiftModal, ImageModal, PresetModal, CompletionModal, ContactModal, BulkModal, SectionEditModal, GraphConfigModal, RelationPickerModal };
  }
});

// src/view.js
var require_view = __commonJS({
  "src/view.js"(exports2, module2) {
    var { ItemView, Notice, TFile } = require("obsidian");
    var { VIEW_TYPE, DEFAULT_REL_TYPES } = require_constants();
    var { asList, attachZoom } = require_util();
    var { ghostFrontmatter: ghostFrontmatter2 } = require_markdown();
    var { PresetModal } = require_modals();
    var ContactGraphView2 = class extends ItemView {
      constructor(leaf, plugin) {
        super(leaf);
        this.plugin = plugin;
      }
      getViewType() {
        return VIEW_TYPE;
      }
      getDisplayText() {
        return "Beziehungsgraph";
      }
      getIcon() {
        return "share-2";
      }
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
          container.createEl("p", { text: `Keine Kontaktnotiz f\xFCr \u201E${center}" gefunden.`, cls: "cg-hint" });
          return;
        }
        this.kreise = this.kreise || /* @__PURE__ */ new Set();
        const kreisCount = /* @__PURE__ */ new Map();
        for (const n of Object.keys(notes)) {
          for (const k of p.kreisOf(n, notes)) kreisCount.set(k, (kreisCount.get(k) || 0) + 1);
        }
        let viewNotes = notes, viewRel = rel;
        if (this.kreise.size) {
          const allowed = /* @__PURE__ */ new Set([center]);
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
        const head = container.createDiv({ cls: "cg-head" });
        head.createEl("div", { text: center, cls: "cg-title" });
        const sub = head.createDiv({ cls: "cg-sub" });
        const ghostCount = [...found.keys()].filter((n) => notes[n] && notes[n].ghost).length;
        sub.setText(`${found.size - 1 - ghostCount} Kontakte` + (ghostCount ? ` \xB7 ${ghostCount} Platzhalter` : "") + ` \xB7 Tiefe ${depth}`);
        const bar = container.createDiv({ cls: "cg-bar" });
        const depthBtn = (label, d) => {
          const b = bar.createEl("button", { text: label, cls: "cg-btn" + (d === depth ? " on" : "") });
          b.onclick = () => {
            this.depth = d;
            this.render();
          };
        };
        depthBtn("direkt", 1);
        depthBtn("2. Grad", 2);
        depthBtn("3. Grad", 3);
        const toggle = bar.createEl("button", {
          text: p.settings.showPhotos ? "Fotos" : "Namen",
          cls: "cg-btn on"
        });
        toggle.onclick = async () => {
          p.settings.showPhotos = !p.settings.showPhotos;
          await p.saveData(p.settings);
          this.render();
        };
        const presets = p.settings.presets || [];
        if (presets.length) {
          const pick = bar.createEl("select", { cls: "cg-select" });
          pick.createEl("option", { text: "Preset \u2026", value: "" });
          for (const pr of presets) pick.createEl("option", { text: pr.name, value: pr.name });
          pick.onchange = () => {
            if (!pick.value) return;
            this.applyPreset(pick.value);
            pick.value = "";
          };
        }
        const saveBtn = bar.createEl("button", { text: "Preset speichern", cls: "cg-btn" });
        saveBtn.onclick = () => {
          new PresetModal(p.app, `Preset f\xFCr ${center}`, async (name) => {
            if (!name) return;
            const preset = {
              name,
              center,
              depth: this.depth || p.settings.defaultDepth,
              mode: this.mode || "relation",
              sel: [...this.sel || []],
              photos: !!p.settings.showPhotos,
              types: Object.fromEntries(Object.entries(p.settings.types).map(([k, v]) => [k, v.enabled !== false]))
            };
            p.settings.presets = (p.settings.presets || []).filter((x) => x.name !== name).concat([preset]);
            await p.saveData(p.settings);
            new Notice(`Preset \u201E${name}" gespeichert`);
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
            depth,
            mode: this.mode || "relation",
            sel: [...this.sel || []],
            photos: p.settings.showPhotos,
            types: disabled
          });
          if (path) new Notice(`Konfiguration in ${path} geschrieben`);
        };
        const pngBtn = bar.createEl("button", { text: "PNG", cls: "cg-btn" });
        pngBtn.onclick = async () => {
          pngBtn.setText("\u2026");
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
        if (kreisCount.size > 1) {
          const kreisBar = container.createDiv({ cls: "cg-bar cg-chips" });
          const allBtn = kreisBar.createEl("button", {
            text: "alle Kreise",
            cls: "cg-btn" + (this.kreise.size === 0 ? " on" : "")
          });
          allBtn.onclick = () => {
            this.kreise.clear();
            this.render();
          };
          for (const [k, count] of [...kreisCount.entries()].sort((a, b) => b[1] - a[1])) {
            const on = this.kreise.has(k);
            const chip = kreisBar.createEl("button", { text: `${k} (${count})`, cls: "cg-btn" + (on ? " on" : "") });
            chip.onclick = () => {
              if (this.kreise.has(k)) this.kreise.delete(k);
              else this.kreise.add(k);
              this.render();
            };
          }
        }
        this.mode = this.mode || "relation";
        this.sel = this.sel || /* @__PURE__ */ new Set();
        const fields = String(p.settings.attrFields || "").split(",").map((x) => x.trim()).filter(Boolean);
        const modeBar = container.createDiv({ cls: "cg-bar" });
        const modeBtn = (key, label) => {
          const b = modeBar.createEl("button", {
            text: label,
            cls: "cg-btn" + (this.mode === key ? " on" : "")
          });
          b.onclick = () => {
            this.mode = key;
            this.sel.clear();
            this.render();
          };
        };
        modeBtn("relation", "Beziehungsart");
        for (const f of fields) modeBtn(f, f.charAt(0).toUpperCase() + f.slice(1));
        if (this.mode !== "relation") {
          const values = /* @__PURE__ */ new Map();
          for (const name of found.keys()) {
            for (const v of p.attrValues(name, notes, this.mode)) {
              values.set(v, (values.get(v) || 0) + 1);
            }
          }
          if (values.size) {
            const chipBar = container.createDiv({ cls: "cg-bar cg-chips" });
            const all = chipBar.createEl("button", {
              text: "alle",
              cls: "cg-btn" + (this.sel.size === 0 ? " on" : "")
            });
            all.onclick = () => {
              this.sel.clear();
              this.render();
            };
            for (const [v, n] of [...values.entries()].sort((a, b) => b[1] - a[1])) {
              const on = this.sel.has(v);
              const c = chipBar.createEl("button", { text: `${v} (${n})`, cls: "cg-btn" + (on ? " on" : "") });
              c.onclick = () => {
                if (this.sel.has(v)) this.sel.delete(v);
                else this.sel.add(v);
                this.render();
              };
            }
          } else {
            container.createEl("p", {
              text: `Keine Werte im Feld \u201E${this.mode}" \u2014 trag es im Frontmatter der Kontakte ein.`,
              cls: "cg-hint"
            });
          }
        }
        const wrap = container.createDiv({ cls: "cg-canvas" });
        wrap.innerHTML = p.svg(center, notes, found, edges, {
          photos: p.settings.showPhotos,
          depth,
          mode: this.mode,
          sel: this.sel
        });
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
            if (asList(data.fm[f]).includes(name)) {
              source = n;
              field = f;
              break;
            }
          }
          if (source) break;
        }
        const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const content = ghostFrontmatter2(name, source, field, source ? notes[source].fm : {}, today);
        try {
          const file = await p.app.vault.create(path, content);
          new Notice(`Notiz \u201E${name}" angelegt`);
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
        new Notice(`Preset \u201E${name}" angewendet`);
      }
      async exportPNG(svgEl, center) {
        if (!svgEl) throw new Error("kein Diagramm sichtbar");
        const p = this.plugin;
        const clone = svgEl.cloneNode(true);
        clone.querySelectorAll(".cg-edge-label").forEach((t) => t.remove());
        clone.setAttribute("font-family", "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif");
        const cs = getComputedStyle(document.body);
        let xml = new XMLSerializer().serializeToString(clone);
        const names = new Set([...xml.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]));
        for (const name of names) {
          const value = (cs.getPropertyValue(name) || "").trim() || "#888888";
          xml = xml.split(`var(${name})`).join(value);
        }
        const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
        const W = Math.round(vb && vb.width || svgEl.clientWidth || 900);
        const H = Math.round(vb && vb.height || svgEl.clientHeight || 760);
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
        if (!await p.app.vault.adapter.exists(dir)) {
          await p.app.vault.adapter.mkdir(dir, true);
        }
        const now = /* @__PURE__ */ new Date();
        const stamp = now.getFullYear().toString() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + "-" + String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
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
            if (path[i] === a && path[i + 1] === b || path[i] === b && path[i + 1] === a) {
              on = true;
              step = i;
            }
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
    };
    module2.exports = { ContactGraphView: ContactGraphView2 };
  }
});

// src/settings.js
var require_settings = __commonJS({
  "src/settings.js"(exports2, module2) {
    var { t: tr2 } = require_i18n();
    var { Notice, PluginSettingTab, Setting } = require("obsidian");
    var ContactGraphSettings = class extends PluginSettingTab {
      constructor(plugin) {
        super(plugin.app, plugin);
        this.plugin = plugin;
      }
      display() {
        this.plugin.normalizeSections();
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Contact Graph" });
        new Setting(containerEl).setName(tr2("settings.selfNote.name")).setDesc(tr2("settings.selfNote.desc")).addText((t) => t.setValue(this.plugin.settings.selfNote).onChange(async (v) => {
          this.plugin.settings.selfNote = v.trim();
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        new Setting(containerEl).setName(tr2("settings.folder.name")).setDesc(tr2("settings.folder.desc")).addText((t) => t.setValue(this.plugin.settings.folder).onChange(async (v) => {
          this.plugin.settings.folder = v.trim();
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        new Setting(containerEl).setName(tr2("settings.depth.name")).setDesc(tr2("settings.depth.desc")).addDropdown((d) => {
          d.addOption("1", "nur direkt").addOption("2", "bis 2. Grad").addOption("3", "bis 3. Grad");
          d.setValue(String(this.plugin.settings.defaultDepth));
          d.onChange(async (v) => {
            this.plugin.settings.defaultDepth = +v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          });
        });
        new Setting(containerEl).setName(tr2("settings.exclude.name")).setDesc(tr2("settings.exclude.desc")).addText((t) => t.setValue(this.plugin.settings.exclude).onChange(async (v) => {
          this.plugin.settings.exclude = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        containerEl.createEl("h3", { text: "Abschnitte der Kontaktkarte" });
        containerEl.createEl("p", {
          cls: "setting-item-description",
          text: tr2("ui.sectionsDesc") + "Der Knopf \u201E\uFF0B Abschnitt\u201C auf der Karte legt fehlende Abschnitte in der Notiz an."
        });
        if (!Array.isArray(this.plugin.settings.sections)) this.plugin.settings.sections = [];
        this.plugin.settings.sections.forEach((sec, idx) => {
          const row = new Setting(containerEl).setName(`${idx + 1}. ${sec.title}`).addText((txt) => txt.setValue(sec.title).onChange(async (v) => {
            sec.title = v.trim() || sec.title;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            this.display();
          })).addDropdown((d) => {
            d.addOption("text", "Text").addOption("journal", "Verlauf (Liste)").addOption("address", "Adresse (Karte)").addOption("graph", "Graph (konfigurierbar)");
            d.setValue(sec.type || "text");
            d.onChange(async (v) => {
              sec.type = v;
              await this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
              this.display();
            });
          }).addText((txt) => {
            txt.setPlaceholder("Filter, z. B. Besprechung").setValue(sec.filter || "");
            txt.onChange(async (v) => {
              sec.filter = v.trim();
              await this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            });
          });
          row.addExtraButton((b) => b.setIcon("arrow-up").setTooltip(tr2("ui.up")).onClick(async () => {
            if (idx === 0) return;
            const arr = this.plugin.settings.sections;
            [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            this.display();
          }));
          row.addExtraButton((b) => b.setIcon("arrow-down").setTooltip(tr2("ui.down")).onClick(async () => {
            const arr = this.plugin.settings.sections;
            if (idx >= arr.length - 1) return;
            [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            this.display();
          }));
          row.addExtraButton((b) => b.setIcon("trash").setTooltip(tr2("ui.remove")).onClick(async () => {
            this.plugin.settings.sections.splice(idx, 1);
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            this.display();
          }));
        });
        new Setting(containerEl).setName(tr2("settings.sections.add")).setDesc(tr2("settings.sections.addDesc")).addText((txt) => {
          txt.setPlaceholder("z. B. Besprechungen");
          this.newSectionInput = txt;
        }).addDropdown((d) => {
          d.addOption("text", "Text").addOption("journal", "Verlauf").addOption("address", "Adresse").addOption("graph", "Graph");
          d.setValue("text");
          d.onChange((v) => {
            this.newSectionType = v;
          });
        }).addButton((b) => b.setButtonText(tr2("ui.add")).onClick(async () => {
          const title = (this.newSectionInput && this.newSectionInput.getValue() || "").trim();
          if (!title) return;
          if (this.plugin.settings.sections.some((s) => s.title === title)) {
            new Notice(tr2("ui.exists"));
            return;
          }
          this.plugin.settings.sections.push({ title, type: this.newSectionType || "text", filter: "" });
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
          this.display();
        }));
        containerEl.createEl("h3", { text: "Kreise (Filter)" });
        containerEl.createEl("p", {
          cls: "setting-item-description",
          text: "Kreise sind die Chips \xFCber dem Diagramm: Familie, Arbeit, Freunde. Sie filtern den ganzen Graphen; ohne Auswahl wird alles gezeigt."
        });
        new Setting(containerEl).setName(tr2("settings.kreisField.name")).setDesc(tr2("settings.kreisField.desc")).addText((txt) => txt.setValue(this.plugin.settings.kreisField).onChange(async (v) => {
          this.plugin.settings.kreisField = v.trim() || "circle";
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        new Setting(containerEl).setName(tr2("settings.kreisFallback.name")).setDesc("Ohne Eintrag: Familie bei verwandtschaftlicher Verkn\xFCpfung, Arbeit bei " + tr2("ui.kreisFallbackDesc")).addToggle((tg) => tg.setValue(this.plugin.settings.kreisFallback !== false).onChange(async (v) => {
          this.plugin.settings.kreisFallback = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        containerEl.createEl("h3", { text: "Merkmale" });
        containerEl.createEl("p", {
          cls: "setting-item-description",
          text: "Frontmatter-Felder, nach denen du gruppieren und filtern kannst. Komma-getrennt."
        });
        new Setting(containerEl).setName(tr2("settings.fields.name")).setDesc(tr2("settings.fields.desc")).addText((t) => t.setValue(this.plugin.settings.attrFields).onChange(async (v) => {
          this.plugin.settings.attrFields = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        new Setting(containerEl).setName(tr2("settings.blobOpacity.name")).setDesc(tr2("settings.blobOpacity.desc")).addSlider((sl) => sl.setLimits(0.05, 0.4, 0.01).setValue(Number(this.plugin.settings.blobOpacity)).setDynamicTooltip().onChange(async (v) => {
          this.plugin.settings.blobOpacity = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        new Setting(containerEl).setName(tr2("settings.blobPad.name")).setDesc(tr2("settings.blobPad.desc")).addSlider((sl) => sl.setLimits(20, 90, 2).setValue(Number(this.plugin.settings.blobPad)).setDynamicTooltip().onChange(async (v) => {
          this.plugin.settings.blobPad = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        new Setting(containerEl).setName(tr2("settings.exportFolder.name")).setDesc(tr2("settings.exportFolder.desc")).addText((t) => t.setValue(this.plugin.settings.exportFolder).onChange(async (v) => {
          this.plugin.settings.exportFolder = v.trim();
          await this.plugin.saveData(this.plugin.settings);
        }));
        containerEl.createEl("h3", { text: "Presets" });
        const presets = this.plugin.settings.presets || [];
        if (!presets.length) {
          containerEl.createEl("p", { cls: "setting-item-description", text: "Noch keine Presets gespeichert." });
        }
        for (const preset of presets) {
          new Setting(containerEl).setName(preset.name).setDesc(`${preset.center} \xB7 Tiefe ${preset.depth} \xB7 ${preset.mode}`).addButton((b) => b.setButtonText(tr2("ui.delete")).setWarning().onClick(async () => {
            this.plugin.settings.presets = presets.filter((x) => x.name !== preset.name);
            await this.plugin.saveData(this.plugin.settings);
            this.display();
          }));
        }
        containerEl.createEl("h3", { text: "Farben" });
        new Setting(containerEl).setName(tr2("settings.themeColors.name")).setDesc("Farben aus dem aktiven Obsidian-Theme statt fester Werte. Wirkt f\xFCr Kanten, Blobs, Zentrum und Platzhalter \u2014 hell wie dunkel.").addToggle((tg) => tg.setValue(this.plugin.settings.themeColors !== false).onChange(async (v) => {
          this.plugin.settings.themeColors = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
          this.display();
        }));
        containerEl.createEl("h3", { text: "Graph" });
        new Setting(containerEl).setName(tr2("settings.familyOnly.name")).setDesc("An: Freunde und Kollegen sind Endstation, \xFCber sie hinaus wird nicht gesucht. Aus: auch deren Umfeld wird einbezogen.").addToggle((tg) => tg.setValue(this.plugin.settings.expandFamily !== false).onChange(async (v) => {
          this.plugin.settings.expandFamily = v;
          await this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
        containerEl.createEl("h3", { text: "Beziehungsarten" });
        if (this.plugin.settings.themeColors !== false) {
          containerEl.createEl("p", {
            cls: "setting-item-description",
            text: "Eigene Farben sind ausgeblendet, solange die Themenfarben aktiv sind."
          });
        }
        containerEl.createEl("p", { cls: "setting-item-description", text: "Farbe, Beschriftung und Linienstil je Feld." });
        const themed = this.plugin.settings.themeColors !== false;
        for (const [key, t] of Object.entries(this.plugin.settings.types)) {
          const s = new Setting(containerEl).setName(key).addText((txt) => txt.setPlaceholder("Bezeichnung").setValue(t.label).onChange(async (v) => {
            t.label = v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));
          if (!themed) {
            s.addColorPicker((c) => c.setValue(t.color).onChange(async (v) => {
              t.color = v;
              await this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            }));
          }
          s.addToggle((tg) => tg.setValue(t.enabled !== false).setTooltip(tr2("ui.visible")).onChange(async (v) => {
            t.enabled = v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          })).addToggle((tg) => tg.setValue(!!t.dashed).setTooltip(tr2("ui.dashed")).onChange(async (v) => {
            t.dashed = v;
            await this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));
        }
      }
    };
    module2.exports = { ContactGraphSettings };
  }
});

// src/plugin.js
var require_plugin = __commonJS({
  "src/plugin.js"(exports2, module2) {
    var { Plugin, Notice, Menu, MarkdownRenderer } = require("obsidian");
    var { VIEW_TYPE, DEFAULT_SETTINGS, DEFAULT_SECTIONS, ROLE, ROLE_M, ROLE_W, SECTORS, PALETTE, THEME_PALETTE, THEME_GROUP_COLOR, THEME_KIND, DEFAULT_REL_TYPES, normalizeGroup, relTypeByValue, sectionHeading, sectionLabel, sectionText, groupLabel } = require_constants();
    var { t: tr2, detectLocale } = require_i18n();
    var { clean, asList, esc: esc2, blobPath, attachGraphHover, attachZoom } = require_util();
    var { scanSections, parseJournal: parseJournal2, formatJournal: formatJournal2, parseGifts, formatGift } = require_markdown();
    var { ContactStore } = require_store();
    var { sectorLayout, GraphBuilder } = require_graph();
    var { ContactGraphView: ContactGraphView2 } = require_view();
    var { ContactGraphSettings } = require_settings();
    var { iconButton: iconButton2, setButtonIcon, textIconButton } = require_util();
    var { ConfirmModal, JournalEntryModal, GiftModal, CompletionModal, ContactModal, BulkModal, SectionEditModal, GraphConfigModal } = require_modals();
    var ContactGraph2 = class extends Plugin {
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
          const known = DEFAULT_SECTIONS.find((d) => d.id === sec.id) || DEFAULT_SECTIONS.find((d) => d.heading === (sec.heading || sec.title)) || DEFAULT_SECTIONS.find((d) => sec.title && (d.aliases.includes(sec.title) || d.heading === sec.title));
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
        this.registerView(VIEW_TYPE, (leaf) => new ContactGraphView2(leaf, this));
        this.registerObsidianProtocolHandler("contact-graph", (params) => {
          if (params.action === "edit" && params.name) {
            new ContactModal(this.app, this, { name: params.name }).open();
          } else if (params.action === "new") {
            new ContactModal(this.app, this, { isNew: true }).open();
          }
        });
        this.addRibbonIcon("share-2", "Beziehungsgraph", () => this.openView());
        this.addCommand({ id: "open-graph", name: tr2("ui.commandOpen"), callback: () => this.openView() });
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
            if (!name) {
              new Notice(tr2("ui.noContactNote"));
              return;
            }
            new ContactModal(this.app, this, { name }).open();
          }
        });
        this.addCommand({
          id: "contact-new",
          name: "Neuen Kontakt anlegen",
          callback: () => new ContactModal(this.app, this, { isNew: true }).open()
        });
        this.addCommand({
          id: "bulk-verhaeltnis",
          name: tr2("ui.bulkTitle"),
          callback: () => new BulkModal(this.app, this).open()
        });
        this.addCommand({
          id: "complete-relations",
          name: tr2("ui.commandComplete"),
          callback: () => this.openCompletion()
        });
        this.addCommand({
          id: "toggle-photos",
          name: "Fotos/Namen umschalten",
          callback: async () => {
            this.settings.showPhotos = !this.settings.showPhotos;
            await this.saveData(this.settings);
            this.refresh();
            new Notice(this.settings.showPhotos ? "Profilbilder an" : "Namen statt Bildern");
          }
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
      planCompletion() {
        return this.graph.planCompletion();
      }
      /* Profilbilder und Namensfelder */
      auxIssues(notes) {
        return this.graph.auxIssues(notes);
      }
      /* Verlaufseintrag anhängen */
      /* Kreis und Verhältnis aus den Beziehungen zur Ich-Person ableiten */
      autoMeta(name) {
        return this.graph.autoMeta(name);
      }
      /* Nach dem Verknüpfen mit mir: Verhältnis und Kreis setzen, wenn leer */
      async applyAutoMeta(target, field) {
        return this.store.applyAutoMeta(target, field);
      }
      /* Profilbild aus einer Datei übernehmen und im Anhänge-Ordner ablegen */
      async setContactImage(name, file) {
        const ok = await this.store.setImage(name, file);
        if (ok) {
          new Notice(`Profilbild gesetzt: ${name}`);
          this.refreshAll();
        }
        return ok;
      }
      /* Aus einem Namen einen Kontakt anlegen: Vorname, weitere Namen, Nachname */
      splitName(full) {
        return this.store.splitName(full);
      }
      async createContactFromName(fullName) {
        return this.store.createContact(fullName);
      }
      async addRelation(source, field, target) {
        return this.store.addRelation(source, field, target);
      }
      async addJournalEntry(name, text) {
        if (!text || !text.trim()) return false;
        const current = await this.readSection(name, "cg-journal");
        const lines = String(current || "").split("\n").filter((l) => l.trim() !== "");
        lines.push(`- ${text.trim()}`);
        return this.writeSection(name, "cg-journal", lines.join("\n"));
      }
      async applyCompletion(plan) {
        return this.store.applyCompletion(plan);
      }
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
          el.createEl("p", { cls: "cg-hint", text: `Kontakt \u201E${center}" nicht gefunden.` });
          return;
        }
        const depth = cfg.depth || 2;
        const mode = cfg.mode || "relation";
        const sel = new Set(cfg.sel || []);
        const photos = cfg.photos === true;
        const familyOnly = cfg.expand ? String(cfg.expand).toLowerCase() !== "all" : void 0;
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
            hint.createEl("span", { text: tr2("ui.graphEmpty") });
            const b = hint.createEl("button", { cls: "cg-btn", text: tr2("ui.graphAddRelation") });
            b.onclick = () => new ContactModal(this.app, this, { name: center }).open();
          }
          const foot = el.createDiv({ cls: "cg-embed-foot" });
          foot.createEl("span", {
            text: `${center} \xB7 Tiefe ${depth}` + (mode !== "relation" ? ` \xB7 ${mode}` : "") + (sel.size ? ` \xB7 ${[...sel].join(", ")}` : "")
          });
        } finally {
          this.settings.types = savedTypes;
        }
      }
      /* Aktuelle Ansicht in die offene Notiz schreiben */
      async saveConfigToNote(center, cfg) {
        const file = this.app.workspace.getActiveFile();
        if (!file) {
          new Notice(tr2("ui.noNote"));
          return null;
        }
        const lines = [
          `center: ${center}`,
          `depth: ${cfg.depth}`,
          `mode: ${cfg.mode}`,
          `sel: ${(cfg.sel || []).join(", ")}`,
          `photos: ${!!cfg.photos}`
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
        if (!file) {
          el.createEl("p", { text: `Kontakt \u201E${name}" nicht gefunden.` });
          return;
        }
        const cache = this.app.metadataCache.getFileCache(file);
        const fm = cache && cache.frontmatter || {};
        const body = await this.app.vault.read(file);
        const card = el.createDiv({ cls: "cg-card" });
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
          media.createDiv({
            cls: "cg-profile-initials",
            text: name.split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase()
          });
        }
        media.createDiv({ cls: "cg-profile-shade" });
        const editBtn = iconButton2(
          media,
          "pencil",
          tr2("ui.editContact"),
          () => new ContactModal(this.app, this, { name }).open(),
          "cg-profile-edit"
        );
        const reloadCard = () => this.renderContactCard(el, name, ctx);
        const applyImage = async (file2) => {
          if (!file2 || !/^image\//.test(file2.type || "image/")) return;
          await this.setContactImage(name, file2);
          reloadCard();
        };
        media.ondragover = (ev) => {
          ev.preventDefault();
          media.addClass("cg-drop");
        };
        media.ondragleave = () => media.removeClass("cg-drop");
        media.ondrop = async (ev) => {
          ev.preventDefault();
          media.removeClass("cg-drop");
          const f = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
          if (f) await applyImage(f);
        };
        const reloadBtn = iconButton2(
          media,
          "refresh-cw",
          tr2("ui.reloadCard"),
          () => this.renderContactCard(el, name, ctx),
          "cg-profile-edit cg-profile-reload"
        );
        const idBox = media.createDiv({ cls: "cg-profile-id" });
        idBox.createEl("h1", { text: name, cls: "cg-profile-name" });
        const roleParts = [fm.position, fm.company].filter(Boolean);
        const roleText = roleParts.length ? roleParts.join(" \xB7 ") : fm.arbeit || "";
        if (roleText) idBox.createEl("div", { cls: "cg-profile-role", text: String(roleText) });
        const badges = idBox.createDiv({ cls: "cg-badges" });
        const addBadge = (text, cls) => {
          if (text) badges.createEl("span", { cls: `cg-badge ${cls || ""}`, text: String(text) });
        };
        const auto = this.autoMeta(name) || null;
        addBadge(groupLabel(fm.circle || auto && auto.group), "cg-badge-kreis");
        addBadge(fm.relation || auto && auto.label, "cg-badge-verh");
        addBadge(fm.gender === "m" ? "m\xE4nnlich" : fm.gender === "w" ? "weiblich" : "", "cg-badge-muted");
        const bodyBox = profile.createDiv({ cls: "cg-profile-body" });
        const rows = bodyBox.createDiv({ cls: "cg-inforows" });
        const addRow = (label, value) => {
          if (value === void 0 || value === null || value === "") return;
          const r = rows.createDiv({ cls: "cg-inforow" });
          r.createEl("div", { cls: "cg-inforow-label", text: label });
          r.createEl("div", { cls: "cg-inforow-value", text: String(value) });
        };
        if (fm.birthday) {
          const d = new Date(String(fm.birthday));
          const age = isNaN(d) ? null : Math.floor((Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1e3));
          addRow("Geburtstag", d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }) + (age !== null ? ` \xB7 ${age} Jahre` : ""));
        }
        addRow("Ort", fm.location);
        addRow("E-Mail", fm.email);
        addRow("Telefon", Array.isArray(fm.phone) ? fm.phone.join(" \xB7 ") : fm.phone);
        addRow("Website", fm.website);
        addRow("Firma", fm.company);
        addRow("Zuletzt", fm.last_contact);
        const relBox = bodyBox.createDiv({ cls: "cg-relbox" });
        const allNotes2 = this.contacts();
        for (const rt of this.settings.relTypes || DEFAULT_REL_TYPES) {
          const names = asList(fm[rt.field]);
          if (!names.length) continue;
          const group = relBox.createDiv({ cls: "cg-relgroup" });
          group.createDiv({ cls: "cg-cell-label", text: rt.pl || rt.n });
          const chips = group.createDiv({ cls: "cg-chips-box" });
          for (const other of names) {
            const ofm = (allNotes2[other] || {}).fm || {};
            const chip = chips.createEl("span", { cls: "cg-chip cg-chip-link", text: other });
            chip.setAttribute("title", `${other} \xB7 ${this.relLabel(rt.field, ofm.geschlecht)}`);
            chip.onclick = () => this.app.workspace.openLinkText(other, file.path, false);
          }
        }
        const sections = this.parseSections(body);
        const secWrap = card.createDiv({ cls: "cg-sections" });
        const shown = [];
        for (const sec of this.settings.sections || []) {
          const text = sectionText(sections, sec);
          if (text === void 0) continue;
          shown.push(sectionHeading(sec));
          const empty = !text.trim();
          const keepsEmpty = sec.type === "journal" || sec.type === "graph" || sec.type === "address";
          if (empty && !keepsEmpty) continue;
          this.renderSection(secWrap, sec, text, file, name, el, ctx);
        }
        const addWrap = card.createDiv({ cls: "cg-addsection" });
        const addBtn = textIconButton(addWrap, "plus", tr2("section.add"), null, "cg-add-btn");
        addBtn.onclick = (ev) => {
          const menu = new Menu();
          let any = false;
          for (const sec of this.settings.sections || []) {
            const text = sectionText(sections, sec);
            if (text === void 0) {
              any = true;
              menu.addItem((it) => it.setTitle(sectionLabel(sec)).onClick(async () => {
                await this.app.vault.process(file, (c) => c.replace(/\s*$/, "") + `

## ${sectionHeading(sec)}
`);
                new Notice(tr2("ui.sectionAdded", { title: sectionLabel(sec) }));
                this.renderContactCard(el, name, ctx);
                setTimeout(() => {
                  if (sec.type === "graph") {
                    new GraphConfigModal(
                      this.app,
                      this,
                      name,
                      sectionHeading(sec),
                      "",
                      () => this.renderContactCard(el, name, ctx)
                    ).open();
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
          if (!any) {
            new Notice(tr2("ui.sectionAllFilled"));
            return;
          }
          menu.showAtMouseEvent(ev);
        };
        this.hideRawSections(el, shown, ctx, file);
      }
      /* Rohe Überschriften der Abschnitte ausblenden, die als Kasten erscheinen */
      hideRawSections(el, titles, ctx, file) {
        if (!titles || !titles.length) return;
        const root = el.closest(".markdown-preview-view") || el.closest(".markdown-reading-view");
        if (!root) return;
        const hide = (node) => {
          if (node && node.classList) node.classList.add("cg-hidden-section");
        };
        const headingOf = (node) => {
          if (!node || !node.tagName) return null;
          if (/^H[1-6]$/.test(node.tagName)) return node;
          const inner = typeof node.querySelector === "function" ? node.querySelector("h1, h2, h3, h4, h5, h6") : null;
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
              if (level === 1) {
                walk(child);
                continue;
              }
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
        const map2 = /* @__PURE__ */ new Map();
        for (const sec of scanSections(body)) map2.set(sec.title, sec.text);
        return map2;
      }
      async readSection(name, title) {
        return this.store.readSection(name, title);
      }
      async migrateSections(name) {
        return this.store.migrateSections(name);
      }
      async writeSection(name, title, text) {
        return this.store.writeSection(name, title, text);
      }
      renderSection(parent, sec, text, file, name, hostEl, ctx) {
        const box = parent.createDiv({ cls: "cg-section" });
        const head = box.createDiv({ cls: "cg-section-head" });
        head.createEl("div", { cls: "cg-section-title", text: sectionLabel(sec) });
        const tools = head.createDiv({ cls: "cg-section-tools" });
        const editBtn = iconButton2(tools, "pencil", tr2("ui.editSection"), null, "cg-icon-sm");
        const delBtn = iconButton2(tools, "trash-2", tr2("ui.removeSection"), null, "cg-icon-sm");
        delBtn.onclick = () => {
          new ConfirmModal(
            this.app,
            tr2("ui.sectionRemoveConfirm", { title: sectionLabel(sec) }),
            "\xDCberschrift und Inhalt werden aus der Notiz gel\xF6scht.",
            async () => {
              await this.removeSection(name, sectionHeading(sec));
              new Notice(tr2("ui.sectionRemoved", { title: sectionLabel(sec) }));
              this.renderContactCard(hostEl, name, ctx);
              this.refresh();
            }
          ).open();
        };
        if (sec.type === "graph") box.classList.add("cg-section-wide");
        const body = box.createDiv({ cls: "cg-section-body" });
        const showView = () => {
          body.empty();
          if (sec.type === "journal") {
            const all = parseJournal2(text);
            const filter = String(sec.filter || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
            const entries = filter.length ? all.filter((e) => filter.includes(String(e.typ).toLowerCase())) : all;
            const listWrap = body.createDiv({ cls: "cg-journal" });
            if (!entries.length) {
              listWrap.createEl("div", {
                cls: "cg-chip-empty",
                text: filter.length ? `Noch keine Eintr\xE4ge (${sec.filter}).` : tr2("ui.noEntries")
              });
            }
            for (const e of entries) {
              const entryIdx = all.indexOf(e);
              const row = listWrap.createDiv({ cls: "cg-journal-entry" });
              const top = row.createDiv({ cls: "cg-journal-top" });
              top.createEl("span", { cls: "cg-journal-date", text: e.date });
              if (e.typ) top.createEl("span", { cls: "cg-badge cg-badge-journal", text: e.typ });
              if (e.titel) top.createEl("span", { cls: "cg-journal-title", text: e.titel });
              const acts = top.createDiv({ cls: "cg-journal-acts" });
              const ed = iconButton2(acts, "pencil", tr2("ui.editEntry"), () => new JournalEntryModal(
                this.app,
                this,
                name,
                sec,
                e,
                entryIdx,
                () => this.renderContactCard(hostEl, name, ctx)
              ).open());
              const del = iconButton2(acts, "trash-2", tr2("ui.journalDelete"), () => new ConfirmModal(
                this.app,
                tr2("ui.journalDeleteConfirm"),
                `${e.date}${e.titel ? " \xB7 " + e.titel : ""}`,
                async () => {
                  const current = parseJournal2(await this.readSection(name, sectionHeading(sec)));
                  const keep = current.filter((x, i) => i !== entryIdx);
                  await this.writeSection(name, sectionHeading(sec), keep.map(formatJournal2).join("\n\n"));
                  this.renderContactCard(hostEl, name, ctx);
                  this.refresh();
                }
              ).open());
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
            const legacy = String(text).split("\n").map((l) => l.trim()).filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim());
            if (legacy.length && !filter.length) {
              const box2 = listWrap.createDiv({ cls: "cg-journal-legacy" });
              for (const l of legacy) box2.createEl("div", { cls: "cg-journal-line", text: `\u2022 ${l}` });
            }
            const addWrap2 = body.createDiv({ cls: "cg-bar" });
            const addEntry = textIconButton(addWrap2, "plus", tr2("journal.add"), null);
            addEntry.onclick = () => new JournalEntryModal(
              this.app,
              this,
              name,
              sec,
              null,
              -1,
              () => this.renderContactCard(hostEl, name, ctx)
            ).open();
          } else if (sec.type === "gifts") {
            const gifts = parseGifts(text);
            const list = body.createDiv({ cls: "cg-gifts" });
            if (!gifts.length) list.createEl("div", { cls: "cg-chip-empty", text: tr2("gifts.empty") });
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
                next[idx].done = cb.checked ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : "";
                await save(next);
              };
              const main = row.createDiv({ cls: "cg-gift-main" });
              const top = main.createDiv({ cls: "cg-gift-top" });
              top.createEl("span", { cls: "cg-gift-title", text: gift.title });
              if (gift.price) top.createEl("span", { cls: "cg-gift-price", text: gift.price });
              if (gift.description) main.createEl("div", { cls: "cg-gift-desc", text: gift.description });
              if (gift.link) {
                const a = main.createEl("a", { cls: "cg-gift-link", text: tr2("gifts.open"), href: gift.link });
                a.setAttribute("href", gift.link);
                a.setAttribute("target", "_blank");
                a.setAttribute("rel", "noopener");
              }
              const acts = row.createDiv({ cls: "cg-gift-acts" });
              const ed = acts.createEl("button", { cls: "cg-icon-btn cg-icon-sm", attr: { title: tr2("gifts.edit") } });
              setButtonIcon(ed, "pencil");
              ed.onclick = () => new GiftModal(this.app, this, name, sec, gift, idx, () => this.renderContactCard(hostEl, name, ctx)).open();
              const del = acts.createEl("button", { cls: "cg-icon-btn cg-icon-sm", attr: { title: tr2("gifts.delete") } });
              setButtonIcon(del, "trash-2");
              del.onclick = () => new ConfirmModal(this.app, tr2("gifts.deleteConfirm"), gift.title, async () => {
                const next = parseGifts(await this.readSection(name, sectionHeading(sec)));
                next.splice(idx, 1);
                await save(next);
              }).open();
            });
            const addWrap = body.createDiv({ cls: "cg-bar" });
            const addBtn = textIconButton(addWrap, "plus", tr2("gifts.add"), null);
            addBtn.onclick = () => new GiftModal(
              this.app,
              this,
              name,
              sec,
              null,
              -1,
              () => this.renderContactCard(hostEl, name, ctx)
            ).open();
          } else if (sec.type === "graph") {
            this.renderGraphBlock(body, text, name);
          } else if (sec.type === "address" || /^adress/i.test(sectionHeading(sec))) {
            this.renderAddress(body, text);
          } else if (!text.trim()) {
            body.createEl("div", { cls: "cg-chip-empty", text: tr2("card.empty") });
          } else {
            MarkdownRenderer.renderMarkdown(text, body, file.path, this);
          }
        };
        editBtn.onclick = () => {
          if (sec.type === "graph") {
            new GraphConfigModal(
              this.app,
              this,
              name,
              sec.title,
              text,
              () => this.renderContactCard(hostEl, name, ctx)
            ).open();
            return;
          }
          new SectionEditModal(
            this.app,
            this,
            name,
            sectionHeading(sec),
            text,
            () => this.renderContactCard(hostEl, name, ctx)
          ).open();
        };
        showView();
      }
      async removeSection(name, title) {
        return this.store.removeSection(name, title);
      }
      async renderAddress(parent, text) {
        const address = String(text || "").replace(/\n+/g, " ").trim();
        if (!address) {
          parent.createEl("div", { cls: "cg-chip-empty", text: tr2("card.empty") });
          return;
        }
        parent.createDiv({ cls: "cg-address-text", text: address });
        const box = parent.createDiv({ cls: "cg-map" });
        box.setText(tr2("ui.mapLoading"));
        try {
          const key = address.toLowerCase();
          this._geoCache = this._geoCache || /* @__PURE__ */ new Map();
          let hit = this._geoCache.get(key);
          if (!hit) {
            const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(address);
            const res = await fetch(url, { headers: { "Accept": "application/json" } });
            const data = await res.json();
            hit = data && data[0] ? { lat: +data[0].lat, lon: +data[0].lon } : null;
            this._geoCache.set(key, hit);
          }
          if (!hit) {
            box.setText("Keine Koordinaten gefunden.");
            return;
          }
          const d = 4e-3;
          const bbox = [hit.lon - d, hit.lat - d / 2, hit.lon + d, hit.lat + d / 2].join(",");
          const frame = box.createEl("iframe", { cls: "cg-map-frame" });
          frame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${hit.lat},${hit.lon}`;
          frame.setAttribute("loading", "lazy");
          box.setText("");
          box.appendChild(frame);
          const link = box.createEl("a", { cls: "cg-map-link", text: tr2("ui.mapOpen") });
          link.href = `https://www.openstreetmap.org/?mlat=${hit.lat}&mlon=${hit.lon}#map=17/${hit.lat}/${hit.lon}`;
        } catch (err) {
          box.setText(tr2("ui.mapUnavailable"));
        }
      }
      async openCompletion() {
        const plan = this.planCompletion();
        if (!plan.length) {
          new Notice(tr2("ui.nothingDerivable"));
          return;
        }
        new CompletionModal(this.app, this, plan).open();
      }
      refreshAll() {
        this.refresh();
        for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
          const view = leaf && leaf.view;
          if (view && view.previewMode && typeof view.previewMode.rerender === "function") {
            try {
              view.previewMode.rerender(true);
            } catch (err) {
            }
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
      contacts() {
        return this.graph.contacts();
      }
      buildGraph() {
        return this.graph.buildGraph();
      }
      walk(rel, notes, center, depth, familyOnly) {
        return this.graph.walk(rel, notes, center, depth, familyOnly);
      }
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
        try {
          return this.app.vault.adapter.getResourcePath(target.path);
        } catch (e) {
          return null;
        }
      }
      relType(field) {
        const list = this.settings.relTypes || DEFAULT_REL_TYPES;
        return list.find((x) => x.field === field) || null;
      }
      /* Rolle eines Knotens im Bild — auch für Tests ohne DOM */
      roleFor(name, info, notes, center) {
        const isCenter = name === center;
        const isMe = name === this.settings.selfNote;
        if (isCenter) return isMe ? tr2("roles.me") : "";
        if (!info) return "";
        const key = (info.path || []).join(",");
        const g = String(notes[name] && notes[name].fm && notes[name].fm.gender || "").toLowerCase();
        const roleKey = (g.startsWith("m") ? ROLE_M[key] : g.startsWith("w") || g.startsWith("f") ? ROLE_W[key] : null) || ROLE[key] || "";
        let role = roleKey ? this.relKeyLabel(roleKey, g) : "";
        if (key === "relation") {
          const own = clean(notes[name] && notes[name].fm && notes[name].fm.relation || "");
          const mine = clean(notes[center] && notes[center].fm && notes[center].fm.relation || "");
          role = this.verhaeltnisLabel(own || mine, g) || role;
        }
        if ((info.path || []).length === 1) {
          const single = this.relLabel(info.path[0], g);
          if (single) role = single;
        }
        if (notes[name] && notes[name].ghost) {
          const gk = ROLE_M[key] || ROLE_W[key] || ROLE[key] || "";
          const gRole = gk ? this.relKeyLabel(gk, g) : (info.path || []).length === 1 ? this.relLabel(info.path[0], g) : "";
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
          const v = notes[name] && notes[name].fm.relation || "";
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
        return tr2("ui.relation.via", { word, person: short });
      }
      relKeyLabel(key, gender) {
        const g = String(gender || "").toLowerCase();
        const form = g.startsWith("m") ? "m" : g.startsWith("w") || g.startsWith("f") ? "w" : "n";
        return tr2(`relations.${key}.${form}`);
      }
      relLabel(field, gender) {
        const t2 = this.relType(field);
        if (!t2) return "";
        const g = String(gender || "").toLowerCase();
        const form = g.startsWith("m") ? "m" : g.startsWith("w") || g.startsWith("f") ? "w" : "n";
        const loc = tr2(`relations.${t2.key}.${form}`);
        if (loc && loc !== `relations.${t2.key}.${form}`) return loc;
        return form === "m" ? t2.m || t2.n : form === "w" ? t2.w || t2.n : t2.n;
      }
      relPlural(field) {
        const t = this.relType(field);
        return t ? t.pl || t.n : field;
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
      kreisOf(name, notes) {
        return this.graph.kreisOf(name, notes);
      }
      attrValues(name, notes, field) {
        const fm = notes[name] && notes[name].fm || {};
        if (field === "circle") return this.kreisOf(name, notes);
        if (field === "last_name") {
          const parts = String(name).trim().split(/\s+/);
          return parts.length ? [parts[parts.length - 1]] : [];
        }
        const raw = fm[field];
        if (raw === void 0 || raw === null || raw === "") return [];
        const arr = Array.isArray(raw) ? raw : [raw];
        return arr.map((v) => clean(v)).filter(Boolean);
      }
      /* Layout ohne Seiteneffekte: Positionen, Sektoren, Flächen */
      computeLayout(center, notes, found, edges, opts) {
        const probe = sectorLayout({
          center,
          found,
          edges,
          notes,
          W: 0,
          H: 0,
          relType: (f) => this.relType(f)
        });
        const maxR = Math.max(200, probe.maxR);
        const W = Math.max(900, Math.round(maxR * 2 + 260));
        const H = Math.max(760, Math.round(maxR * 2 + 220));
        const cx = W / 2, cy = H / 2;
        const pos = /* @__PURE__ */ new Map();
        for (const [n, p] of probe.pos) pos.set(n, [p[0] + cx, p[1] + cy]);
        const wedge = (a0, a1, r) => {
          const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
          const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
          const large = a1 - a0 > Math.PI ? 1 : 0;
          return `M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
        };
        return {
          center,
          W,
          H,
          cx,
          cy,
          pos,
          wedge,
          sectorOf: probe.sectorOf,
          bounds: probe.bounds,
          sectorCounts: probe.counts,
          maxR,
          mode: opts.mode || "relation",
          sel: opts.sel || /* @__PURE__ */ new Set(),
          depth: opts.depth,
          photos: opts.photos
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
          return rt && THEME_GROUP_COLOR[rt.group] || "var(--text-faint)";
        };
        const dashOf = (kind) => styleFor(kind).dashed ? ' stroke-dasharray="5 5"' : "";
        const defs = [];
        const out = [];
        out.push(`<svg xmlns="http://www.w3.org/2000/svg" class="cg-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`);
        out.push(`<rect width="${W}" height="${H}" fill="var(--background-primary)"/>`);
        const blobOut = [];
        if (mode !== "relation") {
          const groups = /* @__PURE__ */ new Map();
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
              blobOut.push(`<line x1="${members[0][0].toFixed(1)}" y1="${members[0][1].toFixed(1)}" x2="${members[1][0].toFixed(1)}" y2="${members[1][1].toFixed(1)}" stroke="${color}" stroke-opacity="${op}" stroke-width="${pad * 2}" stroke-linecap="round"/>`);
            } else {
              blobOut.push(`<path d="${blobPath(members, pad)}" fill="${color}" fill-opacity="${op}" stroke="${color}" stroke-opacity="${Math.min(1, op + 0.37).toFixed(2)}" stroke-width="1.5"/>`);
            }
            blobOut.push(`<text x="${members[0][0].toFixed(1)}" y="${(members[0][1] - pad - 12).toFixed(1)}" fill="${color}" font-size="10.5" font-weight="600" text-anchor="middle" opacity="0.9">${esc2(value)} (${groups.get(value).length})</text>`);
          }
          if (blobOut.length) out.push(...blobOut);
        }
        for (const sec of SECTORS) {
          const b = L.bounds[sec.id];
          if (!b || b[1] - b[0] < 0.01) continue;
          out.push(`<path class="cg-sector" data-sector="${sec.id}" d="${wedge(b[0], b[1], maxR + 60)}" fill="var(--background-secondary)" fill-opacity="0.55" stroke="var(--background-modifier-border)" stroke-opacity="0.5" stroke-width="1"/>`);
          const mid = (b[0] + b[1]) / 2;
          const lr = maxR + 24;
          out.push(`<text class="cg-sector-label" data-sector="${sec.id}" x="${(cx + lr * Math.cos(mid)).toFixed(1)}" y="${(cy + lr * Math.sin(mid)).toFixed(1)}" fill="var(--text-faint)" font-size="10.5" font-weight="600" text-anchor="middle">${sec.label()}</text>`);
        }
        for (const e of edges.values()) {
          if (!pos.has(e.from) || !pos.has(e.to)) continue;
          const [x1, y1] = pos.get(e.from), [x2, y2] = pos.get(e.to);
          const kind = e.kind;
          let label;
          if (kind === "relation") {
            const v = notes[e.from] && notes[e.from].fm.relation || notes[e.to] && notes[e.to].fm.relation;
            label = this.verhaeltnisLabel(clean(v || ""), "") || "Verh\xE4ltnis";
          } else if (kind === "parent") {
            label = this.relLabel("kinder", notes[e.to] && notes[e.to].fm.gender || "");
          } else {
            const rt = this.relType(kind);
            const g2 = notes[e.to] && notes[e.to].fm.gender || "";
            label = rt ? this.relLabel(kind, g2) : styleFor(kind).label || kind;
          }
          const dx = x2 - x1, dy = y2 - y1;
          const len = Math.hypot(dx, dy) || 1;
          const sign = (e.from.length + e.to.length) % 2 === 0 ? 1 : -1;
          const off = Math.min(46, Math.max(12, len * 0.09)) * sign;
          const mx = (x1 + x2) / 2 - dy / len * off;
          const my = (y1 + y2) / 2 + dx / len * off;
          out.push(`<path class="cg-edge" data-a="${esc2(e.from)}" data-b="${esc2(e.to)}" data-kind="${kind}" data-label="${esc2(clean(label))}" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" d="M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${colorOf(kind)}" stroke-width="1.7" opacity="0.8"${dashOf(kind)}/>`);
        }
        for (const [name, [x, y]] of pos) {
          const isCenter = name === center;
          const isMe = name === this.settings.selfNote;
          const info = found.get(name);
          if (!info) continue;
          const role = this.roleFor(name, info, notes, center);
          const chain = [];
          let cur = name;
          while (cur) {
            chain.unshift(cur);
            cur = found.get(cur) ? found.get(cur).parent : null;
          }
          const dimmed = mode !== "relation" && sel.size > 0 && !this.attrValues(name, notes, mode).some((v) => sel.has(v));
          out.push(`<g class="cg-node${dimmed ? " cg-dim" : ""}" data-name="${esc2(name)}" data-sector="${sectorOf.get(name) || ""}" data-path="${esc2(chain.join("|"))}">`);
          if (photos) {
            const r = isCenter ? 46 : 38;
            const uri = this.photoURI(name, notes);
            const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
            if (isMe) {
              out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 11}" fill="var(--interactive-accent)" fill-opacity="0.22" stroke="var(--interactive-accent)" stroke-opacity="0.6" stroke-width="2"/>`);
              out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 5}" fill="none" stroke="var(--interactive-accent)" stroke-width="1.5"/>`);
            }
            const ghostF = !!(notes[name] && notes[name].ghost);
            out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 3}" fill="var(--background-secondary)" stroke="${ghostF ? "var(--color-orange)" : isCenter ? "var(--interactive-accent)" : "var(--background-modifier-border)"}" stroke-width="${ghostF ? 2 : 2}" ${ghostF ? 'stroke-dasharray="6 4"' : ""}/>`);
            out.push(`<text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" fill="var(--text-faint)" font-size="16" text-anchor="middle">${esc2(initials)}</text>`);
            if (uri) {
              const cid = "cgclip_" + name.replace(/[^A-Za-z0-9]/g, "_");
              defs.push(`<clipPath id="${cid}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/></clipPath>`);
              out.push(`<image x="${(x - r).toFixed(1)}" y="${(y - r).toFixed(1)}" width="${r * 2}" height="${r * 2}" preserveAspectRatio="xMidYMid slice" href="${uri}" xlink:href="${uri}" clip-path="url(#${cid})"/>`);
              out.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="none" stroke="${isCenter || isMe ? "var(--interactive-accent)" : "var(--background-modifier-border)"}" stroke-width="${isCenter || isMe ? 2.5 : 2}"/>`);
            }
            out.push(`<text x="${x.toFixed(1)}" y="${(y + r + 15).toFixed(1)}" fill="var(--text-normal)" font-size="12" font-weight="600" text-anchor="middle">${esc2(name)}</text>`);
            if (role) out.push(`<text x="${x.toFixed(1)}" y="${(y + r + 29).toFixed(1)}" fill="var(--text-muted)" font-size="10.5" text-anchor="middle">${esc2(role)}</text>`);
          } else {
            if (isCenter) {
              out.push(`<text x="${x.toFixed(1)}" y="${(y - 34).toFixed(1)}" fill="var(--text-accent)" font-size="9.5" letter-spacing="1.2" font-weight="600" text-anchor="middle">ZENTRUM</text>`);
            }
            const w = Math.max(96, Math.min(190, 12 + 7.2 * Math.max(name.length, role.length)));
            const h = role ? 46 : 34;
            if (isMe) {
              out.push(`<rect x="${(x - w / 2 - 7).toFixed(1)}" y="${(y - h / 2 - 7).toFixed(1)}" width="${w + 14}" height="${h + 14}" rx="14" fill="var(--interactive-accent)" fill-opacity="0.22" stroke="var(--interactive-accent)" stroke-opacity="0.6" stroke-width="2"/>`);
            }
            const ghost = !!(notes[name] && notes[name].ghost);
            out.push(`<rect x="${(x - w / 2).toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w}" height="${h}" rx="9" fill="${isCenter ? "var(--interactive-accent)" : isMe ? "var(--interactive-accent-hover)" : "var(--background-secondary)"}" stroke="${ghost ? "var(--color-orange)" : isCenter || isMe ? "var(--interactive-accent)" : "var(--background-modifier-border)"}" stroke-width="${ghost ? 1.8 : isCenter || isMe ? 2.5 : 1}" ${ghost ? 'stroke-dasharray="6 4"' : ""}/>`);
            out.push(`<text x="${x.toFixed(1)}" y="${(y - (role ? 4 : -4)).toFixed(1)}" fill="${isCenter || isMe ? "var(--text-on-accent)" : "var(--text-normal)"}" font-size="12.5" font-weight="600" text-anchor="middle">${esc2(name)}</text>`);
            if (role) out.push(`<text x="${x.toFixed(1)}" y="${(y + 13).toFixed(1)}" fill="${isCenter || isMe ? "var(--text-on-accent)" : "var(--text-muted)"}" font-size="10.5" text-anchor="middle">${esc2(role)}</text>`);
          }
          out.push("</g>");
        }
        if (defs.length) out.splice(2, 0, "<defs>" + defs.join("") + "</defs>");
        out.push("</svg>");
        return out.join("\n");
      }
    };
    module2.exports = ContactGraph2;
  }
});

// src/index.js
var ContactGraph = require_plugin();
var { ContactGraphView } = require_view();
var { parseJournal, formatJournal, ghostFrontmatter } = require_markdown();
var { esc } = require_util();
var i18n = require_i18n();
module.exports = ContactGraph;
module.exports.__test = { parseJournal, formatJournal, esc, ghostFrontmatter, ContactGraphView, i18n };
