/**
 * Calculates a source rectangle from an image so that drawing it into a
 * destination rectangle behaves like CSS `object-fit: cover` — the image
 * fills the destination completely, preserves its aspect ratio, and is
 * never stretched or distorted.
 *
 * Optional zoom/offset let the caller nudge the crop (used by the
 * optional manual adjustment controls). Offsets are in the range
 * [-1, 1] and represent how far the visible window can slide across
 * the excess (cropped-away) portion of the image in each axis.
 */
export function getCoverCrop({
  imageWidth,
  imageHeight,
  destWidth,
  destHeight,
  zoom = 1,
  offsetX = 0,
  offsetY = 0,
}) {
  const destAspect = destWidth / destHeight;
  const srcAspect = imageWidth / imageHeight;

  // Base cover window (before zoom).
  let baseWidth;
  let baseHeight;

  if (srcAspect > destAspect) {
    // Source is relatively wider than destination — crop the sides.
    baseHeight = imageHeight;
    baseWidth = baseHeight * destAspect;
  } else {
    // Source is relatively taller than destination — crop top/bottom.
    baseWidth = imageWidth;
    baseHeight = baseWidth / destAspect;
  }

  // Zoom shrinks the visible window (zoom > 1 = closer crop).
  const clampedZoom = Math.min(Math.max(zoom, 1), 3);
  const cropWidth = Math.min(imageWidth, baseWidth / clampedZoom);
  const cropHeight = Math.min(imageHeight, baseHeight / clampedZoom);

  const maxOffsetX = (imageWidth - cropWidth) / 2;
  const maxOffsetY = (imageHeight - cropHeight) / 2;

  const centerX = imageWidth / 2 + offsetX * maxOffsetX;
  const centerY = imageHeight / 2 + offsetY * maxOffsetY;

  const sx = clamp(centerX - cropWidth / 2, 0, imageWidth - cropWidth);
  const sy = clamp(centerY - cropHeight / 2, 0, imageHeight - cropHeight);

  return {
    sx,
    sy,
    sWidth: cropWidth,
    sHeight: cropHeight,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
