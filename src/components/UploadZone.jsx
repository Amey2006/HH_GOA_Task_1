import { useCallback, useRef, useState } from "react";
import styles from "./UploadZone.module.css";
import TechnicalLabel from "./TechnicalLabel.jsx";
import ArchFrame from "./ArchFrame.jsx";

const ACCEPT = ".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif";

export default function UploadZone({ onFileSelected, disabled = false }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  return (
    <div
      className={`${styles.zone} ${isDragging ? styles.dragging : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
    >
      <ArchFrame
        className={styles.archWatermark}
        width={520}
        height={340}
        strokeWidth={1.5}
        dashed
      />
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4M12 4L7 9M12 4l5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className={styles.heading}>Upload your photo</h2>
        <p className={styles.hint}>Drag and drop, or choose a file</p>

        <button
          type="button"
          className={styles.button}
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          Choose file
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="visually-hidden"
          aria-label="Upload your photo"
          disabled={disabled}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div className={styles.meta}>
          <TechnicalLabel dim>JPG · PNG · HEIC</TechnicalLabel>
          <TechnicalLabel dim>1080 × 1080 OUTPUT</TechnicalLabel>
        </div>
      </div>
    </div>
  );
}
