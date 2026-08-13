import styles from "./GenerateButton.module.css";

export default function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          Framing your builder identity
        </>
      ) : (
        "Generate my frame"
      )}
    </button>
  );
}
