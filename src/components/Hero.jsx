import styles from "./Hero.module.css";
import DecorativeBackground from "./DecorativeBackground.jsx";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function Hero({ children }) {
  return (
    <section className={styles.hero}>
      <DecorativeBackground />
      <div className={`container ${styles.inner}`}>
        <TechnicalLabel>HH Goa 2026 · Builder Frame</TechnicalLabel>
        <h1 className={styles.title}>
          Frame yourself
          <br />
          <span className={styles.titleAccent}>for Goa.</span>
        </h1>
        <p className={styles.subtitle}>
          Turn your photo into a Hacker House Goa 2026 builder frame — right
          in your browser, no account needed.
        </p>
        <div className={styles.uploadSlot}>{children}</div>
      </div>
    </section>
  );
}
