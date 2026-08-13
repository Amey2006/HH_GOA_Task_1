import styles from "./DecorativeBackground.module.css";

/**
 * Full-bleed decorative backdrop: a dotted outer margin plus faint
 * corner paisley linework. Purely decorative (aria-hidden), and kept
 * deliberately quiet so it reads as texture, not noise.
 */
export default function DecorativeBackground() {
  return (
    <svg
      className={styles.backdrop}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect
        x="24" y="24" width="1152" height="752"
        fill="none" stroke="var(--gold-500)" strokeOpacity="0.28"
        strokeWidth="1.5" strokeDasharray="1 9"
      />
      {[
        { x: 40, y: 40, r: 0 },
        { x: 1160, y: 40, r: 90 },
        { x: 1160, y: 760, r: 180 },
        { x: 40, y: 760, r: 270 },
      ].map(({ x, y, r }, i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`} opacity="0.22">
          <path
            d="M0,0 C22,4 44,16 50,40 C53,53 46,64 34,62 C40,50 30,36 14,26 C8,23 3,12 0,0 Z"
            fill="var(--lime-500)"
          />
        </g>
      ))}
      <g opacity="0.12">
        <path
          d="M300,90 Q600,20 900,90"
          stroke="var(--gold-400)" strokeWidth="1.5" fill="none"
        />
        <path
          d="M300,720 Q600,780 900,720"
          stroke="var(--gold-400)" strokeWidth="1.5" fill="none"
        />
      </g>
    </svg>
  );
}
