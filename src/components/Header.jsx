import styles from "./Header.module.css";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.mark}>HH GOA</span>
        <TechnicalLabel dim>28–31 OCT 2026 · GOA, INDIA</TechnicalLabel>
      </div>
    </header>
  );
}
