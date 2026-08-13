import { useEffect } from "react";
import styles from "./Toast.module.css";

export default function Toast({ message, tone = "error", onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 6000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className={styles.wrap} role="alert">
      <div className={`${styles.toast} ${tone === "error" ? styles.error : styles.success}`}>
        <span>{message}</span>
        <button
          type="button"
          className={styles.close}
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          ×
        </button>
      </div>
    </div>
  );
}
