import { THEME } from "../config/theme.js";

/**
 * Fills the canvas with the deep emerald editorial background.
 * A very subtle radial vignette keeps the center calmer than the
 * edges so the photo/frame reads as the focal point.
 */
export function drawBackground(ctx, size) {
  const { emerald } = THEME.colors;

  const linear = ctx.createLinearGradient(0, 0, size, size);
  linear.addColorStop(0, emerald[800]);
  linear.addColorStop(0.55, emerald[900]);
  linear.addColorStop(1, emerald[950]);
  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, size, size);

  const vignette = ctx.createRadialGradient(
    size / 2, size / 2, size * 0.2,
    size / 2, size / 2, size * 0.72
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, size, size);
}
