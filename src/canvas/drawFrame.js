import { THEME } from "../config/theme.js";
import { buildRectCommands, tracePathOnCanvas } from "./archGeometry.js";

/**
 * A tiny four-petal blossom used to stud the frame border, drawn with
 * its center at the origin. Callers translate/scale/rotate per spot.
 */
function drawBudMotif(ctx, size, petalColor, centerColor) {
  ctx.save();
  ctx.fillStyle = petalColor;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size * 0.35, -size * 0.1, size * 0.35, -size * 0.55, 0, -size * 0.75);
    ctx.bezierCurveTo(-size * 0.35, -size * 0.55, -size * 0.35, -size * 0.1, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = centerColor;
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Studs a rectangular path with small evenly-spaced blossoms, so the
 * gold border reads as a hand-designed floral frame rather than a
 * flat rectangle.
 */
function drawFloralBorder(ctx, region, outset) {
  const { gold, magenta, lime } = THEME.colors;
  const x = region.x - outset;
  const y = region.y - outset;
  const w = region.width + outset * 2;
  const h = region.height + outset * 2;
  const spacing = 92;
  const budSize = 15;

  const placeAlongEdge = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.round(len / spacing));
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const px = x1 + dx * t;
      const py = y1 + dy * t;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      drawBudMotif(ctx, budSize, i % 2 === 0 ? magenta[400] : gold[400], lime[300]);
      ctx.restore();
    }
  };

  ctx.save();
  ctx.globalAlpha = 0.92;
  placeAlongEdge(x, y, x + w, y); // top
  placeAlongEdge(x, y + h, x + w, y + h); // bottom
  placeAlongEdge(x, y, x, y + h); // left
  placeAlongEdge(x + w, y, x + w, y + h); // right
  ctx.restore();
}

/**
 * Draws the ornamental gold rectangular border directly around the
 * photo region, plus a thinner inset accent line and a studded
 * floral border, so a plain rectangle still reads as custom-designed
 * rather than a flat "gold box" crop.
 */
export function drawFrame(ctx, region, archCommands) {
  const { frame } = THEME.pfp;

  // A slim magenta accent line just outside the main gold border —
  // the "custom-designed" layered frame the brief asks for, instead
  // of a single flat gold rectangle.
  const outset = 9;
  const accentCommands = buildRectCommands(
    region.x - outset,
    region.y - outset,
    region.width + outset * 2,
    region.height + outset * 2,
    { radius: 22 }
  );
  tracePathOnCanvas(ctx, accentCommands);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = frame.secondaryColor;
  ctx.globalAlpha = 0.75;
  ctx.stroke();
  ctx.globalAlpha = 1;

  tracePathOnCanvas(ctx, archCommands);
  ctx.lineWidth = frame.borderWidth;
  ctx.strokeStyle = frame.primaryColor;
  ctx.lineJoin = "round";
  ctx.stroke();

  const inset = 14;
  const innerCommands = buildRectCommands(
    region.x + inset,
    region.y + inset,
    region.width - inset * 2,
    region.height - inset * 2,
    { radius: 10 }
  );
  tracePathOnCanvas(ctx, innerCommands);
  ctx.lineWidth = frame.innerBorderWidth;
  ctx.strokeStyle = "rgba(245, 197, 24, 0.55)";
  ctx.setLineDash([2, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Small blossoms studded along the outer border — the "flowers on
  // the frame" detail — sitting just outside the accent line.
  drawFloralBorder(ctx, region, outset + 14);
}

/**
 * Outer canvas-edge treatment: a dotted gold margin line plus a thin
 * solid rule, echoing the official poster's dual outer frame.
 */
export function drawOuterFrame(ctx, size) {
  const { safeArea } = THEME.pfp;
  const margin = 32;

  ctx.save();
  ctx.strokeStyle = "rgba(245, 197, 24, 0.85)";
  ctx.lineWidth = 2;
  ctx.setLineDash([1, 7]);
  ctx.strokeRect(margin, margin, size - margin * 2, size - margin * 2);
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(245, 197, 24, 0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    safeArea.x - 20,
    safeArea.y - 20,
    safeArea.width + 40,
    safeArea.height + 40
  );
  ctx.restore();
}
