import { useEffect, useRef } from "react";

/**
 * NetworkBackground
 * Red de puntos conectados (triangulación de Delaunay) que se mueve lentamente.
 * Cada `interval` ms alterna entre negro (por defecto) y azul con una transición suave.
 *
 * Uso:
 *   <NetworkBackground />
 *   <main style={{ position: "relative" }}>...tu contenido...</main>
 */

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Triangulación de Delaunay (Bowyer-Watson). Devuelve pares de índices [a, b].
function delaunayEdges(pts) {
  const n = pts.length;
  const M = 1e6;
  const v = [...pts, { x: -M, y: -M }, { x: M, y: -M }, { x: 0, y: M }];

  const circum = (a, b, c) => {
    const A = v[a], B = v[b], C = v[c];
    const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    if (!d) return null;
    const a2 = A.x * A.x + A.y * A.y;
    const b2 = B.x * B.x + B.y * B.y;
    const c2 = C.x * C.x + C.y * C.y;
    const x = (a2 * (B.y - C.y) + b2 * (C.y - A.y) + c2 * (A.y - B.y)) / d;
    const y = (a2 * (C.x - B.x) + b2 * (A.x - C.x) + c2 * (B.x - A.x)) / d;
    const dx = A.x - x, dy = A.y - y;
    return { x, y, r2: dx * dx + dy * dy };
  };

  let tris = [];
  const first = circum(n, n + 1, n + 2);
  if (first) tris.push({ a: n, b: n + 1, c: n + 2, cc: first });

  for (let i = 0; i < n; i++) {
    const p = v[i];
    const bad = [];
    const keep = [];
    for (const t of tris) {
      const dx = p.x - t.cc.x, dy = p.y - t.cc.y;
      (dx * dx + dy * dy < t.cc.r2 ? bad : keep).push(t);
    }
    const count = new Map();
    for (const t of bad) {
      for (const [e1, e2] of [[t.a, t.b], [t.b, t.c], [t.c, t.a]]) {
        const k = e1 < e2 ? `${e1}-${e2}` : `${e2}-${e1}`;
        const prev = count.get(k);
        count.set(k, prev ? { ...prev, n: prev.n + 1 } : { e1, e2, n: 1 });
      }
    }
    tris = keep;
    for (const { e1, e2, n: c } of count.values()) {
      if (c === 1) {
        const cc = circum(e1, e2, i);
        if (cc) tris.push({ a: e1, b: e2, c: i, cc });
      }
    }
  }

  const edges = new Set();
  for (const t of tris) {
    for (const [e1, e2] of [[t.a, t.b], [t.b, t.c], [t.c, t.a]]) {
      if (e1 < n && e2 < n) edges.add(e1 < e2 ? `${e1}-${e2}` : `${e2}-${e1}`);
    }
  }
  return edges;
}

export default function NetworkBackground({
  baseColor = "#000000",   // estado por defecto
  accentColor = "#5148cc", // azul/índigo como en la imagen de referencia
  interval = 10000,        // ms entre cambios de color
  density = 22000,         // px² por punto (menor = más puntos)
  speed = 14,              // px por segundo
  background = "#ffffff",
  className,
  style,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const base = hexToRgb(baseColor);
    const accent = hexToRgb(accentColor);
    let color = [...base];

    let w = 0, h = 0, dpr = 1;
    let nodes = [];
    let edgeAlpha = new Map();
    let raf = 0;
    let last = performance.now();
    let startTime = last;
    const MARGIN = 80;

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = Math.min(160, Math.max(14, Math.round(((w + MARGIN * 2) * (h + MARGIN * 2)) / density)));
      const cols = Math.ceil(Math.sqrt((total * (w + MARGIN * 2)) / (h + MARGIN * 2)));
      const rows = Math.ceil(total / cols);
      const cw = (w + MARGIN * 2) / cols;
      const ch = (h + MARGIN * 2) / rows;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ang = Math.random() * Math.PI * 2;
          const sp = speed * (0.4 + Math.random() * 0.8);
          nodes.push({
            x: -MARGIN + (c + 0.15 + Math.random() * 0.7) * cw,
            y: -MARGIN + (r + 0.15 + Math.random() * 0.7) * ch,
            vx: Math.cos(ang) * sp,
            vy: Math.sin(ang) * sp,
            r: 2.5 + Math.random() * Math.random() * 6,
          });
        }
      }
      edgeAlpha = new Map();
    };

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Color: negro -> azul -> negro cada `interval` ms, con transición suave
      const phase = Math.floor((now - startTime) / interval) % 2;
      const target = phase === 1 ? accent : base;
      const k = 1 - Math.exp(-dt / 0.7);
      color = color.map((c, i) => c + (target[i] - c) * k);
      const rgb = `rgb(${color[0] | 0},${color[1] | 0},${color[2] | 0})`;

      // Movimiento
      if (!reduceMotion) {
        for (const p of nodes) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < -MARGIN || p.x > w + MARGIN) p.vx *= -1;
          if (p.y < -MARGIN || p.y > h + MARGIN) p.vy *= -1;
        }
      }

      // Conexiones (con fundido para evitar saltos bruscos)
      const edges = delaunayEdges(nodes);
      for (const key of edges) if (!edgeAlpha.has(key)) edgeAlpha.set(key, 0);
      const fade = 1 - Math.exp(-dt / 0.25);
      for (const [key, a] of edgeAlpha) {
        const target = edges.has(key) ? 1 : 0;
        const na = a + (target - a) * fade;
        if (na < 0.01 && target === 0) edgeAlpha.delete(key);
        else edgeAlpha.set(key, na);
      }

      ctx.clearRect(0, 0, w, h);
      if (background) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.strokeStyle = rgb;
      ctx.lineWidth = 1.2;
      for (const [key, a] of edgeAlpha) {
        const [i, j] = key.split("-").map(Number);
        const p = nodes[i], q = nodes[j];
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = rgb;
      for (const p of nodes) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    init();
    raf = requestAnimationFrame(draw);

    const onResize = () => init();
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [baseColor, accentColor, interval, density, speed, background]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}