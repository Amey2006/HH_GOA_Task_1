import { useCallback, useState } from "react";
import "./styles/global.css";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import UploadZone from "./components/UploadZone.jsx";
import ImagePreview from "./components/ImagePreview.jsx";
import GenerateButton from "./components/GenerateButton.jsx";
import ResultPreview from "./components/ResultPreview.jsx";
import ActionButtons from "./components/ActionButtons.jsx";
import Toast from "./components/Toast.jsx";
import ArchClipPath from "./components/ArchClipPath.jsx";
import TechnicalLabel from "./components/TechnicalLabel.jsx";

import { useImageUpload } from "./hooks/useImageUpload.js";
import { usePFPGenerator } from "./hooks/usePFPGenerator.js";
import { downloadImage } from "./utils/downloadImage.js";
import { THEME } from "./config/theme.js";

// A mild upward bias keeps hair/heads from being cropped by default —
// most uploaded portraits/selfies have the face in the upper half.
const DEFAULT_ADJUST = { zoom: 1.05, offsetX: 0, offsetY: -0.35 };

export default function App() {
  const upload = useImageUpload();
  const generator = usePFPGenerator();
  const [adjust, setAdjust] = useState(DEFAULT_ADJUST);
  const [toast, setToast] = useState(null);

  const handleFileSelected = useCallback(
    async (file) => {
      setAdjust(DEFAULT_ADJUST);
      await upload.loadFile(file);
    },
    [upload]
  );

  // Surface upload errors as a toast rather than blocking inline text only.
  if (upload.status === "error" && upload.error && toast?.message !== upload.error) {
    setToast({ message: upload.error, tone: "error" });
  }

  const handleGenerate = useCallback(async () => {
    if (!upload.image) return;
    await generator.generate(upload.image, adjust);
  }, [upload.image, adjust, generator]);

  if (generator.status === "error" && generator.error && toast?.message !== generator.error) {
    setToast({ message: generator.error, tone: "error" });
  }

  const handleDownload = useCallback(() => {
    if (generator.resultBlob) downloadImage(generator.resultBlob);
  }, [generator.resultBlob]);

  const handleStartOver = useCallback(() => {
    upload.reset();
    generator.reset();
    setAdjust(DEFAULT_ADJUST);
  }, [upload, generator]);

  const isReady = upload.status === "ready";
  const isProcessingUpload = upload.status === "converting" || upload.status === "decoding";

  return (
    <>
      <ArchClipPath />
      <Header />

      <main>
        <Hero>
          {generator.status === "done" && generator.resultUrl ? (
            <section aria-label="Generated result">
              <ResultPreview resultUrl={generator.resultUrl}>
                <ActionButtons
                  onDownload={handleDownload}
                  resultBlob={generator.resultBlob}
                  onStartOver={handleStartOver}
                />
              </ResultPreview>
            </section>
          ) : isReady && upload.previewUrl ? (
            <section aria-label="Photo preview and generation">
              <ImagePreview
                previewUrl={upload.previewUrl}
                adjust={adjust}
                onAdjustChange={setAdjust}
                onReset={handleStartOver}
              />
              <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
                <GenerateButton
                  onClick={handleGenerate}
                  loading={generator.status === "generating"}
                  disabled={!upload.image}
                />
              </div>
            </section>
          ) : (
            <section aria-label="Upload photo">
              <UploadZone
                onFileSelected={handleFileSelected}
                disabled={isProcessingUpload}
              />
              {isProcessingUpload && (
                <p style={{ marginTop: 14 }}>
                  <TechnicalLabel dim>
                    {upload.status === "converting" ? "Converting HEIC photo…" : "Reading photo…"}
                  </TechnicalLabel>
                </p>
              )}
            </section>
          )}
        </Hero>
      </main>

      <footer style={{ padding: "24px 0 40px" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
          <TechnicalLabel dim>{THEME.brand.hashtag}</TechnicalLabel>
          <TechnicalLabel dim>2:47PM STUDIO</TechnicalLabel>
        </div>
      </footer>

      <Toast
        message={toast?.message}
        tone={toast?.tone}
        onDismiss={() => setToast(null)}
      />
    </>
  );
}
