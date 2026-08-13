import { useCallback, useState } from "react";
import { validateFile } from "../utils/fileValidation.js";
import { ensureBrowserCompatible } from "../utils/heicConverter.js";

/**
 * Owns the upload → validate → (HEIC convert) → decode pipeline.
 * The photo never leaves the browser: everything here runs on
 * File/Blob objects and object URLs.
 */
export function useImageUpload() {
  const [image, setImage] = useState(null); // decoded HTMLImageElement
  const [previewUrl, setPreviewUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | converting | decoding | ready | error
  const [error, setError] = useState(null);

  const reset = useCallback(() => {
    setImage(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setStatus("idle");
    setError(null);
  }, []);

  const loadFile = useCallback(async (file) => {
    setError(null);

    const validation = validateFile(file);
    if (!validation.valid) {
      setStatus("error");
      setError(validation.message);
      return;
    }

    try {
      setStatus("converting");
      const compatibleFile = await ensureBrowserCompatible(file);

      setStatus("decoding");
      const url = URL.createObjectURL(compatibleFile);
      const decoded = await decodeImage(url);

      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setImage(decoded);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "That photo couldn't be processed. Please try another file.");
    }
  }, []);

  return { image, previewUrl, status, error, loadFile, reset };
}

function decodeImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error("That image looks corrupted and couldn't be opened."));
    img.src = url;
  });
}
