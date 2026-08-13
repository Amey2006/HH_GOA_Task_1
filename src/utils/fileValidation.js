import { THEME } from "../config/theme.js";

const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "heic", "heif"];
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
];

export function getExtension(file) {
  return file.name.split(".").pop()?.toLowerCase() ?? "";
}

export function isHeic(file) {
  const ext = getExtension(file);
  return (
    ext === "heic" ||
    ext === "heif" ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  );
}

/**
 * Returns { valid: true } or { valid: false, message } — never throws,
 * so callers can show a styled inline error instead of an alert().
 */
export function validateFile(file) {
  if (!file) {
    return { valid: false, message: "No file was selected." };
  }

  const ext = getExtension(file);
  const typeOk =
    ACCEPTED_MIME_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);

  if (!typeOk) {
    return {
      valid: false,
      message: "Unsupported file type. Please upload a JPG, PNG, or HEIC photo.",
    };
  }

  const maxBytes = THEME.productRules.maximumRecommendedFileSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      message: `That photo is too large. Please use a file under ${THEME.productRules.maximumRecommendedFileSizeMB}MB.`,
    };
  }

  if (file.size === 0) {
    return { valid: false, message: "That file looks empty or corrupted." };
  }

  return { valid: true };
}
