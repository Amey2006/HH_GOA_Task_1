import { THEME } from "../config/theme.js";
import { drawBackground } from "./drawBackground.js";
import { drawTexture } from "./drawTexture.js";
import { drawCornerFlourishes, drawSparks, drawRegistrationMarks } from "./drawDecorations.js";
import { drawPhoto } from "./drawPhoto.js";
import { drawFrame, drawOuterFrame } from "./drawFrame.js";
import { drawHeaderBranding, drawFooterBranding, drawOrganizerTag } from "./drawBranding.js";
import { drawPalmTrees, drawFlowerClusters, drawFlowerScatter, drawSunburst, drawWaveBand } from "./drawGoaMotifs.js";
import { drawMarginTaglines, drawSideTaglines } from "./drawMarginText.js";

const FONT_STACK = [
  '700 64px "Playfair Display"',
  '800 58px "Noto Sans Devanagari"',
  '700 20px "Space Mono"',
  '700 22px "Space Mono"',
  '500 15px "Space Mono"',
];

async function ensureFontsReady() {
  if (!("fonts" in document)) return;
  try {
    await Promise.all(FONT_STACK.map((f) => document.fonts.load(f)));
    await document.fonts.ready;
  } catch {
    // Fonts still fall back gracefully to the family stack in theme.js.
  }
}

/**
 * Renders the full 1080x1080 HH Goa 2026 PFP onto an offscreen canvas
 * and resolves with a PNG Blob. Runs entirely client-side.
 *
 * `image` must be a loaded HTMLImageElement (already decoded).
 * `adjust` is optional { zoom, offsetX, offsetY } for manual framing.
 */
export async function generatePFP(image, adjust = {}) {
  await ensureFontsReady();

  const { width: size } = THEME.pfp;
  const RENDER_SCALE = 2; // render at 2x, downscale on export for crisp retina output

  const canvas = document.createElement("canvas");
  canvas.width = size * RENDER_SCALE;
  canvas.height = size * RENDER_SCALE;
  const ctx = canvas.getContext("2d");
  ctx.scale(RENDER_SCALE, RENDER_SCALE);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const region = THEME.pfp.photo;

  drawBackground(ctx, size);
  drawTexture(ctx, size);
  drawOuterFrame(ctx, size);
  drawMarginTaglines(ctx, size);
  drawSideTaglines(ctx, size);
  drawCornerFlourishes(ctx, size);
  drawSparks(ctx, size);
  drawRegistrationMarks(ctx, size);
  drawSunburst(ctx, size / 2, region.y - 108, 46);
  drawPalmTrees(ctx, size);
  drawFlowerScatter(ctx, size);
  drawWaveBand(ctx, size, size - 108);

  const archCommands = drawPhoto(ctx, image, region, adjust);
  drawFrame(ctx, region, archCommands);
  drawFlowerClusters(ctx, region);

  drawHeaderBranding(ctx, size, region);
  drawFooterBranding(ctx, size, region);
  drawOrganizerTag(ctx, size);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve({ blob, canvas });
        else reject(new Error("Canvas export failed. Please try again."));
      },
      THEME.pfp.export.format,
      THEME.pfp.export.quality
    );
  });
}
