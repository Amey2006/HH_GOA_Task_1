import { THEME } from "../config/theme.js";

function setFont(ctx, { fontWeight, fontSize, fontFamily }) {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
}

/** Top banner: condensed serif title with the Devanagari accent below it. */
export function drawHeaderBranding(ctx, size, region) {
  const { branding } = THEME.pfp;
  const cx = size / 2;
  const topY = region.y - 34;

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  setFont(ctx, branding.title);
  ctx.fillStyle = branding.title.color;
  ctx.letterSpacing = `${branding.title.letterSpacing}px`;
  ctx.fillText(branding.title.text, cx, topY - 46);

  setFont(ctx, branding.script);
  ctx.fillStyle = branding.script.color;
  ctx.letterSpacing = "0px";
  ctx.fillText(branding.script.text, cx, topY);

  ctx.restore();
}

/** Bottom badge: monospace event metadata + hashtag, on a translucent plate. */
export function drawFooterBranding(ctx, size, region) {
  const { branding } = THEME.pfp;
  const cx = size / 2;
  const plateY = region.y + region.height + 40;
  const plateHeight = 96;
  const plateWidth = region.width - 20;
  const plateX = cx - plateWidth / 2;

  ctx.save();

  ctx.fillStyle = "rgba(4, 27, 16, 0.55)";
  roundRect(ctx, plateX, plateY, plateWidth, plateHeight, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 197, 24, 0.4)";
  ctx.lineWidth = 1;
  roundRect(ctx, plateX, plateY, plateWidth, plateHeight, 10);
  ctx.stroke();

  ctx.textAlign = "center";
  setFont(ctx, branding.meta);
  ctx.fillStyle = branding.meta.color;
  ctx.letterSpacing = `${branding.meta.letterSpacing}px`;
  ctx.fillText(branding.meta.text, cx, plateY + 40);

  setFont(ctx, branding.hashtag);
  ctx.fillStyle = branding.hashtag.color;
  ctx.letterSpacing = `${branding.hashtag.letterSpacing}px`;
  ctx.fillText(branding.hashtag.text, cx, plateY + 74);

  ctx.restore();
}

/** Tiny organiser credit, bottom-left, in the spirit of the poster's micro-badge. */
export function drawOrganizerTag(ctx, size) {
  ctx.save();
  ctx.font = `500 15px "Space Mono", monospace`;
  ctx.fillStyle = "rgba(200, 230, 201, 0.7)";
  ctx.letterSpacing = "1px";
  ctx.textAlign = "left";
  ctx.fillText("2:47PM STUDIO", 46, size - 30);

  ctx.textAlign = "right";
  ctx.fillText("HH.GOA/26", size - 46, size - 30);
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
