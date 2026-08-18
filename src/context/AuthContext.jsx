// context/AuthContext.jsx

import React, {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  usersDB,
} from "../services/UserService";

const AuthContext = createContext(null);

const STORAGE_KEY = "rgc_user";
const NOTIFICATIONS_KEY = "rgc_notifications";

export function AuthProvider({ children }) {

  // ==========================================
  // UTILISATEUR ACTUEL
  // ==========================================

  const [currentUser, setCurrentUser] = useState(() => {

    try {

      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return null;
      }

      const savedUser =
        JSON.parse(saved);

      // ==========================================
      // VÉRIFICATION DE L'UTILISATEUR
      // ==========================================

      const latestUser =
        usersDB[savedUser.code];

      // L'utilisateur n'existe plus
      if (!latestUser) {

        localStorage.removeItem(
          STORAGE_KEY
        );

        return null;
      }

      // ==========================================
      // VÉRIFICATION DE LA VERSION
      // ==========================================

      if (
        savedUser.version !==
        latestUser.version
      ) {

        console.log(
          "Nouvelle version utilisateur détectée :",
          savedUser.version,
          "→",
          latestUser.version
        );

        localStorage.removeItem(
          STORAGE_KEY
        );

        return null;
      }

      return savedUser;

    } catch (error) {

      console.error(
        "Erreur localStorage :",
        error
      );

      localStorage.removeItem(
        STORAGE_KEY
      );

      return null;
    }
  });

  // ==========================================
  // CONNEXION
  // ==========================================

  const login = (code, password) => {

    const result =
      loginUser(code, password);

    // ==========================================
    // CONNEXION REFUSÉE
    // ==========================================

    if (!result.success) {
      return result;
    }

    const maintenant =
      new Date();

    // ==========================================
    // INFORMATIONS UTILISATEUR
    // ==========================================

    const utilisateur = {

      ...result.user,

      derniereConnexion: {

        heure:
          maintenant.toLocaleTimeString(
            "fr-FR",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),

        dateComplete:
          maintenant.toLocaleDateString(
            "fr-FR"
          ),

        ville:
          result.user.ville ||
          "Valletta",

        pays:
          result.user.pays ||
          "Malte",
      },
    };

    // ==========================================
    // NOTIFICATION AUTOMATIQUE
    // ==========================================

    const nouvelleNotification = {

      id: Date.now(),

      type: "info",

      titre: "Connexion détectée",

      message:
        `Une nouvelle connexion a été détectée ` +
        `sur votre compte depuis ` +
        `${utilisateur.ville || "Valletta"}, ` +
        `${utilisateur.pays || "Malte"}.`,

      date:
        maintenant.toLocaleDateString(
          "fr-FR"
        ),

      heure:
        maintenant.toLocaleTimeString(
          "fr-FR",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),

      lu: false,
    };

    // ==========================================
    // RÉCUPÉRER LES NOTIFICATIONS
    // ==========================================

    let anciennesNotifications = [];

    try {

      const savedNotifications =
        localStorage.getItem(
          NOTIFICATIONS_KEY
        );

      if (savedNotifications) {

        anciennesNotifications =
          JSON.parse(
            savedNotifications
          );

      }

    } catch (error) {

      console.error(
        "Erreur notifications :",
        error
      );

      anciennesNotifications = [];
    }

    // ==========================================
    // AJOUT DE LA NOTIFICATION
    // ==========================================

    const notifications = [
      nouvelleNotification,
      ...anciennesNotifications,
    ];

    // Garder les 20 dernières
    localStorage.setItem(
      NOTIFICATIONS_KEY,
      JSON.stringify(
        notifications.slice(0, 20)
      )
    );

    // ==========================================
    // ENREGISTRER L'UTILISATEUR
    // ==========================================

    setCurrentUser(
      utilisateur
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        utilisateur
      )
    );

    // ==========================================
    // RÉSULTAT
    // ==========================================

    return {

      success: true,

      user: utilisateur,
    };
  };

  // ==========================================
  // DÉCONNEXION
  // ==========================================

  const logout = () => {

    setCurrentUser(null);

    localStorage.removeItem(
      STORAGE_KEY
    );

    sessionStorage.removeItem(
      "rgc_page"
    );
  };

  // ==========================================
  // CONTEXT
  // ==========================================

  return (

    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}

// ==========================================
// USE AUTH
// ==========================================

export function useAuth() {

  return useContext(
    AuthContext
  );
}