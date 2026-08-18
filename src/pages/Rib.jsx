// pages/Rib.jsx

import React from "react";
import { ArrowLeft, Download, Copy, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Rib({ navigate }) {
  const { currentUser } = useAuth();

  const [copied, setCopied] = React.useState(false);

  const iban = currentUser?.numeroCompte || "MT00 0000 0000 0000 0000 0000 000";
  const bic = currentUser?.bic || "LIDIMTMTXXX";

  const copyIBAN = async () => {
    try {
      await navigator.clipboard.writeText(iban);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Impossible de copier l'IBAN :", error);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">

        <div className="max-w-lg mx-auto flex items-center justify-between">

          <button
            onClick={() => navigate("profil")}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ArrowLeft
              size={21}
              className="text-[#0B1F3A]"
            />
          </button>

          <h1 className="font-bold text-[#0B1F3A]">
            Mon RIB
          </h1>

          <button
            onClick={handleDownload}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <Download
              size={20}
              className="text-[#0B1F3A]"
            />
          </button>

        </div>

      </header>

      {/* CONTENU */}
      <main className="max-w-lg mx-auto px-4 py-6">

        {/* CARTE RIB */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          {/* BANDEAU */}
          <div className="bg-[#0B1F3A] px-5 py-6 text-white">

            <div className="flex items-center gap-3">

              <img
                src="images/L1.jpeg"
                alt="LIDION BANK"
                className="h-10 w-auto object-contain"
              />

              <div>
                <p className="font-bold text-lg">
                  LIDION BANK
                </p>

                <p className="text-white/70 text-xs">
                  Relevé d'identité bancaire
                </p>
              </div>

            </div>

          </div>

          {/* INFORMATIONS */}
          <div className="p-5 space-y-5">

            {/* TITULAIRE */}
            <div>

              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Titulaire du compte
              </p>

              <p className="font-bold text-[#172033]">
                {currentUser?.nom || "Titulaire"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {currentUser?.adresse}
              </p>

              <p className="text-sm text-gray-500">
                {currentUser?.codePostal}{" "}
                {currentUser?.ville}
              </p>

              <p className="text-sm text-gray-500">
                {currentUser?.pays}
              </p>

            </div>

            {/* COMPTE */}
            <div className="border-t border-gray-100 pt-5">

              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Compte
              </p>

              <p className="font-semibold text-[#172033]">
                Compte Courant
              </p>

              <p className="text-sm text-gray-500 mt-1">
                N° {currentUser?.comptes?.courant?.numero || "2284"}
              </p>

            </div>

            {/* IBAN */}
            <div className="border-t border-gray-100 pt-5">

              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                IBAN
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

                <div className="flex items-center justify-between gap-3">

                  <p className="font-mono text-sm font-semibold text-[#0B1F3A] break-all">
                    {iban}
                  </p>

                  <button
                    onClick={copyIBAN}
                    className="shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                  >

                    {copied ? (
                      <CheckCircle
                        size={18}
                        className="text-green-600"
                      />
                    ) : (
                      <Copy
                        size={18}
                        className="text-[#0B1F3A]"
                      />
                    )}

                  </button>

                </div>

              </div>

              {copied && (
                <p className="text-xs text-green-600 mt-2">
                  IBAN copié
                </p>
              )}

            </div>

            {/* BIC */}
            <div className="border-t border-gray-100 pt-5">

              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                BIC / SWIFT
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">

                <p className="font-mono font-semibold text-[#0B1F3A]">
                  {bic}
                </p>

              </div>

            </div>

            {/* DEVISE */}
            <div className="border-t border-gray-100 pt-5">

              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Devise du compte
              </p>

              <p className="font-semibold text-[#172033]">
                Euro (€)
              </p>

            </div>

          </div>

        </div>

        {/* BOUTON */}
        <button
          onClick={handleDownload}
          className="w-full mt-5 bg-[#0B1F3A] hover:bg-[#132D50] text-white font-bold py-4 rounded-full transition flex items-center justify-center gap-2"
        >

          <Download size={19} />

          Télécharger mon RIB

        </button>

      </main>

    </div>
  );
}