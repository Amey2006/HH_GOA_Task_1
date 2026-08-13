import styles from "./ResultPreview.module.css";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function ResultPreview({ resultUrl, children }) {
  return (
    <div className={styles.wrap}>
      <TechnicalLabel>Generated</TechnicalLabel>
      <div className={styles.frame}>
        <img
          src={resultUrl}
          alt="Your generated Hacker House Goa 2026 profile picture"
          className={styles.image}
        />
      </div>
      <div className={styles.meta}>
        <TechnicalLabel dim>HH.GOA // 2026</TechnicalLabel>
        <TechnicalLabel dim>1080 × 1080</TechnicalLabel>
      </div>
      {children}
    </div>
  );
}
