import { isHeic } from "./fileValidation.js";

/**
 * Converts a HEIC/HEIF file to a browser-decodable JPEG Blob.
 * Non-HEIC files pass through untouched. heic2any is dynamically
 * imported so its (fairly large) wasm/JS payload is only loaded
 * for the iPhone-photo path, not on every page load.
 */
export async function ensureBrowserCompatible(file) {
  if (!isHeic(file)) return file;

  try {
    const { default: heic2any } = await import("heic2any");
    const result = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92,
    });
    const converted = Array.isArray(result) ? result[0] : result;
    return new File(
      [converted],
      file.name.replace(/\.heic$|\.heif$/i, ".jpg"),
      { type: "image/jpeg" }
    );
  } catch (error) {
    throw new Error(
      "We couldn't convert that HEIC photo. Try exporting it as JPG or PNG and uploading again."
    );
  }
}
