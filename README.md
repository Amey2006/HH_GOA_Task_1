# HH Goa 2026 — Frame Yourself

A client-side PFP/frame generator for the Hacker House Goa 2026 shortlisting
task (Format A). Upload a photo, get back a branded 1080×1080 builder frame,
download it, share it to X. No login, no backend, no server-side image
processing — everything runs in the browser.

## Why it looks the way it does

The visual system ("Goan Digital Atelier") is built entirely from
`src/config/theme.js`, which encodes the researched HH Goa 2026 identity:
deep emerald backgrounds, gold ornamental linework, restrained magenta/lime
accents, and a scalloped Indian arch as the one recurring motif. That same
arch shape (`src/canvas/archGeometry.js`) is used to:

- clip the live photo preview in the browser (via an SVG `clipPath`),
- frame the upload zone as a faint watermark,
- clip and border the user's photo in the exported PNG (via Canvas).

So the interface and the generated artifact read as one coherent world
instead of two unrelated systems.

## Architecture

```
src/
  components/     UI building blocks (upload, preview, result, decoration)
  canvas/          The PFP generator, split into single-purpose modules:
                     generatePFP.js   — orchestrates the render pipeline
                     drawBackground.js, drawTexture.js — base layers
                     drawPhoto.js, cropImage.js — cover-fit crop + clip
                     drawFrame.js, drawDecorations.js — ornamental layers
                     drawBranding.js — title / Devanagari / metadata text
                     archGeometry.js — the shared arch shape (Canvas + SVG)
  hooks/           useImageUpload (upload→HEIC-convert→decode pipeline),
                     usePFPGenerator (wraps generatePFP with load/error state)
  utils/           fileValidation, heicConverter, downloadImage, shareToX
  config/theme.js  Single source of truth for every design token
```

### Photo processing

Uploaded photos are cover-fit cropped (`cropImage.js`) around their visual
center, so portrait, landscape, and square photos all fill the arch window
without stretching or distortion. Optional zoom/pan sliders let a person
nudge the crop; the default (no adjustment) already looks correct for a
centered subject.

### HEIC/HEIF

Detected by extension/MIME type in `fileValidation.js`. If a file is HEIC,
`heicConverter.js` lazy-loads `heic2any` (dynamic `import()`, so the ~340KB
gzip payload only loads for iPhone photos) and converts it to a JPEG blob
before decoding. Conversion failures produce a clear inline error — never a
silent failure.

### Sharing to X

X's web intent cannot attach a local image to a pre-filled tweet — only
text. So sharing works two ways, decided at runtime:

1. **Web Share API with files** (supported on most mobile browsers): shares
   the actual PNG plus caption through the OS share sheet.
2. **Fallback** (desktop / unsupported browsers): opens X with the caption
   pre-filled and tells the person to attach the photo they just downloaded.
   Download sits right next to Share so this is a one-step handoff.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Deploying to Vercel

This is a static Vite app — no configuration needed:

```bash
npm i -g vercel
vercel
```

Or connect the repo in the Vercel dashboard; it auto-detects the Vite
framework preset (build command `vite build`, output directory `dist`).

## Known limitations / assumptions

- No official HH Goa 2026 brand asset kit was available, so the arch,
  colors, and typography are implementation decisions based on the design
  research provided, not pixel-exact reproductions of an official file.
- Devanagari script renders via the Noto Sans Devanagari web font rather
  than a custom calligraphic face (none was specified/available).
- Attaching an image directly to a prefilled X post isn't possible through
  the public web intent; see "Sharing to X" above for the honest fallback.
