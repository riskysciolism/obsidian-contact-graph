const { setIcon } = require("obsidian");
const clean = (v) =>
  String(v).trim().replace(/^!?\[\[|\]\]$/g, "").split("|")[0].replace(/#.*$/, "").trim();

const asList = (v) => {
  if (v === undefined || v === null || v === "") return [];
  const arr = Array.isArray(v) ? v : [v];
  return arr.map(clean).filter(Boolean);
};

/* Frontmatter für einen Platzhalter, der angelegt wird */

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
        svgEl.querySelectorAll(`.cg-sector[data-sector="${sec}"], .cg-sector-label[data-sector="${sec}"]`)
          .forEach((s) => s.classList.add("cg-on"));
      }
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



/* ---------------- Sektor-Layout ---------------- */

function attachZoom(container, svgEl, state) {
  const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
  const W = (vb && vb.width) || 900;
  const H = (vb && vb.height) || 760;
  svgEl.setAttribute("width", W);
  svgEl.setAttribute("height", H);

  const host = container.parentElement || container;
  host.classList.add("cg-zoom-host");
  const bar = host.createDiv({ cls: "cg-zoom" });
  const out = bar.createEl("button", { text: "−", cls: "cg-zoom-btn", attr: { title: "kleiner" } });
  const label = bar.createEl("span", { cls: "cg-zoom-label" });
  const inp = bar.createEl("button", { text: "＋", cls: "cg-zoom-btn", attr: { title: "größer" } });
  const reset = bar.createEl("button", { text: "⟲", cls: "cg-zoom-btn", attr: { title: "Standardgröße und Mitte" } });

  /* Mitte der Zeichenfläche in die Mitte des Sichtfensters holen */
  const centerView = () => {
    const maxX = container.scrollWidth - container.clientWidth;
    const maxY = container.scrollHeight - container.clientHeight;
    container.scrollLeft = maxX > 0 ? Math.round(maxX / 2) : 0;
    container.scrollTop = maxY > 0 ? Math.round(maxY / 2) : 0;
  };

  /* Eingebettet startet der Graph in Spaltenbreite, in der Seitenleiste in Originalgröße */
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
    if (Math.abs(next - prev) < 0.001 && svgEl.style.width) return;
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
      y: (touches[0].clientY + touches[1].clientY) / 2 - rect.top,
    };
  };
  container.addEventListener("touchstart", (ev) => {
    if (ev.touches.length === 2) { startDist = dist(ev.touches); startZ = state.z || 1; startAnchor = mid(ev.touches); }
  }, { passive: true });
  container.addEventListener("touchmove", (ev) => {
    if (ev.touches.length === 2 && startDist) {
      ev.preventDefault();
      apply(startZ * (dist(ev.touches) / startDist), startAnchor);
    }
  }, { passive: false });
  container.addEventListener("touchend", () => { startDist = 0; startAnchor = null; }, { passive: true });

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
  lower.pop(); upper.pop();
  return lower.concat(upper);
}

/* weiche, geschlossene Form um eine Punktmenge */

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
    return [x + (dx / len) * pad, y + (dy / len) * pad];
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

/* Gelee-Blobs: ein Feld um die Mitglieder, Kontur bei Schwelle T.
   Ergibt eine oder mehrere weiche Flächen, die sich um fremde Knoten
   herumziehen und nur getrennt werden, wenn kein Feld mehr übrig bleibt. */
/* Gelee-Blobs aus einem Skelett:
   Die Mitglieder werden über einen minimalen Spannbaum verbunden, das Band darum
   ist die Fläche. Fremde Knoten werden ausgestanzt — die Fläche weicht ihnen aus. */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ------------------------------------------------------------------ */

module.exports = { iconButton, setButtonIcon, textIconButton, clean, asList, esc, hull, blobPath, attachGraphHover, attachZoom };

/* Flacher Icon-Knopf (Lucide über Obsidian) */
function iconButton(parent, icon, title, onClick, cls) {
  const btn = parent.createEl("button", {
    cls: `cg-icon-btn ${cls || ""}`.trim(),
    attr: { title: title || "", "aria-label": title || "", type: "button" },
  });
  btn.dataset.icon = icon;
  try { setIcon(btn, icon); } catch (e) { btn.setText(""); }
  if (onClick) btn.onclick = onClick;
  return btn;
}

/* Icon eines bestehenden Knopfes tauschen */
function setButtonIcon(btn, icon, title) {
  btn.empty();
  btn.dataset.icon = icon;
  try { setIcon(btn, icon); } catch (e) { /* egal */ }
  if (title) { btn.setAttribute("title", title); btn.setAttribute("aria-label", title); }
  return btn;
}

/* Flacher Knopf mit Icon und Beschriftung */
function textIconButton(parent, icon, label, onClick, cls) {
  const btn = parent.createEl("button", { cls: `cg-btn cg-text-btn ${cls || ""}`.trim(), attr: { type: "button" } });
  const ico = btn.createSpan({ cls: "cg-btn-ico" });
  try { setIcon(ico, icon); } catch (e) { /* egal */ }
  btn.createSpan({ cls: "cg-btn-label", text: label });
  if (onClick) btn.onclick = onClick;
  return btn;
}
