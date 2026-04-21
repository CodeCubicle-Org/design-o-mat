#!/usr/bin/env node
/**
 * design-o-mat — Generate preview.html + preview-dark.html from DESIGN.md (token catalog).
 * If preview.html already exists, writes preview-v2.html / preview-dark-v2.html, etc.
 *
 * Usage:
 *   node scripts/generate-design-previews.mjs [DESIGN.md] [--out <dir>]
 *   npm run generate-previews -- ./DESIGN.md --out ./design-md/my-brand
 */

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const out = { designPath: null, outDir: null, help: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") out.help = true;
    else if (a === "--out" || a === "-o") {
      out.outDir = argv[++i];
      if (!out.outDir) throw new Error("--out requires a directory");
    } else if (!a.startsWith("-") && !out.designPath) out.designPath = a;
  }
  return out;
}

function printHelp() {
  console.log(`scripts/generate-design-previews.mjs — build preview HTML from DESIGN.md

Usage:
  node scripts/generate-design-previews.mjs [path/to/DESIGN.md] [--out <directory>]

Defaults:
  DESIGN.md   .\\DESIGN.md (relative to cwd)
  --out       directory containing DESIGN.md (or cwd if DESIGN.md path has no dir)

Output:
  First run:  preview.html, preview-dark.html
  Later runs: preview-vN.html, preview-dark-vN.html (N = 2, 3, …)
`);
}

