#!/usr/bin/env node
/**
 * design-o-mat — Extract palette (and SVG font-family hints) from an inspiration image.
 *
 * Usage:
 *   node scripts/extract-inspiration-from-image.mjs <path-to-image>
 *
 * Writes: <image-basename>.inspiration-hints.md next to the image file.
 */

import fs from "node:fs";
import path from "node:path";
const MIN_NODE_MAJOR = 24;

function assertNodeVersion() {
  const major = Number.parseInt(process.versions.node.split(".")[0], 10);
  if (!Number.isFinite(major) || major < MIN_NODE_MAJOR) {
    console.error(
      `This script requires Node.js v${MIN_NODE_MAJOR} or newer. Current: ${process.version}`
    );
    process.exit(1);
  }
}

function printHelp() {
  console.log(`scripts/extract-inspiration-from-image.mjs — palette + SVG type hints

Requires Node.js v${MIN_NODE_MAJOR}+ and the \`sharp\` package (\`npm install\` in repo root).

Usage:
  node scripts/extract-inspiration-from-image.mjs <path-to-image>

Output:
  Creates <basename>.inspiration-hints.md beside the image (same directory).

Notes:
  Raster images (JPEG, PNG, WebP, …) do not contain font family metadata. Use a
  visual matcher (WhatTheFont, etc.) and record results in docs/design-definition-form.md §K.
`);
}

function parseArgs(argv) {
  let imagePath = null;
  let help = false;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") help = true;
    else if (!a.startsWith("-") && !imagePath) imagePath = a;
  }
  return { imagePath, help };
}

function rgbToHex(r, g, b) {
  const to = (n) => n.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toLowerCase();
}

function quantizeChannel(v, step) {
  return Math.min(255, Math.round(v / step) * step);
}

/**
 * Extract dominant colors from RGBA buffer (sharp raw).
 * @param {Buffer} buf
 * @param {number} width
 * @param {number} height
 * @param {number} channels
 */
function dominantColorsFromRgba(buf, width, height, channels, { step = 24, maxColors = 10 } = {}) {
  const counts = new Map();
  const stride = channels;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * stride;
      const a = stride >= 4 ? buf[i + 3] : 255;
      if (a < 16) continue;
      const r = quantizeChannel(buf[i], step);
      const g = quantizeChannel(buf[i + 1], step);
      const b = quantizeChannel(buf[i + 2], step);
      const key = rgbToHex(r, g, b);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, maxColors).map(([hex, px]) => ({ hex, px }));
}

