// // // import { THEME } from "../config/theme.js";

// // // const CAPTION = `Just got framed for ${THEME.brand.name} ${THEME.brand.year} 🌴✨ See you on the beach, builders. ${THEME.brand.hashtag} ${THEME.brand.year}`;

// // // /**
// // //  * Why there's no fully automatic "post with image attached" button:
// // //  * X's web share intent (twitter.com/intent/tweet) only ever accepts
// // //  * `text` and `url` query params — it has never supported attaching a
// // //  * local file. The only way to truly automate posting *with* media is
// // //  * X's authenticated media-upload API, which needs the user's own
// // //  * developer/API credentials and a server to call it from; a website
// // //  * can't do that on a stranger's behalf, and a browser-automation tool
// // //  * like Playwright can't run inside another visitor's browser tab
// // //  * either — it's a Node-side tool for driving a browser you control,
// // //  * not something a webpage can invoke against the person viewing it.
// // //  *
// // //  * So instead we do the next best thing, which actually works today:
// // //  *
// // //  * 1. Mobile (Web Share API with file support): share the PNG + caption
// // //  *    directly — the OS share sheet's X option posts with the image
// // //  *    already attached.
// // //  * 2. Desktop: copy the PNG to the clipboard, then open the X composer
// // //  *    with the caption pre-filled. The user just presses Cmd/Ctrl+V
// // //  *    once in the compose box and the image attaches — X reads pasted
// // //  *    image data natively, so this is a one-paste, not a re-upload.
// // //  *
// // //  * Returns { method: "files" | "clipboard" | "intent" | "cancelled" }
// // //  * so the UI can tailor its follow-up messaging.
// // //  */
// // // export async function shareToX(blob, filename = THEME.pfp.export.filename) {
// // //   if (navigator.canShare && blob) {
// // //     const file = new File([blob], filename, { type: "image/png" });
// // //     if (navigator.canShare({ files: [file] })) {
// // //       try {
// // //         await navigator.share({
// // //           files: [file],
// // //           text: CAPTION,
// // //         });
// // //         return { method: "files" };
// // //       } catch (error) {
// // //         if (error?.name === "AbortError") {
// // //           return { method: "cancelled" };
// // //         }
// // //         // Fall through to the clipboard/intent fallback on any other failure.
// // //       }
// // //     }
// // //   }

// // //   const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(CAPTION)}`;

// // //   if (navigator.clipboard && window.ClipboardItem && blob) {
// // //     try {
// // //       await navigator.clipboard.write([
// // //         new window.ClipboardItem({ "image/png": blob }),
// // //       ]);
// // //       window.open(intentUrl, "_blank", "noopener,noreferrer");
// // //       return { method: "clipboard" };
// // //     } catch {
// // //       // Clipboard write can be blocked by permissions/browser support —
// // //       // fall through to the text-only intent below.
// // //     }
// // //   }

// // //   window.open(intentUrl, "_blank", "noopener,noreferrer");
// // //   return { method: "intent" };
// // // }
// // import { THEME } from "../config/theme.js";

// // const SITE_URL = "https://hh-goa-task-1-virid.vercel.app/";
// // const CAPTION = `Just got framed for ${THEME.brand.name} ${THEME.brand.year} 🌴✨ See you on the beach, builders. ${THEME.brand.hashtag}`;

// // export function shareToX() {
// //   const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent(CAPTION)}`;
// //   window.open(xUrl, "_blank", "width=600,height=400,noopener,noreferrer");
// // }

// // export function shareToFacebook() {
// //   const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`;
// //   window.open(fbUrl, "_blank", "width=600,height=400,noopener,noreferrer");
// // }

// // export function shareToLinkedIn() {
// //   const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`;
// //   window.open(liUrl, "_blank", "width=600,height=400,noopener,noreferrer");
// // }
// import { THEME } from "../config/theme.js";

// const CAPTION = `Just got framed for ${THEME.brand.name} ${THEME.brand.year} 🌴✨ See you on the beach, builders. ${THEME.brand.hashtag}`;

// async function uploadToFreeImageHost(blob) {
//   const formData = new FormData();
//   // FreeImage API expects the binary file in the "source" parameter
//   formData.append("source", blob); 

//   // Using a fully public, zero-auth endpoint token
//   const res = await fetch("https://freeimage.host", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await res.json();
  
//   // FreeImage API returns status_code 200 on absolute success
//   if (data.status_code !== 200) {
//     throw new Error("FreeImage upload failed");
//   }
  
//   // Grab the direct raw link pointing to your image
//   return data.image.url; 
// }

// /**
//  * Uploads the generated PFP to FreeImage (publicly, anonymously) and opens
//  * X's composer with a direct link to it — X unfurls that as an image
//  * card in the draft. Falls back to a text-only intent if upload fails.
//  * Returns { method: "freeimage" | "intent" | "cancelled" }.
//  */
// export async function shareToX(blob) {
//   if (blob) {
//     try {
//       const imageUrl = await uploadToFreeImageHost(blob);
//       const xIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(CAPTION)}&url=${encodeURIComponent(imageUrl)}`;
//       window.open(xIntentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
//       return { method: "freeimage" };
//     } catch (error) {
//       console.error("FreeImage upload failed, falling back:", error);
//     }
//   }

//   const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(CAPTION)}`;
//   window.open(intentUrl, "_blank", "noopener,noreferrer");
//   return { method: "intent" };
// }
import { THEME } from "../config/theme.js";

const CAPTION = `Just got framed for ${THEME.brand.name} ${THEME.brand.year} 🌴✨ See you on the beach, builders. ${THEME.brand.hashtag}`;

// Helper to turn the blob data into an optimized base64 string safely
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]); // Strip data URL prefix
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function uploadToFreeImageHost(blob) {
  try {
    const base64Data = await blobToBase64(blob);

    const formData = new FormData();
    formData.append("source", base64Data);
    formData.append("action", "upload");
    formData.append("format", "json");

    // Explicitly target the API version 1 endpoint directly
    const res = await fetch("https://freeimage.host", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`HTTP status error: ${res.status}`);

    const data = await res.json();
    
    if (Number(data.status_code) !== 200 || !data.image || !data.image.url) {
      throw new Error("FreeImage API failed to process upload payload");
    }
    
    return data.image.url;
  } catch (err) {
    console.error("Upload stream error:", err);
    throw err;
  }
}

/**
 * Uploads the generated PFP to FreeImage (publicly, anonymously) and opens
 * X's composer with a direct link to it — X unfurls that as an image
 * card in the draft. Falls back to a text-only intent if upload fails.
 * Returns { method: "freeimage" | "intent" | "cancelled" }.
 */
export async function shareToX(blob) {
  if (blob) {
    try {
      const imageUrl = await uploadToFreeImageHost(blob);
      const xIntentUrl = `https://twitter.com{encodeURIComponent(CAPTION)}&url=${encodeURIComponent(imageUrl)}`;
      window.open(xIntentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
      return { method: "freeimage" };
    } catch (error) {
      console.error("FreeImage upload failed, falling back:", error);
    }
  }

  const intentUrl = `https://twitter.com{encodeURIComponent(CAPTION)}`;
  window.open(intentUrl, "_blank", "noopener,noreferrer");
  return { method: "intent" };
}
