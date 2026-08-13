import styles from "./TechnicalLabel.module.css";

/**
 * A small uppercase monospace label used for technical metadata
 * ("1080 × 1080 OUTPUT", coordinate marks, etc). One consistent
 * building block instead of one-off inline styles.
 */
export default function TechnicalLabel({ children, dim = false, as: Tag = "span" }) {
  return (
    <Tag className={`${styles.label} ${dim ? styles.dim : ""}`}>{children}</Tag>
  );
}
