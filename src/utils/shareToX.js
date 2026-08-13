import { THEME } from "../config/theme.js";

const CAPTION = `Just got framed for ${THEME.brand.name} ${THEME.brand.year} 🌴✨ See you on the beach, builders. ${THEME.brand.hashtag} ${THEME.brand.year}`;

/**
 * Why there's no fully automatic "post with image attached" button:
 * X's web share intent (twitter.com/intent/tweet) only ever accepts
 * `text` and `url` query params — it has never supported attaching a
 * local file. The only way to truly automate posting *with* media is
 * X's authenticated media-upload API, which needs the user's own
 * developer/API credentials and a server to call it from; a website
 * can't do that on a stranger's behalf, and a browser-automation tool
 * like Playwright can't run inside another visitor's browser tab
 * either — it's a Node-side tool for driving a browser you control,
 * not something a webpage can invoke against the person viewing it.
 *
 * So instead we do the next best thing, which actually works today:
 *
 * 1. Mobile (Web Share API with file support): share the PNG + caption
 *    directly — the OS share sheet's X option posts with the image
 *    already attached.
 * 2. Desktop: copy the PNG to the clipboard, then open the X composer
 *    with the caption pre-filled. The user just presses Cmd/Ctrl+V
 *    once in the compose box and the image attaches — X reads pasted
 *    image data natively, so this is a one-paste, not a re-upload.
 *
 * Returns { method: "files" | "clipboard" | "intent" | "cancelled" }
 * so the UI can tailor its follow-up messaging.
 */
export async function shareToX(blob, filename = THEME.pfp.export.filename) {
  if (navigator.canShare && blob) {
    const file = new File([blob], filename, { type: "image/png" });
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          text: CAPTION,
        });
        return { method: "files" };
      } catch (error) {
        if (error?.name === "AbortError") {
          return { method: "cancelled" };
        }
        // Fall through to the clipboard/intent fallback on any other failure.
      }
    }
  }

  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(CAPTION)}`;

  if (navigator.clipboard && window.ClipboardItem && blob) {
    try {
      await navigator.clipboard.write([
        new window.ClipboardItem({ "image/png": blob }),
      ]);
      window.open(intentUrl, "_blank", "noopener,noreferrer");
      return { method: "clipboard" };
    } catch {
      // Clipboard write can be blocked by permissions/browser support —
      // fall through to the text-only intent below.
    }
  }

  window.open(intentUrl, "_blank", "noopener,noreferrer");
  return { method: "intent" };
}