function normalizeHex(raw) {
  let h = raw.replace(/^#/, "").toLowerCase();
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  if (h.length !== 6 && h.length !== 8) return null;
  if (!/^[0-9a-f]+$/.test(h)) return null;
  return h.length === 6 ? `#${h}` : `#${h.slice(0, 6)}`;
}

function extractHexes(text) {
  const re = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
  const seen = new Set();
  const ordered = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    const hx = normalizeHex(`#${m[1]}`);
    if (!hx) continue;
    const key = hx.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    ordered.push(hx);
  }
  return ordered;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relativeLuminance({ r, g, b }) {
  const lin = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function extractTitle(text) {
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "Design system preview";
}

function extractFontStack(text) {
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    if (!/font|primary|display|body|typography/i.test(line)) continue;
    const backtick = line.match(/`([^`]{3,120})`/);
    if (backtick) {
      const inner = backtick[1];
      if (/system-ui|sans-serif|serif|monospace|apple|segoe|roboto|inter|helvetica/i.test(inner))
        return inner.split(",")[0].replace(/^['"]|['"]$/g, "").trim() || "system-ui";
    }
  }
  return "Inter";
}

function resolveOutputPair(outDir) {
  const lightBase = path.join(outDir, "preview.html");
  if (!fs.existsSync(lightBase)) {
    return {
      light: lightBase,
      dark: path.join(outDir, "preview-dark.html"),
      suffix: "",
    };
  }
  let v = 2;
  for (;;) {
    const light = path.join(outDir, `preview-v${v}.html`);
    if (!fs.existsSync(light)) {
      return {
        light,
        dark: path.join(outDir, `preview-dark-v${v}.html`),
        suffix: `-v${v}`,
      };
    }
    v++;
  }
}

function buildHtml({
  title,
  fontHint,
  colors,
  mode,
}) {
  const lum = colors.map((c) => ({ hex: c, l: relativeLuminance(hexToRgb(c)) }));
  const sorted = [...lum].sort((a, b) => a.l - b.l);
  const darkest = sorted[0]?.hex ?? "#0d0d0d";
  const lightest = sorted[sorted.length - 1]?.hex ?? "#ffffff";
  const mid = sorted[Math.floor(sorted.length / 2)]?.hex ?? "#666666";

  let bg, fg, muted, border, accent, surface;
  if (mode === "light") {
    bg = lightest;
    fg = darkest;
    muted = sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(sorted.length * 0.35)))]?.hex ?? "#666";
    border = sorted.find((x) => x.l > 0.2 && x.l < 0.85)?.hex ?? "rgba(0,0,0,0.12)";
    accent = sorted.find((x) => x.hex !== bg && x.hex !== fg && x.l > 0.2 && x.l < 0.7)?.hex ?? mid;
    surface = sorted.find((x) => x.l > 0.85 && x.hex !== bg)?.hex ?? "#f4f4f5";
  } else {
    bg = darkest;
    fg = lightest;
    muted = sorted[Math.floor(sorted.length * 0.45)]?.hex ?? "#a1a1a1";
    border = sorted.find((x) => x.l > 0.15 && x.l < 0.5)?.hex ?? "rgba(255,255,255,0.12)";
    accent = sorted.find((x) => x.hex !== bg && x.hex !== fg && x.l > 0.35 && x.l < 0.85)?.hex ?? mid;
    surface = sorted.find((x) => x.l < 0.35 && x.hex !== bg)?.hex ?? "#252525";
  }

  const fontCss =
    fontHint === "Inter"
      ? `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`
      : "";

  const fontFamily =
    fontHint === "Inter"
      ? `'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`
      : `${/^[a-zA-Z][\w\s-]*$/.test(fontHint) ? `'${fontHint.replace(/'/g, "\\'")}'` : "system-ui"}, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif`;

  const swatches = colors
    .map(
      (hex) => `
    <div class="swatch">
      <div class="swatch-block" style="background:${hex}"></div>
      <div class="swatch-meta"><code>${hex}</code></div>
    </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} — ${mode === "light" ? "Light" : "Dark"} preview</title>
  <style>
    ${fontCss}
    :root {
      --bg: ${bg};
      --fg: ${fg};
      --muted: ${muted};
      --border: ${typeof border === "string" && border.startsWith("rgba") ? border : border};
      --accent: ${accent};
      --surface: ${surface};
      --font: ${fontFamily};
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--fg);
      font-size: 15px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .nav {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 24px; border-bottom: 1px solid var(--border);
      position: sticky; top: 0; background: var(--bg); z-index: 10;
    }
    .nav-brand { font-weight: 600; font-size: 14px; }
    .nav-links { display: flex; gap: 20px; list-style: none; }
    .nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; }
    .nav-links a:hover { color: var(--accent); }
    .nav-cta {
      background: var(--accent); color: var(--bg); padding: 8px 16px; border-radius: 8px;
      font-size: 14px; font-weight: 500; text-decoration: none; border: none; cursor: pointer;
    }
    .hero { padding: 64px 24px 48px; text-align: center; max-width: 720px; margin: 0 auto; }
    .hero h1 { font-size: clamp(28px, 4vw, 40px); font-weight: 700; line-height: 1.15; margin-bottom: 12px; }
    .hero p { color: var(--muted); font-size: 17px; margin-bottom: 24px; }
    .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-outline {
      background: transparent; color: var(--fg); border: 1px solid var(--border);
      padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer;
    }
    .section { padding: 40px 24px; max-width: 1100px; margin: 0 auto; }
    .section h2 { font-size: 22px; font-weight: 600; margin-bottom: 16px; }
    .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); margin-bottom: 8px; }
    .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-bottom: 8px; }
    .swatch { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
    .swatch-block { height: 52px; }
    .swatch-meta { padding: 8px; font-size: 11px; }
    .swatch-meta code { font-family: ui-monospace, monospace; color: var(--muted); }
    .type-row { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
    .type-row:last-child { border-bottom: none; }
    .type-sample { font-weight: 600; font-size: 20px; }
    .type-meta { font-size: 11px; color: var(--muted); margin-top: 4px; font-family: ui-monospace, monospace; }
    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
    .card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px;
    }
    .card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .card p { font-size: 14px; color: var(--muted); }
    .form { max-width: 380px; margin-top: 12px; }
    .form label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 4px; }
    .form input {
      width: 100%; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border);
      background: var(--bg); color: var(--fg); font-family: inherit; font-size: 14px; margin-bottom: 12px;
    }
    .form input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
    .footnote { padding: 24px; text-align: center; font-size: 12px; color: var(--muted); max-width: 640px; margin: 0 auto; }
  </style>
</head>
<body>
  <header class="nav">
    <span class="nav-brand">Preview</span>
    <nav><ul class="nav-links"><li><a href="#">Section</a></li><li><a href="#">Docs</a></li></ul></nav>
    <a class="nav-cta" href="#">Action</a>
  </header>
  <main>
    <section class="hero">
      <h1>${escapeHtml(title)}</h1>
      <p>Auto-generated from <code>DESIGN.md</code> hex tokens. Substitute fonts may differ from the spec — trust the markdown for final stacks.</p>
      <div class="hero-actions">
        <a class="nav-cta" href="#">Primary</a>
        <button type="button" class="btn-outline">Secondary</button>
      </div>
    </section>
    <section class="section">
      <p class="section-label">Colors extracted</p>
      <h2>Palette swatches</h2>
      <div class="swatch-grid">${swatches || `<p style="color:var(--muted)">No hex colors found in DESIGN.md.</p>`}</div>
    </section>
    <section class="section">
      <p class="section-label">Typography</p>
      <h2>Type samples</h2>
      <div class="type-row"><div class="type-sample" style="font-size:32px;font-weight:700">Display sample</div><div class="type-meta">32px / 700</div></div>
      <div class="type-row"><div class="type-sample" style="font-size:20px;font-weight:600">Section heading</div><div class="type-meta">20px / 600</div></div>
      <div class="type-row"><div class="type-sample" style="font-size:15px;font-weight:400">Body text for reading comfort and UI density checks.</div><div class="type-meta">15px / 400</div></div>
    </section>
    <section class="section">
      <p class="section-label">Components</p>
      <h2>Cards &amp; form</h2>
      <div class="card-grid">
        <div class="card"><h3>Card title</h3><p>Border, radius, and surface colors are derived from your palette luminance (${mode}).</p></div>
        <div class="card"><h3>Second card</h3><p>Use this page to spot contrast issues vs. your §2–§6 prose.</p></div>
      </div>
      <div class="form">
        <label for="f1">Label</label>
        <input id="f1" type="text" placeholder="Placeholder" />
      </div>
    </section>
  </main>
  <p class="footnote">Generated by scripts/generate-design-previews.mjs · Font hint: ${escapeHtml(fontHint)} · Mode: ${mode}</p>
</body>
</html>`;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const cwd = process.cwd();
  const designPath = path.resolve(cwd, args.designPath || "DESIGN.md");
  if (!fs.existsSync(designPath)) {
    console.error(`Error: DESIGN.md not found: ${designPath}`);
    process.exit(1);
  }

  const outDir = args.outDir
    ? path.resolve(cwd, args.outDir)
    : path.dirname(designPath);
  fs.mkdirSync(outDir, { recursive: true });

  const md = fs.readFileSync(designPath, "utf8");
  const colors = extractHexes(md);
  const title = extractTitle(md);
  const fontHint = extractFontStack(md);

  const { light, dark, suffix } = resolveOutputPair(outDir);
  const lightHtml = buildHtml({ title, fontHint, colors, mode: "light" });
  const darkHtml = buildHtml({ title, fontHint, colors, mode: "dark" });

  fs.writeFileSync(light, lightHtml, "utf8");
  fs.writeFileSync(dark, darkHtml, "utf8");

  const rel = (p) => path.relative(cwd, p) || p;
  console.log(`Wrote ${rel(light)}`);
  console.log(`Wrote ${rel(dark)}`);
  if (suffix)
    console.log(`(Versioned: base preview.html already existed — used *${suffix}* names.)`);
}

main();
