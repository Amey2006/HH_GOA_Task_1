/**
 * HH GOA 2026 — FRAME GENERATOR
 * Visual Design System
 *
 * IMPORTANT:
 * Some values are implementation decisions based on the researched
 * HH Goa 2026 visual direction rather than official published brand tokens.
 */

export const THEME = {
  brand: {
    name: "Hacker House Goa",
    shortName: "HH GOA",
    year: "2026",
    hashtag: "#FrameInGoa",
    logo: { text: "HH GOA", year: "2026" },
  },

  colors: {
    emerald: {
      950: "#041B10",
      900: "#072B1B",
      800: "#0D3B26",
      700: "#145333",
      600: "#1B6840",
    },
    gold: { 500: "#F5C518", 400: "#FFD84A", 300: "#FFE77A", 600: "#D4A900" },
    magenta: { 500: "#E91E63", 400: "#F23878", 300: "#FF6B9D" },
    lime: { 500: "#8BC34A", 400: "#A7D866", 300: "#C5EA8C" },
    cream: { 50: "#FFFDF5", 100: "#FAF3D7", 200: "#F1E5B7" },
    white: "#FFFFFF",
    black: "#000000",
    text: {
      primary: "#FFFDF5",
      secondary: "#C8E6C9",
      muted: "#8FB49C",
      inverse: "#072B1B",
    },
    surface: {
      page: "#072B1B",
      elevated: "#0D3B26",
      subtle: "#145333",
      dark: "#041B10",
    },
    border: {
      default: "#F5C518",
      subtle: "rgba(245, 197, 24, 0.35)",
      muted: "rgba(200, 230, 201, 0.25)",
    },
    state: { success: "#8BC34A", error: "#E91E63", warning: "#F5C518" },
  },

  gradients: {
    emeraldDepth: "linear-gradient(145deg, #0D3B26 0%, #072B1B 55%, #041B10 100%)",
    goldGlow: "linear-gradient(135deg, #F5C518 0%, #FFD84A 100%)",
    accent: "linear-gradient(135deg, #E91E63 0%, #8BC34A 100%)",
    subtleSurface: "linear-gradient(180deg, #0D3B26 0%, #072B1B 100%)",
  },

  typography: {
    families: {
      display: '"Playfair Display", Georgia, serif',
      technical: '"Space Mono", "Courier New", monospace',
      body: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fallback: "Arial, Helvetica, sans-serif",
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    sizes: {
      displayXL: "clamp(3rem, 8vw, 7rem)",
      display: "clamp(2.5rem, 6vw, 5rem)",
      h1: "clamp(2.25rem, 5vw, 4rem)",
      h2: "clamp(1.75rem, 3vw, 2.75rem)",
      h3: "clamp(1.4rem, 2vw, 2rem)",
      bodyLarge: "1.125rem",
      body: "1rem",
      bodySmall: "0.875rem",
      caption: "0.75rem",
      technical: "0.75rem",
      button: "0.875rem",
    },
    lineHeights: { tight: 0.95, heading: 1.05, body: 1.5, relaxed: 1.7 },
    letterSpacing: {
      tight: "-0.03em",
      normal: "0",
      wide: "0.08em",
      wider: "0.14em",
      technical: "0.12em",
    },
    transforms: { display: "uppercase", technical: "uppercase", label: "uppercase" },
  },

  spacing: {
    0: "0", 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px",
    8: "32px", 10: "40px", 12: "48px", 16: "64px", 20: "80px", 24: "96px", 32: "128px",
  },

  layout: {
    maxWidth: "1280px",
    pagePadding: { mobile: "20px", tablet: "32px", desktop: "48px" },
    sectionGap: { mobile: "48px", tablet: "64px", desktop: "96px" },
    contentGap: { small: "12px", medium: "24px", large: "40px" },
  },

  breakpoints: { mobile: "480px", tablet: "768px", laptop: "1024px", desktop: "1280px", wide: "1536px" },

  borders: {
    thin: "1px", medium: "2px", thick: "3px",
    styles: { solid: "solid", dashed: "dashed", dotted: "dotted" },
    radius: { none: "0", small: "4px", medium: "8px", large: "16px", pill: "9999px" },
  },

  shadows: {
    subtle: "0 4px 16px rgba(0, 0, 0, 0.15)",
    medium: "0 8px 30px rgba(0, 0, 0, 0.22)",
    strong: "0 16px 50px rgba(0, 0, 0, 0.30)",
    gold: "0 0 24px rgba(245, 197, 24, 0.18)",
    none: "none",
  },

  effects: {
    backdropBlur: "blur(12px)",
    transitions: { fast: "150ms ease", normal: "250ms ease", slow: "400ms ease" },
    opacity: { subtle: 0.15, light: 0.3, medium: 0.55, strong: 0.8 },
  },

  buttons: {
    primary: {
      background: "#F5C518", color: "#072B1B", border: "2px solid #F5C518",
      radius: "4px", height: "48px", paddingX: "24px", fontWeight: 700,
    },
    secondary: {
      background: "transparent", color: "#F5C518", border: "2px solid #F5C518",
      radius: "4px", height: "48px", paddingX: "24px", fontWeight: 700,
    },
    ghost: {
      background: "transparent", color: "#FFFDF5", border: "1px solid rgba(200, 230, 201, 0.25)",
      radius: "4px", height: "44px", paddingX: "20px", fontWeight: 600,
    },
  },

  inputs: {
    height: "52px",
    background: "#041B10",
    border: { width: "1px", color: "rgba(245, 197, 24, 0.5)", focusColor: "#F5C518" },
    radius: "4px",
    paddingX: "16px",
    placeholderColor: "#8FB49C",
    focusRing: "0 0 0 3px rgba(245, 197, 24, 0.15)",
  },

  upload: {
    minHeight: { mobile: "240px", desktop: "320px" },
    borderWidth: "2px",
    borderStyle: "dashed",
    borderColor: "rgba(245, 197, 24, 0.55)",
    hoverBorderColor: "#F5C518",
    background: "rgba(13, 59, 38, 0.5)",
    radius: "8px",
  },

  pfp: {
    width: 1080,
    height: 1080,
    background: "#072B1B",
    photo: { x: 150, y: 210, width: 780, height: 620 },
    safeArea: { x: 108, y: 108, width: 864, height: 864 },
    frame: {
      outerInset: 90,
      innerInset: 135,
      primaryColor: "#F5C518",
      secondaryColor: "#E91E63",
      accentColor: "#8BC34A",
      borderWidth: 10,
      innerBorderWidth: 4,
    },
    branding: {
      title: {
        text: "HACKER HOUSE",
        color: "#F5C518",
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: 64,
        fontWeight: 700,
        letterSpacing: 4,
      },
      script: {
        text: "गोवा",
        color: "#E91E63",
        fontFamily: '"Noto Sans Devanagari", "Mukta", sans-serif',
        fontSize: 58,
        fontWeight: 800,
      },
      meta: {
        text: "GOA, INDIA  //  28–31 OCT 2026",
        color: "#F5C518",
        fontFamily: '"Space Mono", monospace',
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 3,
      },
      hashtag: {
        text: "#FRAMEINGOA",
        color: "#F5C518",
        fontFamily: '"Space Mono", monospace',
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 4,
      },
    },
    decorations: {
      primary: "#F5C518",
      secondary: "#E91E63",
      accent: "#8BC34A",
      opacity: { primary: 1, secondary: 0.9, accent: 0.85 },
      maxVisualDensity: "medium",
    },
    image: {
      fit: "cover",
      preserveAspectRatio: true,
      preventDistortion: true,
      allowPortrait: true,
      allowLandscape: true,
      allowSquare: true,
      defaultPosition: { x: 0.5, y: 0.5 },
      faceSafeMargin: 0.12,
    },
    export: { format: "image/png", quality: 1, filename: "hh-goa-2026-frame.png" },
  },

  decoration: {
    style: "neo-traditional-goan-indian",
    elements: [
      "scalloped arch", "paisley", "botanical flourishes", "leaf motifs",
      "dotted borders", "geometric corner details", "ornamental lines",
      "small technical markers",
    ],
    rules: {
      avoidExcessiveDecoration: true,
      keepPhotoDominant: true,
      avoidGenericCyberpunk: true,
      avoidGenericWeb3Gradient: true,
      avoidRandomNeon: true,
      avoidUnrelatedIllustrationStyles: true,
      preserveWhitespace: true,
      useSymmetryAsStructureNotAsRigidity: true,
    },
  },

  icons: {
    style: "minimal geometric",
    strokeWidth: 1.75,
    size: { small: 16, medium: 20, large: 24 },
    color: "#F5C518",
    preferredImplementation: "SVG",
    avoidEmojiAsPrimaryUIIcon: true,
  },

  motion: {
    enabled: true,
    pageEntrance: "fade-up",
    hover: "subtle-lift",
    uploadSuccess: "scale-in",
    resultReveal: "fade-up",
    duration: { fast: "150ms", normal: "250ms", slow: "450ms" },
  },

  responsive: {
    mobile: {
      navigation: "compact", layout: "single-column", upload: "full-width",
      result: "full-width", actions: "stack-or-wrap", pagePadding: "20px",
    },
    tablet: { layout: "single-column", pagePadding: "32px" },
    desktop: { layout: "two-column-where-useful", pagePadding: "48px" },
  },

  accessibility: {
    minimumTouchTarget: "44px",
    focusOutline: "2px solid #F5C518",
    focusOutlineOffset: "3px",
    respectReducedMotion: true,
    highContrastText: "#FFFDF5",
    altText: {
      logo: "Hacker House Goa 2026",
      upload: "Upload your photo",
      result: "Generated Hacker House Goa 2026 profile picture",
    },
  },

  productRules: {
    noLoginRequired: true,
    noSignupRequired: true,
    noBackendRequiredForCoreFlow: true,
    generateLocally: true,
    photoStaysInBrowser: true,
    supportDragAndDrop: true,
    supportFilePicker: true,
    supportJPG: true,
    supportJPEG: true,
    supportPNG: true,
    supportHEIC: true,
    supportHEIF: true,
    maximumRecommendedFileSizeMB: 15,
    outputMustBeRealImageFile: true,
    mobileFirst: true,
    generatedOutputIsSquare: true,
    outputResolution: "1080x1080",
  },

  restrictions: {
    doNotUseGenericPurpleBlueAITheme: true,
    doNotUseGenericCyberpunkTheme: true,
    doNotUseRandomGlassmorphismEverywhere: true,
    doNotUseExcessiveNeon: true,
    doNotUsePixarStyle: true,
    doNotUseGhibliStyle: true,
    doNotUseAnimeStyleWithoutEvidence: true,
    doNotHideUserFace: true,
    doNotMakePhotoSecondary: true,
    doNotOverloadGraphicWithText: true,
    doNotAddUnnecessaryForms: true,
    doNotRequireAccount: true,
    doNotUploadPhotoToServerUnlessNecessary: true,
    doNotDistortUserPhoto: true,
  },
};

export default THEME;
