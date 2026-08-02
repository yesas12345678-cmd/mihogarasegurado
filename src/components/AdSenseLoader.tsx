"use client";

import { useEffect } from "react";

export default function AdSenseLoader() {
  useEffect(() => {
    const loadAdSense = () => {
      // Avoid loading duplicate scripts
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        return;
      }
      
      console.log("[GDPR-Compliance] Consent approved. Loading Google AdSense script dynamically...");
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5406670795382768";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    // Check if consent was already accepted previously
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "accepted") {
        loadAdSense();
      }
    } catch (e) {
      console.warn("[GDPR-Compliance] Failed to read localStorage:", e);
    }

    // Listen to live consent updates from CookieBanner
    window.addEventListener("cookie-consent-accepted", loadAdSense);

    return () => {
      window.removeEventListener("cookie-consent-accepted", loadAdSense);
    };
  }, []);

  return null;
}
