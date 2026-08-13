/**
 * The scalloped Indian arch is the single visual motif that ties the
 * website UI to the generated PFP (see THEME.decoration + brief §30).
 * It is described here once, as a neutral list of path commands, and
 * then replayed either onto a Canvas 2D context or serialized into an
 * SVG `d` string — so the arch around the upload zone, the arch in the
 * hero background, and the arch framing the exported photo are always
 * the exact same shape.
 *
 * Shape: a multi-cusped ("scalloped") pointed arch — a flat-topped
 * rectangle whose top edge is replaced by a symmetrical row of
 * cusps rising to a central point, in the spirit of Mughal/temple
 * arch silhouettes referenced in the design research.
 */
export function buildArchCommands(x, y, w, h, options = {}) {
  const { cusps = 5, cuspDepth = 0.16, shoulderDrop = 0.1 } = options;

  const cmds = [];
  const cx = x + w / 2;
  const shoulderY = y + h * shoulderDrop;
  const peakY = y;

  cmds.push({ op: "M", p: [x, y + h] });
  cmds.push({ op: "L", p: [x, shoulderY] });

  // Left half of the arch: cusps rising from the left shoulder to the peak.
  const halfCusps = Math.floor(cusps / 2);
  const stepX = (cx - x) / (halfCusps + 0.5);
  const stepY = (shoulderY - peakY) / halfCusps;
  const cuspR = stepX * (1 + cuspDepth);

  let curX = x;
  let curY = shoulderY;
  for (let i = 0; i < halfCusps; i++) {
    const nextX = curX + stepX;
    const nextY = curY - stepY;
    const controlX = curX + stepX * 0.5;
    const controlY = curY - stepY * 0.5 - cuspR * 0.35;
    cmds.push({ op: "Q", p: [controlX, controlY, nextX, nextY] });
    curX = nextX;
    curY = nextY;
  }
  // Final rise to the central peak (skip if the loop already reached it).
  if (Math.abs(curY - peakY) > 0.01 || Math.abs(curX - cx) > 0.01) {
    cmds.push({
      op: "Q",
      p: [curX + (cx - curX) * 0.5, curY - stepY * 0.6, cx, peakY],
    });
  }

  // Mirror back down to the right shoulder.
  curX = cx;
  curY = peakY;
  cmds.push({
    op: "Q",
    p: [curX + stepX * 0.65, curY + stepY * 0.6, curX + stepX, curY + stepY],
  });
  curX = curX + stepX;
  curY = curY + stepY;
  for (let i = 0; i < halfCusps - 1; i++) {
    const nextX = curX + stepX;
    const nextY = curY + stepY;
    const controlX = curX + stepX * 0.5;
    const controlY = curY + stepY * 0.5 - cuspR * 0.35;
    cmds.push({ op: "Q", p: [controlX, controlY, nextX, nextY] });
    curX = nextX;
    curY = nextY;
  }
  cmds.push({ op: "L", p: [x + w, shoulderY] });
  cmds.push({ op: "L", p: [x + w, y + h] });
  cmds.push({ op: "Z", p: [] });

  return cmds;
}

/**
 * A plain rounded-rectangle path, described with the same neutral
 * command list as the arch above, so every caller (photo clip, frame
 * strokes, inset accents) can keep using tracePathOnCanvas /
 * commandsToSvgPath unchanged.
 */
export function buildRectCommands(x, y, w, h, options = {}) {
  const { radius = 0 } = options;
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));

  if (r === 0) {
    return [
      { op: "M", p: [x, y] },
      { op: "L", p: [x + w, y] },
      { op: "L", p: [x + w, y + h] },
      { op: "L", p: [x, y + h] },
      { op: "Z", p: [] },
    ];
  }

  const k = 0.5522847498 * r; // circular bezier approximation constant

  return [
    { op: "M", p: [x + r, y] },
    { op: "L", p: [x + w - r, y] },
    { op: "C", p: [x + w - r + k, y, x + w, y + r - k, x + w, y + r] },
    { op: "L", p: [x + w, y + h - r] },
    { op: "C", p: [x + w, y + h - r + k, x + w - r + k, y + h, x + w - r, y + h] },
    { op: "L", p: [x + r, y + h] },
    { op: "C", p: [x + r - k, y + h, x, y + h - r + k, x, y + h - r] },
    { op: "L", p: [x, y + r] },
    { op: "C", p: [x, y + r - k, x + r - k, y, x + r, y] },
    { op: "Z", p: [] },
  ];
}

export function tracePathOnCanvas(ctx, commands) {
  ctx.beginPath();
  for (const { op, p } of commands) {
    if (op === "M") ctx.moveTo(p[0], p[1]);
    else if (op === "L") ctx.lineTo(p[0], p[1]);
    else if (op === "Q") ctx.quadraticCurveTo(p[0], p[1], p[2], p[3]);
    else if (op === "C") ctx.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
    else if (op === "Z") ctx.closePath();
  }
}

export function commandsToSvgPath(commands) {
  return commands
    .map(({ op, p }) => {
      if (op === "Z") return "Z";
      return `${op}${p.map((n) => Number(n.toFixed(2))).join(",")}`;
    })
    .join(" ");
}
