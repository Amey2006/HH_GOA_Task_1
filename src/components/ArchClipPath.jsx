import { buildArchCommands, commandsToSvgPath } from "../canvas/archGeometry.js";

const commands = buildArchCommands(0, 0, 1, 1, {
  cusps: 3,
  cuspDepth: 0.04,
  shoulderDrop: 0.035,
});
const d = commandsToSvgPath(commands);

/**
 * Mounted once near the app root. Any element can then use
 * `clip-path: url(#hh-arch-clip)` to be cropped into the same
 * scalloped arch used for the exported photo — this is what keeps
 * the live preview and the final PNG visually consistent.
 */
export default function ArchClipPath() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <clipPath id="hh-arch-clip" clipPathUnits="objectBoundingBox">
          <path d={d} />
        </clipPath>
      </defs>
    </svg>
  );
}
