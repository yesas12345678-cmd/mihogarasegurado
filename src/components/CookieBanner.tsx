"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has already been decided
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // If no consent, show banner
      setShowBanner(true);
    } else if (consent === "rejected") {
      // If rejected, enforce the blocker immediately
      enforceNoCookies();
    }
  }, []);

  const enforceNoCookies = () => {
    // 1. Delete all existing cookies
    deleteCookies();

    // 2. Intercept any future document.cookie writes
    try {
      const cookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, "cookie") ||
                               Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "cookie");

      if (cookieDescriptor && cookieDescriptor.configurable && cookieDescriptor.get) {
        const getter = cookieDescriptor.get;
        Object.defineProperty(document, "cookie", {
          configurable: true,
          enumerable: true,
          get() {
            return getter.call(document);
          },
          set(val) {
            console.warn("Cookie block policy active. Attempt to set cookie blocked:", val);
            // Ignore the write
          }
        });
      }
    } catch (err) {
      console.error("Error setting up cookie blocker interceptor:", err);
    }
  };

  const deleteCookies = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      
      // Expire the cookie on current path and domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      
      // Also try with a dot prefix for domain
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    // Write a technical cookie to verify acceptance is enabled
    document.cookie = "cookie_consent_accepted=true; max-age=31536000; path=/";
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    // Enforce blocking immediately
    enforceNoCookies();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 md:p-8 animate-in slide-in-from-bottom-10 duration-500 ease-out">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="font-display text-sm font-extrabold text-slate-900">
              Control de Privacidad y Cookies
            </h4>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
            Utilizamos cookies técnicas y analíticas para optimizar la velocidad y el diseño del blog. Si decides rechazar su uso, bloquearemos y eliminaremos cualquier cookie de rastreo para respetar al 100% tu elección. Consulta nuestra{" "}
            <Link href="/cookies" className="text-teal-600 hover:text-teal-700 font-semibold underline decoration-teal-150">
              Política de Cookies
            </Link>{" "}
            para más información.
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="flex-1 md:flex-initial inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition duration-200 cursor-pointer"
          >
            Rechazar
          </button>
          
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-initial inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-teal-600/10 hover:bg-teal-700 transition duration-200 cursor-pointer"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
