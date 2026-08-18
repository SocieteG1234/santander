// pages/LoginPage.jsx

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  Lock,
  Check,
} from "lucide-react";

export default function LoginPage({ navigate }) {
  const { login } = useAuth();

  const [step, setStep] = useState("code");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // CODE CLIENT
  // ==========================================

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (code.length < 6) {
      setError(
        "Le code client doit contenir au moins 6 chiffres"
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("password");
    }, 500);
  };

  // ==========================================
  // MOT DE PASSE
  // ==========================================

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 4) {
      setError("Veuillez saisir votre code secret.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = login(code, password);

      setLoading(false);

      if (result?.success) {
        navigate("dashboard");
      } else {
        setError(
          result?.message || "Connexion impossible."
        );
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="bg-white border-b border-gray-200 px-6 py-4">

        <div className="max-w-md mx-auto flex items-center justify-center gap-3">

          <img
            src="images/L1.jpeg"
            alt="LIDION BANK"
            className="h-12 w-auto object-contain"
          />

          <span className="text-2xl font-bold text-[#0B1F3A]">
            LIDION BANK
          </span>

        </div>

      </header>

      {/* ==========================================
          CONTENU
      ========================================== */}

      <main className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full">

        <h1 className="text-2xl font-bold text-[#0B1F3A] mb-2">
          {step === "code"
            ? "Connexion"
            : "Code secret"}
        </h1>

        <p className="text-gray-500 text-sm mb-8">
          {step === "code"
            ? "Saisissez votre code client"
            : "Saisissez votre code secret"}
        </p>

        {/* ========================================
            ÉTAPE 1
        ======================================== */}

        {step === "code" ? (

          <form
            onSubmit={handleCodeSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Code client
              </label>

              <div className="relative">

                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(e) => {
                    setCode(
                      e.target.value.replace(/\D/g, "")
                    );
                    setError("");
                  }}
                  className="w-full border-b-2 border-gray-800 py-3 text-2xl tracking-widest bg-transparent focus:outline-none focus:border-[#C9A227] transition"
                  placeholder="········"
                  maxLength={10}
                  autoFocus
                />

                {code.length >= 6 && (
                  <Check
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-green-600"
                    size={22}
                  />
                )}

              </div>

              {error && (
                <p className="text-red-600 text-sm mt-2">
                  {error}
                </p>
              )}

            </div>

            <button
              type="submit"
              disabled={
                loading ||
                code.length < 6
              }
              className="w-full bg-[#0B1F3A] hover:bg-[#132D50] text-white font-bold py-4 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Vérification..."
                : "Continuer"}
            </button>

          </form>

        ) : (

          /* ========================================
             ÉTAPE 2
          ======================================== */

          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-6"
          >

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Code secret
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  inputMode="numeric"
                  value={password}
                  onChange={(e) => {
                    setPassword(
                      e.target.value.replace(/\D/g, "")
                    );
                    setError("");
                  }}
                  className="w-full border-b-2 border-gray-800 py-3 pr-10 text-2xl tracking-widest bg-transparent focus:outline-none focus:border-[#C9A227] transition"
                  placeholder="······"
                  maxLength={6}
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0B1F3A] transition"
                >
                  {showPassword ? (
                    <EyeOff size={22} />
                  ) : (
                    <Eye size={22} />
                  )}
                </button>

              </div>

              {error && (
                <p className="text-red-600 text-sm mt-2">
                  {error}
                </p>
              )}

            </div>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => {
                  setStep("code");
                  setError("");
                  setPassword("");
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-full hover:bg-gray-100 transition"
              >
                Retour
              </button>

              <button
                type="submit"
                disabled={
                  loading ||
                  password.length < 4
                }
                className="flex-1 bg-[#0B1F3A] hover:bg-[#132D50] text-white font-bold py-3 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Connexion..."
                  : "Se connecter"}
              </button>

            </div>

          </form>
        )}

        {/* ==========================================
            SÉCURITÉ
        ========================================== */}

        <div className="mt-10 text-center">

          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">

            <Lock size={14} />

            <span>
              Connexion sécurisée
            </span>

          </div>

        </div>

      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer className="text-center py-4 text-xs text-gray-400 border-t bg-white">
        © 2026 LIDION BANK – Tous droits réservés
      </footer>

    </div>
  );
}