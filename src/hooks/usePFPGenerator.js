import { useCallback, useState } from "react";
import { generatePFP } from "../canvas/generatePFP.js";

export function usePFPGenerator() {
  const [resultBlob, setResultBlob] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | generating | done | error
  const [error, setError] = useState(null);

  const generate = useCallback(async (image, adjust) => {
    setStatus("generating");
    setError(null);
    try {
      const { blob } = await generatePFP(image, adjust);
      const url = URL.createObjectURL(blob);
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setResultBlob(blob);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Generation failed. Please try again.");
    }
  }, []);

  const reset = useCallback(() => {
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setResultBlob(null);
    setStatus("idle");
    setError(null);
  }, []);

  return { resultBlob, resultUrl, status, error, generate, reset };
}
