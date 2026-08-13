import { getCoverCrop } from "./cropImage.js";
import { buildRectCommands, tracePathOnCanvas } from "./archGeometry.js";

/**
 * Clips to the rectangular photo window and draws the user's image
 * inside it using a cover-fit crop, so the photo always fills the
 * window without ever being stretched or distorted.
 */
export function drawPhoto(ctx, image, region, adjust = {}) {
  const { x, y, width, height } = region;
  const { zoom = 1, offsetX = 0, offsetY = 0 } = adjust;

  // A clean rectangular window, gently rounded at the corners so it
  // still feels designed rather than a hard photo-editing crop.
  const archCommands = buildRectCommands(x, y, width, height, {
    radius: 18,
  });

  ctx.save();
  tracePathOnCanvas(ctx, archCommands);
  ctx.clip();

  // A soft dark base beneath the photo avoids any transparent seam
  // while the image decodes/draws.
  ctx.fillStyle = "#041B10";
  ctx.fillRect(x, y, width, height);

  const crop = getCoverCrop({
    imageWidth: image.width,
    imageHeight: image.height,
    destWidth: width,
    destHeight: height,
    zoom,
    offsetX,
    offsetY,
  });

  ctx.drawImage(
    image,
    crop.sx, crop.sy, crop.sWidth, crop.sHeight,
    x, y, width, height
  );

  // A gentle base-to-top scrim keeps the branding legible over any photo.
  const scrim = ctx.createLinearGradient(0, y + height, 0, y + height * 0.62);
  scrim.addColorStop(0, "rgba(4, 27, 16, 0.55)");
  scrim.addColorStop(1, "rgba(4, 27, 16, 0)");
  ctx.fillStyle = scrim;
  ctx.fillRect(x, y, width, height);

  ctx.restore();

  return archCommands;
}
