// pages/DashboardPage.jsx

import React from "react";
import { useAuth } from "../context/AuthContext";

import {
  LogOut,
  Lock,
  TrendingUp,
  TrendingDown,
  Send,
  Bell,
  Wallet,
  PiggyBank,
  LineChart,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { BottomNav } from "./CartePage";

export default function DashboardPage({ navigate }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("login");
  };

  const formatMontant = (montant) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
    }).format(Number(montant || 0));

  const comptes = currentUser?.comptes || {};

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">

        <div className="max-w-lg mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2">

            <img
              src="images/L1.jpeg"
              alt="LIDION BANK"
              className="h-9 w-auto object-contain"
            />

            <span className="font-bold text-[#0B1F3A]">
              LIDION BANK
            </span>

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => navigate("notifications")}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >

              <Bell
                size={21}
                className="text-[#0B1F3A]"
              />

              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A227] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                2
              </span>

            </button>

            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-[#0B1F3A] rounded-full flex items-center justify-center text-white hover:bg-[#132D50] transition"
            >
              <LogOut size={18} />
            </button>

          </div>

        </div>

      </header>

      {/* ==========================================
          CONTENU
      ========================================== */}

      <main className="max-w-lg mx-auto w-full space-y-5">

        {/* ========================================
            EN-TÊTE LIDION BANK
        ======================================== */}

        <div className="bg-[#0B1F3A] px-5 pt-7 pb-6 text-white">

          {/* Bonjour */}

          <div>

            <p className="text-white/70 text-sm">
              Bonjour,
            </p>

            <h1 className="text-2xl font-bold mt-1">
              {currentUser?.nom}
            </h1>

            <div className="flex items-center gap-1 mt-2 text-sm text-white/70">

              <MapPin size={14} />

              <span>
                {currentUser?.ville},{" "}
                {currentUser?.pays}
              </span>

            </div>

          </div>

          {/* ========================================
              DERNIÈRE CONNEXION
          ======================================== */}

          <div className="mt-6 bg-white/10 border border-white/15 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center shrink-0">

                <Clock
                  size={19}
                  className="text-white"
                />

              </div>

              <div className="flex-1">

                <p className="text-sm font-bold text-white">
                  Dernière connexion
                </p>

                {currentUser?.derniereConnexion ? (

                  <p className="text-xs text-white/70 mt-1">

                    {currentUser.derniereConnexion.heure}
                    {" · "}
                    {currentUser.derniereConnexion.dateComplete}
                    {" · "}
                    {currentUser.derniereConnexion.ville},{" "}
                    {currentUser.derniereConnexion.pays}

                  </p>

                ) : (

                  <p className="text-xs text-white/70 mt-1">
                    Première connexion
                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* ========================================
            CONTENU DU DASHBOARD
        ======================================== */}

        <div className="px-4 space-y-5">

          {/* ========================================
              VOS COMPTES
          ======================================== */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <h2 className="text-xl font-bold text-[#0B1F3A]">
                Vos comptes
              </h2>

              <button
                onClick={() => navigate("profil")}
                className="flex items-center gap-1 text-[#0B1F3A] text-sm font-semibold"
              >
                Voir tout
                <ChevronRight size={17} />
              </button>

            </div>

            <div className="space-y-3">

              {/* ==================================
                  COMPTE COURANT
              ================================== */}

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-lg font-semibold text-[#172033]">
                      {comptes.courant?.nom ||
                        "Compte Courant"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      N°••••••
                      {comptes.courant?.numero || "2284"}
                    </p>

                  </div>

                  <div className="w-14 h-14 bg-[#0B1F3A]/5 rounded-full flex items-center justify-center">

                    <Wallet
                      size={28}
                      className="text-[#0B1F3A]"
                    />

                  </div>

                </div>

                <p className="text-3xl font-bold text-[#0B1F3A] mt-5">

                  {formatMontant(
                    comptes.courant?.montant
                  )}{" "}
                  {currentUser?.devise}

                </p>

              </div>

              {/* ==================================
                  LIVRET A
              ================================== */}

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-lg font-semibold text-[#172033]">
                      {comptes.livretA?.nom ||
                        "Livret A"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      N°••••••
                      {comptes.livretA?.numero || "5462"}
                    </p>

                  </div>

                  <div className="w-14 h-14 bg-[#C9A227]/10 rounded-full flex items-center justify-center">

                    <PiggyBank
                      size={28}
                      className="text-[#C9A227]"
                    />

                  </div>

                </div>

                <p className="text-3xl font-bold text-[#0B1F3A] mt-5">

                  {formatMontant(
                    comptes.livretA?.montant
                  )}{" "}
                  {currentUser?.devise}

                </p>

              </div>

              {/* ==================================
                  PLAN ÉPARGNE
              ================================== */}

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-lg font-semibold text-[#172033]">
                      {comptes.planEpargne?.nom ||
                        "Plan Épargne"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      N°••••••
                      {comptes.planEpargne?.numero || "8891"}
                    </p>

                  </div>

                  <div className="w-14 h-14 bg-[#0B1F3A]/5 rounded-full flex items-center justify-center">

                    <LineChart
                      size={28}
                      className="text-[#0B1F3A]"
                    />

                  </div>

                </div>

                <p className="text-3xl font-bold text-[#0B1F3A] mt-5">

                  {formatMontant(
                    comptes.planEpargne?.montant
                  )}{" "}
                  {currentUser?.devise}

                </p>

              </div>

            </div>

          </div>

          {/* ========================================
              ALERTE COMPTE BLOQUÉ
          ======================================== */}

          {currentUser?.compteBloque && (

            <div className="bg-white border-2 border-red-500 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">

                  <Lock
                    size={20}
                    className="text-red-600"
                  />

                </div>

                <div>

                  <p className="font-bold text-red-700">
                    Compte bloqué
                  </p>

                  <p className="text-xs text-gray-500">
                    Action requise
                  </p>

                </div>

              </div>

              <p className="text-gray-600 text-sm mb-4">
                {currentUser?.blockReason}
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">

                <p className="text-sm text-red-700 mb-1 font-medium">
                  Montant requis pour le déblocage
                </p>

                <p className="text-3xl font-bold text-red-600">

                  {formatMontant(
                    currentUser?.montantDeblocage
                  )}{" "}
                  {currentUser?.devise}

                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Contactez votre conseiller LIDION BANK.
                </p>

              </div>

            </div>

          )}

          {/* ========================================
              ACTIONS RAPIDES
          ======================================== */}

          <div className="grid grid-cols-2 gap-3">

            {/* RIB */}

            <button
              onClick={() => navigate("rib")}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition shadow-sm"
            >

              <div className="w-10 h-10 bg-[#0B1F3A]/10 rounded-full flex items-center justify-center">

                <Wallet
                  size={20}
                  className="text-[#0B1F3A]"
                />

              </div>

              <p className="text-sm font-semibold text-gray-800">
                Mon RIB
              </p>

            </button>

            {/* VIREMENT */}

            <button
              onClick={() => navigate("virement")}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition shadow-sm"
            >

              <div className="w-10 h-10 bg-[#0B1F3A]/10 rounded-full flex items-center justify-center">

                <Send
                  size={20}
                  className="text-[#0B1F3A]"
                />

              </div>

              <p className="text-sm font-semibold text-gray-800">
                Virement
              </p>

            </button>

            {/* HISTORIQUE */}

            <button
              onClick={() => navigate("historique")}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition shadow-sm"
            >

              <div className="w-10 h-10 bg-[#C9A227]/15 rounded-full flex items-center justify-center">

                <TrendingUp
                  size={20}
                  className="text-[#C9A227]"
                />

              </div>

              <p className="text-sm font-semibold text-gray-800">
                Historique
              </p>

            </button>

          </div>

          {/* ========================================
              DERNIÈRES OPÉRATIONS
          ======================================== */}

          <div className="bg-white rounded-2xl shadow-sm p-5">

            <div className="flex items-center justify-between mb-4">

              <h2 className="font-bold text-gray-800">
                Dernières opérations
              </h2>

              <button
                onClick={() => navigate("historique")}
                className="text-[#0B1F3A] text-xs font-semibold"
              >
                Voir tout
              </button>

            </div>

            <div className="divide-y divide-gray-100">

              {(currentUser?.transactions || [])
                .slice(0, 4)
                .map((op) => (

                  <div
                    key={op.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          op.type === "credit"
                            ? "bg-green-100"
                            : "bg-orange-100"
                        }`}
                      >

                        {op.type === "credit" ? (

                          <TrendingUp
                            size={16}
                            className="text-green-600"
                          />

                        ) : (

                          <TrendingDown
                            size={16}
                            className="text-orange-600"
                          />

                        )}

                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {op.libelle}
                        </p>

                        <p className="text-xs text-gray-400">

                          {new Date(
                            op.date
                          ).toLocaleDateString("fr-FR")}

                        </p>

                      </div>

                    </div>

                    <p
                      className={`font-bold text-sm whitespace-nowrap ${
                        op.type === "credit"
                          ? "text-green-600"
                          : "text-gray-800"
                      }`}
                    >

                      {op.montant > 0 ? "+" : ""}

                      {formatMontant(op.montant)}
                      {" "}
                      {currentUser?.devise}

                    </p>

                  </div>

                ))}

            </div>

          </div>

        </div>

      </main>

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <BottomNav
        navigate={navigate}
        active="dashboard"
      />

    </div>
  );
}