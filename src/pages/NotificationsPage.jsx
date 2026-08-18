import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Lock,
  AlertTriangle,
  Info,
  Bell,
} from "lucide-react";

import { BottomNav } from "./CartePage";

const notificationsFixes = [
  {
    id: "compte-bloque",
    type: "danger",
    titre: "Compte bloqué",
    message:
      "Votre compte a été temporairement bloqué pour des raisons de sécurité. Contactez votre conseiller.",
    date: "20 Juin 2024",
    icon: Lock,
    lu: false,
  },

  {
    id: "carte-bloquee",
    type: "warning",
    titre: "Carte bancaire bloquée",
    message:
      "Votre carte Visa se terminant par 4298 est bloquée suite au blocage de votre compte.",
    date: "30 mai 2024",
    icon: AlertTriangle,
    lu: false,
  },

  {
    id: "virement-recu",
    type: "info",
    titre: "Virement reçu",
    message:
      "Vous avez reçu un virement de 924 607 € sur votre compte.",
    date: "20 mai 2024",
    icon: Info,
    lu: true,
  },
];

const typeStyles = {
  danger: "bg-red-50 border-red-200 text-red-700",
  warning: "bg-orange-50 border-orange-200 text-orange-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

const iconStyles = {
  danger: "bg-red-100 text-red-600",
  warning: "bg-orange-100 text-orange-600",
  info: "bg-blue-100 text-blue-600",
};

export default function NotificationsPage({
  navigate,
}) {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem("rgc_notifications");

      const notificationsConnexion = saved
        ? JSON.parse(saved)
        : [];

      const notificationsPreparees =
        notificationsConnexion.map((notification) => ({
          ...notification,
          icon: Bell,
        }));

      setNotifications([
        ...notificationsPreparees,
        ...notificationsFixes,
      ]);
    } catch (error) {
      console.error(
        "Erreur chargement notifications :",
        error
      );

      setNotifications(notificationsFixes);
    }
  }, []);

  const nombreNouvelles = notifications.filter(
    (notification) => !notification.lu
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-50">

        <div className="max-w-lg mx-auto flex items-center gap-4">

          <button
            onClick={() => navigate("dashboard")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft
              size={22}
              className="text-slate-700"
            />
          </button>

          <img
            src="images/L1.jpeg"
            alt="LIDION BANK"
            className="h-8 w-auto object-contain"
          />

          <span className="font-bold text-[#0B1F3A]">
            LIDION BANK
          </span>

        </div>

      </header>

      <main className="max-w-lg mx-auto w-full px-4 py-6 space-y-4">

        <div className="flex items-center justify-between">

          <h1 className="text-xl font-bold text-slate-900">
            Notifications
          </h1>

          <span className="bg-[#0B1F3A] text-white text-xs font-bold px-2 py-1 rounded-full">
            {nombreNouvelles} nouvelles
          </span>

        </div>

        <div className="space-y-3">

          {notifications.map((notif) => {
            const Icon = notif.icon;

            return (
              <div
                key={notif.id}
                className={`
                  border rounded-2xl p-4 flex gap-3
                  ${typeStyles[notif.type]}
                  ${!notif.lu
                    ? "shadow-sm"
                    : "opacity-70"}
                `}
              >

                <div
                  className={`
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    shrink-0
                    ${iconStyles[notif.type]}
                  `}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center justify-between mb-1">

                    <p className="font-bold text-sm">
                      {notif.titre}
                    </p>

                    {!notif.lu && (
                      <span className="w-2 h-2 bg-blue-700 rounded-full shrink-0" />
                    )}

                  </div>

                  <p className="text-xs leading-relaxed mb-1">
                    {notif.message}
                  </p>

                  <p className="text-xs opacity-60">
                    {notif.date}
                    {notif.heure
                      ? ` · ${notif.heure}`
                      : ""}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        <div className="text-center text-xs text-slate-400 pt-2">
          LIDION BANK
        </div>

      </main>

      <BottomNav
        navigate={navigate}
        active="notifications"
      />

    </div>
  );
}