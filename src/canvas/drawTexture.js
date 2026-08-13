/**
 * Adds a faint noise texture so large flat emerald areas don't look
 * like a flat digital gradient. Kept extremely subtle — this is a
 * paper-grain accent, not a visible effect.
 */
export function drawTexture(ctx, size) {
  const density = 2600;
  ctx.save();
  ctx.globalAlpha = 0.035;
  ctx.fillStyle = "#FFFDF5";
  for (let i = 0; i < density; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 0.9;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
