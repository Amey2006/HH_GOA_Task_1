import styles from "./ImagePreview.module.css";
import TechnicalLabel from "./TechnicalLabel.jsx";

export default function ImagePreview({ previewUrl, adjust, onAdjustChange, onReset }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <img
          src={previewUrl}
          alt="Your uploaded photo preview"
          className={styles.photo}
          style={{
            transform: `scale(${adjust.zoom}) translate(${adjust.offsetX * 12}%, ${adjust.offsetY * 12}%)`,
          }}
        />
      </div>

      <div className={styles.controls}>
        <label className={styles.controlRow}>
          <TechnicalLabel dim>Zoom</TechnicalLabel>
          <input
            type="range"
            min="1"
            max="2.2"
            step="0.02"
            value={adjust.zoom}
            onChange={(e) => onAdjustChange({ ...adjust, zoom: Number(e.target.value) })}
            aria-label="Zoom photo"
          />
        </label>
        <label className={styles.controlRow}>
          <TechnicalLabel dim>Horizontal</TechnicalLabel>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.02"
            value={adjust.offsetX}
            onChange={(e) => onAdjustChange({ ...adjust, offsetX: Number(e.target.value) })}
            aria-label="Move photo horizontally"
          />
        </label>
        <label className={styles.controlRow}>
          <TechnicalLabel dim>Vertical</TechnicalLabel>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.02"
            value={adjust.offsetY}
            onChange={(e) => onAdjustChange({ ...adjust, offsetY: Number(e.target.value) })}
            aria-label="Move photo vertically"
          />
        </label>
        <button type="button" className={styles.changeButton} onClick={onReset}>
          Change photo
        </button>
      </div>
    </div>
  );
}
