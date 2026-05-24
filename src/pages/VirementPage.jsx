// pages/VirementPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Lock, AlertTriangle } from "lucide-react";

export default function VirementPage({ navigate }) {
  const { currentUser } = useAuth();

  const formatMontant = (montant) =>
    new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(montant);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("dashboard")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <img src="images/L1.jpeg" alt="Santander" className="h-8 w-auto object-contain" />
        </div>
      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-8 flex flex-col items-center">

        <h1 className="text-xl font-bold text-gray-900 mb-6 self-start">Effectuer un virement</h1>

        {/* Bloc bloqué */}
        {currentUser?.compteBloque && (
          <div className="w-full bg-white border-2 border-red-500 rounded-2xl p-6 shadow-sm text-center">

            {/* Icône */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Lock size={36} className="text-red-600" />
            </div>

            <h2 className="text-xl font-bold text-red-700 mb-2">
              Virement impossible
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Votre compte est actuellement <strong className="text-red-600">bloqué</strong>.
              Vous ne pouvez pas effectuer de virement tant que votre compte n'est pas débloqué.
            </p>

            {/* Raison */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-left">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                <p className="text-sm text-red-700">{currentUser?.blockReason}</p>
              </div>
            </div>

            {/* Montant déblocage */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
              <p className="text-sm text-gray-600 mb-1">Montant requis pour débloquer votre compte</p>
              <p className="text-4xl font-bold text-red-600">
                {formatMontant(currentUser?.montantDeblocage)} {currentUser?.devise}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Contactez votre conseiller Santander pour procéder au paiement.
              </p>
            </div>

            <button
              onClick={() => navigate("dashboard")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition"
            >
              Retour au tableau de bord
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-400 border-t bg-white mt-auto">
        © 2026 Banco Santander S.A.
      </div>
    </div>
  );
}