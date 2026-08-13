import { THEME } from "../config/theme.js";

/**
 * Flat, cartoonish coconut palm tree, drawn with its base at the
 * origin, growing upward. Callers translate/scale/mirror the context.
 * Style: simple flat shapes (not photographic), matching the poster's
 * "traditional folk motif vector illustration" direction rather than
 * a literal render.
 */
function palmTree(ctx, { trunkColor, leafColor, leafColor2 }) {
  ctx.save();

  // Trunk — a gently curved tapered shape.
  ctx.fillStyle = trunkColor;
  ctx.beginPath();
  ctx.moveTo(-6, 0);
  ctx.bezierCurveTo(-10, -40, 4, -80, 2, -122);
  ctx.lineTo(10, -122);
  ctx.bezierCurveTo(10, -80, 2, -40, 6, 0);
  ctx.closePath();
  ctx.fill();

  // Trunk texture rings.
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 1.5;
  for (let i = 1; i < 6; i++) {
    const t = i / 6;
    ctx.beginPath();
    ctx.moveTo(-8 + t * 6, -t * 118);
    ctx.lineTo(8 - t * 1, -t * 118 + 6);
    ctx.stroke();
  }

  // Coconuts.
  ctx.fillStyle = "#5B3A1E";
  [[-3, -118], [5, -122], [1, -112]].forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.ellipse(dx, dy, 5, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // Fronds — six leaves fanning out from the crown.
  const frondAngles = [-100, -60, -25, 10, 45, 85];
  frondAngles.forEach((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    ctx.save();
    ctx.translate(4, -122);
    ctx.rotate(rad);
    ctx.fillStyle = i % 2 === 0 ? leafColor : leafColor2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(45, -10, 92, 4);
    ctx.quadraticCurveTo(50, 14, 0, 6);
    ctx.closePath();
    ctx.fill();
    // Frond midrib line.
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(4, 2);
    ctx.quadraticCurveTo(48, -3, 88, 4);
    ctx.stroke();
    ctx.restore();
  });

  ctx.restore();
}

/**
 * Places two tall palm trees in the side margins, clearly clear of the
 * photo/footer plate (which occupy the horizontal center), so they
 * read as a real beach-postcard flourish rather than a hidden detail.
 */
export function drawPalmTrees(ctx, size) {
  const { lime } = THEME.colors;
  const palette = {
    trunkColor: "#8A5A2E",
    leafColor: lime[500],
    leafColor2: lime[400],
  };

  const baseY = size - 96;

  ctx.save();
  ctx.globalAlpha = 0.95;

  // Left palm, leaning outward, tall enough to read clearly in the margin.
  ctx.save();
  ctx.translate(78, baseY);
  ctx.rotate(-0.1);
  ctx.scale(1.05, 1.05);
  palmTree(ctx, palette);
  ctx.restore();

  // Right palm, mirrored.
  ctx.save();
  ctx.translate(size - 78, baseY);
  ctx.scale(-1.05, 1.05);
  ctx.rotate(-0.1);
  palmTree(ctx, palette);
  ctx.restore();

  ctx.restore();
}

/** A flat, five-petal hibiscus-style blossom, centered at the origin. */
function hibiscus(ctx, color, centerColor) {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i * 2 * Math.PI) / 5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(7, -6, 7, -18, 0, -24);
    ctx.bezierCurveTo(-7, -18, -7, -6, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = centerColor;
  ctx.beginPath();
  ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Small clusters of hibiscus blossoms tucked at the frame's four corners. */
export function drawFlowerClusters(ctx, region) {
  const { magenta, gold, lime } = THEME.colors;

  const clusters = [
    { x: region.x + 10, y: region.y + 10, scale: 1, color: magenta[500] },
    { x: region.x + 32, y: region.y + 26, scale: 0.6, color: gold[400] },
    { x: region.x + region.width - 10, y: region.y + 10, scale: 1, color: magenta[500] },
    { x: region.x + region.width - 32, y: region.y + 26, scale: 0.6, color: gold[400] },
    { x: region.x + 10, y: region.y + region.height - 10, scale: 1, color: gold[400] },
    { x: region.x + region.width - 10, y: region.y + region.height - 10, scale: 1, color: gold[400] },
  ];

  ctx.save();
  for (const c of clusters) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.scale(c.scale, c.scale);
    hibiscus(ctx, c.color, lime[300]);
    ctx.restore();
  }
  ctx.restore();
}

/** A handful of extra blossoms scattered near the base, beside the palms. */
export function drawFlowerScatter(ctx, size) {
  const { magenta, gold, lime } = THEME.colors;
  const spots = [
    { x: 150, y: size - 150, scale: 0.7, color: magenta[400] },
    { x: 200, y: size - 108, scale: 0.5, color: gold[400] },
    { x: size - 150, y: size - 150, scale: 0.7, color: magenta[400] },
    { x: size - 200, y: size - 108, scale: 0.5, color: gold[400] },
  ];
  ctx.save();
  ctx.globalAlpha = 0.85;
  for (const s of spots) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.scale(s.scale, s.scale);
    hibiscus(ctx, s.color, lime[300]);
    ctx.restore();
  }
  ctx.restore();
}

/** A stylised sunburst — a handful of flat gold rays behind the title. */
export function drawSunburst(ctx, cx, cy, radius) {
  const { gold } = THEME.colors;
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = gold[400];
  const rays = 14;
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const len = i % 2 === 0 ? radius : radius * 0.7;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(0, -len);
    ctx.lineTo(3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.fillStyle = gold[300];
  ctx.arc(cx, cy, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** A gentle layered wave band, echoing the Goan coastline, near the footer. */
export function drawWaveBand(ctx, size, baselineY) {
  const layers = [
    { amp: 7, offset: 0, color: "rgba(245, 197, 24, 0.35)" },
    { amp: 10, offset: 16, color: "rgba(139, 195, 74, 0.28)" },
    { amp: 6, offset: 30, color: "rgba(245, 197, 24, 0.18)" },
  ];

  ctx.save();
  for (const layer of layers) {
    ctx.beginPath();
    ctx.moveTo(0, baselineY + layer.offset);
    const waveLength = 90;
    for (let x = 0; x <= size; x += waveLength) {
      const y = baselineY + layer.offset + Math.sin(x / waveLength) * layer.amp;
      ctx.quadraticCurveTo(x + waveLength / 2, y - layer.amp, x + waveLength, baselineY + layer.offset);
    }
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();
}
