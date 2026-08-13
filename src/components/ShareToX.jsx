import { useState } from "react";
import { shareToX } from "../utils/shareToX.js";
import styles from "./ShareToX.module.css";

export default function ShareToX({ resultBlob }) {
  const [note, setNote] = useState("Press CTRL+V / ⌘V in the post box to attach your frame.");

  const handleShare = async () => {
    const { method } = await shareToX(resultBlob);
    if (method === "clipboard") {
      setNote("Your frame is copied and X is open — press ⌘V / Ctrl+V in the post box to attach it.");
    } else if (method === "intent") {
      setNote("X is open with your caption ready — attach the photo you downloaded.");
    } else if (method === "files") {
      setNote("Your frame is ready for upload.");
    }
  };

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.button} onClick={handleShare}>
        Share to
        <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-7.3L4.2 22H1l8.2-9.3L1 2h7.3l5 6.7L18.9 2Zm-1.2 18h1.9L6.4 4H4.4l13.3 16Z"
          />
        </svg>
      </button>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  );
}
