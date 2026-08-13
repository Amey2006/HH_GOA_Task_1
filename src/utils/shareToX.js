
// // import { THEME } from "../config/theme.js";

// // const CAPTION = `Just got framed for ${THEME.brand.name} ${THEME.brand.year} 🌴✨ See you on the beach, builders. ${THEME.brand.hashtag}`;

// // // Safely converts blob data into a pure base64 text string
// // function blobToBase64(blob) {
// //   return new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       // Extract ONLY the text string, removing "data:image/jpeg;base64," prefix
// //       const base64String = reader.result.split(',')[1];
// //       resolve(base64String);
// //     };
// //     reader.onerror = reject;
// //     reader.readAsDataURL(blob);
// //   });
// // }

// // async function uploadToFreeImageHost(blob) {
// //   try {
// //     const base64Text = await blobToBase64(blob);

// //     // Use URLSearchParams instead of FormData to prevent browser CORS/fetch locks
// //     const payload = new URLSearchParams();
// //     payload.append("key", "6d207e02198a847aa98d0a2a901485a5");
// //     payload.append("action", "upload");
// //     payload.append("source", base64Text);
// //     payload.append("format", "json");

// //     const res = await fetch("https://freeimage.host", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/x-www-form-urlencoded"
// //       },
// //       body: payload.toString()
// //     });

// //     if (!res.ok) throw new Error(`HTTP network error: ${res.status}`);

// //     const data = await res.json();
    
// //     // Explicitly validate API response parameters
// //     if (!data || data.status_code !== 200 || !data.image || !data.image.url) {
// //       throw new Error("API refused text payload structure");
// //     }
    
// //     return data.image.url;
// //   } catch (err) {
// //     console.error("Direct upload stream caught an error:", err);
// //     throw err;
// //   }
// // }

// // /**
// //  * Uploads the generated PFP to FreeImage (publicly, anonymously) and opens
// //  * X's composer with a direct link to it — X unfurls that as an image
// //  * card in the draft. Falls back to a text-only intent if upload fails.
// //  * Returns { method: "freeimage" | "intent" | "cancelled" }.
// //  */
// // export async function shareToX(blob) {
// //   if (blob) {
// //     try {
// //       const imageUrl = await uploadToFreeImageHost(blob);
// //       const xIntentUrl = `https://twitter.com{encodeURIComponent(CAPTION)}&url=${encodeURIComponent(imageUrl)}`;
// //       window.open(xIntentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
// //       return { method: "freeimage" };
// //     } catch (error) {
// //       console.error("FreeImage upload pipeline failed, executing fallback:", error);
// //     }
// //   }

// //   // Pure, clean URL fallback string ensuring no inline CSP execution bugs 
// //   const intentUrl = `https://twitter.com{encodeURIComponent(CAPTION)}`;
// //   window.open(intentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
// //   return { method: "intent" };
// // }
// import { THEME } from "../config/theme.js";

// const CAPTION = "Just got framed for " + THEME.brand.name + " " + THEME.brand.year + " 🌴✨ See you on the beach, builders. " + THEME.brand.hashtag;

// // Safely converts blob data into a pure base64 text string
// function blobToBase64(blob) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result.split(',')[1];
//       resolve(base64String);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// }

// async function uploadToFreeImageHost(blob) {
//   try {
//     const base64Text = await blobToBase64(blob);

//     const payload = new URLSearchParams();
//     payload.append("key", "6d207e02198a847aa98d0a2a901485a5");
//     payload.append("action", "upload");
//     payload.append("source", base64Text);
//     payload.append("format", "json");

//     const res = await fetch("https://freeimage.host/api/1/upload", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       body: payload.toString()
//     });

//     if (!res.ok) throw new Error("HTTP network error: " + res.status);

//     const data = await res.json();
    
//     if (!data || data.status_code !== 200 || !data.image || !data.image.url) {
//       throw new Error("API refused text payload structure");
//     }
    
//     return data.image.url;
//   } catch (err) {
//     console.error("Direct upload stream caught an error:", err);
//     throw err;
//   }
// }

// /**
//  * Uploads the generated PFP to FreeImage and opens X composer.
//  */
// export async function shareToX(blob) {
//   if (blob) {
//     try {
//       const imageUrl = await uploadToFreeImageHost(blob);
      
//       // Plain URL configuration to remove all template string syntax errors
//       const xIntentUrl = "https://twitter.com" + encodeURIComponent(CAPTION) + "&url=" + encodeURIComponent(imageUrl);
      
//       window.open(xIntentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
//       return { method: "freeimage" };
//     } catch (error) {
//       console.error("FreeImage upload pipeline failed, executing fallback:", error);
//     }
//   }

//   const intentUrl = "https://twitter.com" + encodeURIComponent(CAPTION);
//   window.open(intentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
//   return { method: "intent" };
// }
import { THEME } from "../config/theme.js";

const CAPTION = "Just got framed for " + THEME.brand.name + " " + THEME.brand.year + " 🌴✨ See you on the beach, builders. " + THEME.brand.hashtag;

// REPLACE THIS WITH YOUR FREE IMGBB API KEY
const IMGBB_API_KEY = "a6c7ceb9f0e3ab575c3bbc07ffde46f8";

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Extract only the clean base64 data string
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function uploadToImgbb(blob) {
  try {
    const base64Text = await blobToBase64(blob);

    const payload = new URLSearchParams();
    payload.append("image", base64Text);

    // Using Imgbb's dedicated free developer endpoint
    const res = await fetch("https://imgbb.com" + IMGBB_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload.toString()
    });

    if (!res.ok) throw new Error("HTTP network error: " + res.status);

    const data = await res.json();
    
    if (!data || !data.data || !data.data.url) {
      throw new Error("Imgbb refused payload parsing");
    }
    
    return data.data.url;
  } catch (err) {
    console.error("Imgbb caught upload error:", err);
    throw err;
  }
}

/**
 * Uploads the generated PFP to Imgbb and opens X composer.
 */
export async function shareToX(blob) {
  if (blob) {
    try {
      const imageUrl = await uploadToImgbb(blob);
      
      // Fixed main URL string pattern
      const xIntentUrl = "https://twitter.com" + encodeURIComponent(CAPTION) + "&url=" + encodeURIComponent(imageUrl);
      
      window.open(xIntentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
      return { method: "freeimage" };
    } catch (error) {
      console.error("Imgbb pipeline failed, running clean fallback:", error);
    }
  }

  // FIXED FALLBACK STRING PATH: Added missing '/intent/tweet?text='
  const intentUrl = "https://twitter.com" + encodeURIComponent(CAPTION);
  window.open(intentUrl, "_blank", "width=600,height=450,noopener,noreferrer");
  return { method: "intent" };
}