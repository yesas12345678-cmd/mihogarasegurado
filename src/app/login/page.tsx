"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await loginAdmin(null, formData);
      if (result && result.error) {
        setErrorMsg(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setErrorMsg("Ocurrió un error inesperado al intentar iniciar sesión.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden px-4 sm:px-6">
      
      {/* Decorative premium gradients background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-display text-lg font-extrabold text-white tracking-tight">
              Mi Hogar<span className="text-teal-400">Asegurado</span>
            </span>
          </Link>
          <h1 className="font-display text-xl font-extrabold text-white">
            Acceso de Administrador
          </h1>
          <p className="font-sans text-xs text-slate-400 mt-1.5">
            Introduce la contraseña para acceder al panel de contenidos.
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-300 mb-6 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                autoFocus
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-11 text-sm font-sans text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-xl bg-teal-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-teal-500/10 hover:bg-teal-400 hover:shadow-teal-500/20 active:scale-[0.98] transition duration-200 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              "Acceder al Panel"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link href="/" className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition">
            &larr; Volver al blog público
          </Link>
        </div>
      </div>
    </main>
  );
}
