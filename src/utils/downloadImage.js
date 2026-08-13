import { THEME } from "../config/theme.js";

/**
 * Downloads a Blob as a real PNG file using an object URL + a
 * transient anchor click — works across desktop and mobile browsers.
 */
export function downloadImage(blob, filename = THEME.pfp.export.filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke slightly later so slower mobile browsers finish the save.
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