function extractSvgFontFamilies(svgText) {
  const out = new Set();
  const patterns = [
    /font-family\s*:\s*([^;}"]+)/gi,
    /font-family\s*=\s*["']([^"']+)["']/gi,
    /@font-face\s*\{[^}]*font-family\s*:\s*([^;}]+)/gi,
  ];
  for (const re of patterns) {
    let m;
    const r = new RegExp(re.source, re.flags);
    while ((m = r.exec(svgText)) !== null) {
      const raw = m[1].trim();
      for (const part of raw.split(",")) {
        const name = part.replace(/^['"]|['"]$/g, "").trim();
        if (name && !/^(sans-serif|serif|monospace|cursive|fantasy|system-ui)$/i.test(name)) {
          out.add(name);
        }
      }
    }
  }
  return [...out];
}

async function loadSharp() {
  try {
    const mod = await import("sharp");
    return mod.default;
  } catch {
    console.error(
      "Missing dependency: sharp. From the repo root run:\n  npm install\n"
    );
    process.exit(1);
  }
}

function buildMarkdown({
  imagePath,
  imageBase,
  swatches,
  svgFonts,
  avgLuminance,
}) {
  const rel = imagePath.split(path.sep).join("/");
  const lines = [];
  lines.push(`# Inspiration hints: \`${imageBase}\``);
  lines.push("");
  lines.push(`Generated from: \`${rel}\``);
  lines.push("");
  lines.push("## Dominant colors (starting points for §B)");
  lines.push("");
  lines.push("| Hex | Approx. share (sampled) |");
  lines.push("|-----|---------------------------|");
  const total = swatches.reduce((s, x) => s + x.px, 0) || 1;
  for (const { hex, px } of swatches) {
    const pct = ((100 * px) / total).toFixed(1);
    lines.push(`| **${hex}** | ${pct}% |`);
  }
  lines.push("");
  lines.push("| Hex | Suggested form role (you decide) |");
  lines.push("|-----|-----------------------------------|");
  for (const { hex } of swatches.slice(0, 6)) {
    lines.push(`| ${hex} |  |`);
  }
  lines.push("");
  if (Number.isFinite(avgLuminance)) {
    const mood =
      avgLuminance > 0.65 ? "Overall sample skews **light**." : avgLuminance < 0.35 ? "Overall sample skews **dark**." : "Overall sample is **mid-tone**.";
    lines.push(`## Light / dark read (very rough)`);
    lines.push("");
    lines.push(`${mood} Mean luminance ≈ ${avgLuminance.toFixed(2)} (0 = black, 1 = white).`);
    lines.push("");
  }
  lines.push("## Typeface hints");
  lines.push("");
  if (svgFonts.length > 0) {
    lines.push("Detected **`font-family` / `@font-face`** strings in this SVG (verify visually):");
    lines.push("");
    for (const f of svgFonts) {
      lines.push(`- ${f}`);
    }
    lines.push("");
    lines.push("Copy approved names into `docs/design-definition-form.md` **§C.1** and **§K**.");
  } else {
    lines.push(
      "For **raster** images, font families are **not** stored in the file. Use a visual matcher on this image or a tight crop of the lettering:"
    );
    lines.push("");
    lines.push("- [MyFonts — WhatTheFont](https://www.myfonts.com/pages/whatthefont)");
    lines.push("");
    lines.push("Record candidates in **§K** of `docs/design-definition-form.md`, then promote winners to **§C**.");
  }
  lines.push("");
  lines.push("## Next steps");
  lines.push("");
  lines.push("- Summarize **what you are borrowing** (mood, contrast, texture—not every hex) in **§K**.");
  lines.push("- Align narrative with [`design-language.md`](../docs/design-language.md).");
  lines.push("");
  return lines.join("\n");
}

async function main() {
  assertNodeVersion();
  const { imagePath, help } = parseArgs(process.argv);
  if (help || !imagePath) {
    printHelp();
    process.exit(help ? 0 : 1);
  }

  const resolved = path.resolve(process.cwd(), imagePath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    console.error(`Not a file: ${resolved}`);
    process.exit(1);
  }

  const ext = path.extname(resolved).toLowerCase();
  const imageBase = path.basename(resolved);
  const outPath = path.join(path.dirname(resolved), `${path.basename(resolved, ext)}.inspiration-hints.md`);

  let svgFonts = [];
  if (ext === ".svg") {
    try {
      const txt = fs.readFileSync(resolved, "utf8");
      svgFonts = extractSvgFontFamilies(txt);
    } catch {
      svgFonts = [];
    }
  }

  const sharp = await loadSharp();
  const pipeline = sharp(resolved, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const maxW = 120;
  const w = meta.width ?? maxW;
  const scale = w > maxW ? maxW / w : 1;
  const targetW = Math.max(1, Math.round((meta.width ?? 1) * scale));
  const { data, info } = await pipeline
    .resize({ width: targetW, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const swatches = dominantColorsFromRgba(data, info.width, info.height, info.channels, {
    step: 28,
    maxColors: 12,
  });

  let avgLuminance = NaN;
  {
    let sum = 0;
    let n = 0;
    const stride = info.channels;
    for (let i = 0; i < data.length; i += stride) {
      const a = stride >= 4 ? data[i + 3] : 255;
      if (a < 16) continue;
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      sum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
      n++;
    }
    if (n > 0) avgLuminance = sum / n;
  }

  const relForMd =
    path.relative(process.cwd(), resolved).split(path.sep).join("/") || resolved.split(path.sep).join("/");
  const md = buildMarkdown({
    imagePath: relForMd,
    imageBase,
    swatches,
    svgFonts,
    avgLuminance,
  });

  fs.writeFileSync(outPath, md, "utf8");
  console.log(`Wrote: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
