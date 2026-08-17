// pages/VirementPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Lock,
  AlertTriangle,
} from "lucide-react";

export default function VirementPage({ navigate }) {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("dashboard")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft size={22} className="text-slate-700" />
          </button>

          <img
            src="images/L1.jpeg"
            alt="LIDION BANK"
            className="h-8 w-auto object-contain"
          />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-8 flex flex-col items-center">
        <h1 className="text-xl font-bold text-slate-900 mb-6 self-start">
          Effectuer un virement
        </h1>

        {currentUser?.compteBloque && (
          <div className="w-full bg-white border-2 border-red-500 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Lock size={36} className="text-red-600" />
            </div>

            <h2 className="text-xl font-bold text-red-700 mb-2">
              Virement indisponible
            </h2>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Le compte utilisé dans cette démonstration est
              actuellement <strong className="text-red-600">bloqué</strong>.
              Le virement ne peut donc pas être effectué.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-left">
              <div className="flex items-start gap-2">
                <AlertTriangle
                  size={16}
                  className="text-red-500 mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Motif du blocage
                  </p>

                  <p className="text-sm text-red-600 mt-1">
                    {currentUser?.blockReason ||
                      "Opération indisponible dans cette démonstration."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-blue-900">
                Mode démonstration
              </p>

              <p className="text-xs text-blue-700 mt-2 leading-relaxed">
                Aucun paiement ou frais n'est nécessaire pour utiliser
                cette interface de démonstration.
              </p>
            </div>

            <button
              onClick={() => navigate("dashboard")}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-full transition"
            >
              Retour au tableau de bord
            </button>
          </div>
        )}
      </main>

      <div className="text-center py-4 text-xs text-slate-400 border-t bg-white mt-auto">
        © 2026 LIDION BANK 
      </div>
    </div>
  );
}