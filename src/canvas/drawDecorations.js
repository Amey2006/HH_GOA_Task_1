import { THEME } from "../config/theme.js";

/**
 * A single stylised leaf/paisley flourish, drawn with the tip at the
 * origin and growing along +x/+y. Callers translate + rotate + scale
 * the context per corner so one shape definition serves all four.
 */
function drawFlourish(ctx, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(30, 6, 58, 22, 66, 54);
  ctx.bezierCurveTo(70, 70, 60, 84, 44, 82);
  ctx.bezierCurveTo(54, 66, 40, 46, 18, 34);
  ctx.bezierCurveTo(10, 30, 4, 16, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawLeafPair(ctx) {
  const { lime, magenta } = THEME.pfp.decorations;
  ctx.save();
  ctx.globalAlpha = THEME.pfp.decorations.opacity.accent;
  drawFlourish(ctx, lime);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = THEME.pfp.decorations.opacity.secondary;
  ctx.rotate(-0.35);
  ctx.scale(0.62, 0.62);
  drawFlourish(ctx, magenta);
  ctx.restore();
}

function drawCorner(ctx, x, y, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  drawLeafPair(ctx);
  ctx.restore();
}

/** Four symmetric corner flourishes, echoing the poster's floral framing. */
export function drawCornerFlourishes(ctx, size) {
  const inset = 58;
  drawCorner(ctx, inset, inset, 0);
  drawCorner(ctx, size - inset, inset, Math.PI / 2);
  drawCorner(ctx, size - inset, size - inset, Math.PI);
  drawCorner(ctx, inset, size - inset, -Math.PI / 2);
}

/** Tiny spark / star accents scattered with restraint, not as noise. */
export function drawSparks(ctx, size) {
  const { gold } = THEME.colors;
  const points = [
    [size * 0.09, size * 0.46],
    [size * 0.92, size * 0.5],
    [size * 0.5, size * 0.05],
  ];
  ctx.save();
  ctx.fillStyle = gold[400];
  for (const [x, y] of points) {
    drawSpark(ctx, x, y, 7);
  }
  ctx.restore();
}

function drawSpark(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx + r * 0.28, cy - r * 0.28);
  ctx.lineTo(cx + r, cy);
  ctx.lineTo(cx + r * 0.28, cy + r * 0.28);
  ctx.lineTo(cx, cy + r);
  ctx.lineTo(cx - r * 0.28, cy + r * 0.28);
  ctx.lineTo(cx - r, cy);
  ctx.lineTo(cx - r * 0.28, cy - r * 0.28);
  ctx.closePath();
  ctx.fill();
}

/** Technical registration marks + coordinate label, a signature micro-detail. */
export function drawRegistrationMarks(ctx, size) {
  ctx.save();
  ctx.strokeStyle = "rgba(245, 197, 24, 0.6)";
  ctx.lineWidth = 1.5;
  const marks = [
    [46, 46], [size - 46, 46], [46, size - 46], [size - 46, size - 46],
  ];
  for (const [x, y] of marks) {
    ctx.beginPath();
    ctx.moveTo(x - 9, y);
    ctx.lineTo(x + 9, y);
    ctx.moveTo(x, y - 9);
    ctx.lineTo(x, y + 9);
    ctx.stroke();
  }
  ctx.restore();
}
