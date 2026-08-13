import { buildArchCommands, commandsToSvgPath } from "../canvas/archGeometry.js";

/**
 * Renders the scalloped arch as an SVG path. Used around the upload
 * zone, in the hero backdrop, and around the result preview — the
 * same shape that clips the user's photo in the generated PNG, so
 * the site and the artifact feel like one visual world.
 */
export default function ArchFrame({
  width = 400,
  height = 320,
  stroke = "var(--gold-500)",
  strokeWidth = 2,
  fill = "none",
  dashed = false,
  className,
  cusps = 3,
  cuspDepth = 0.04,
  shoulderDrop = 0.035,
}) {
  const inset = strokeWidth;
  const commands = buildArchCommands(
    inset,
    inset,
    width - inset * 2,
    height - inset * 2,
    { cusps, cuspDepth, shoulderDrop }
  );
  const d = commandsToSvgPath(commands);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="presentation"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinejoin="round"
        strokeDasharray={dashed ? "2 7" : undefined}
      />
    </svg>
  );
}
