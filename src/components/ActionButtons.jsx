import styles from "./ActionButtons.module.css";
import ShareToX from "./ShareToX.jsx";

export default function ActionButtons({ onDownload, resultBlob, onStartOver }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.primaryRow}>
        <button type="button" className={styles.download} onClick={onDownload}>
          Download
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3v10.6l3.3-3.3 1.4 1.4L12 17l-4.7-5.3 1.4-1.4L12 13.6V3h0ZM5 19h14v2H5v-2Z"
            />
          </svg>
        </button>
        <ShareToX resultBlob={resultBlob} />
      </div>
      <button type="button" className={styles.startOver} onClick={onStartOver}>
        Start over
      </button>
    </div>
  );
}
