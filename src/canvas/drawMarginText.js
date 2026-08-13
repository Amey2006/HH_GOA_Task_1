import { THEME } from "../config/theme.js";

const TOP_TAGLINE = "BUILDERS OF GOA  ·  AI × CRYPTO  ·  28–31 OCT 2026  ·  ";
const SIDE_TAGLINE = "CODE BY DAY · BEACH BY DUSK · ";

/**
 * Draws a small repeating tagline in a straight line, clipped to a
 * bounding box, optionally rotated (used for the vertical side runs).
 */
function drawRepeatingLine(ctx, text, { x, y, maxWidth, angleRad = 0, fontSize = 11, color }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angleRad);
  ctx.font = `700 ${fontSize}px "Space Mono", monospace`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "2px";

  let drawn = 0;
  const unit = text;
  const unitWidth = ctx.measureText(unit).width;
  let cursor = 0;
  while (drawn < maxWidth) {
    ctx.fillText(unit, cursor, 0);
    cursor += unitWidth;
    drawn += unitWidth;
  }
  ctx.restore();
}

/** Thin taglines running just inside the outer dotted margin, top and bottom. */
export function drawMarginTaglines(ctx, size) {
  const margin = 32;
  const inset = margin + 20;
  const color = "rgba(200, 230, 201, 0.55)";

  drawRepeatingLine(ctx, TOP_TAGLINE, {
    x: inset,
    y: margin + 10,
    maxWidth: size - inset * 2,
    fontSize: 10,
    color,
  });
}

/** Vertical taglines running up the left and right margins. */
export function drawSideTaglines(ctx, size) {
  const margin = 46;
  const color = "rgba(245, 197, 24, 0.4)";

  drawRepeatingLine(ctx, SIDE_TAGLINE, {
    x: margin,
    y: size - margin - 10,
    maxWidth: size - margin * 2 - 60,
    angleRad: -Math.PI / 2,
    fontSize: 9.5,
    color,
  });

  drawRepeatingLine(ctx, SIDE_TAGLINE, {
    x: size - margin,
    y: margin + 10,
    maxWidth: size - margin * 2 - 60,
    angleRad: Math.PI / 2,
    fontSize: 9.5,
    color,
  });
}
