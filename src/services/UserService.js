// services/UserService.js

export const usersDB = {
  "07893516": {
    // ==========================================
    // VERSION DES DONNÉES
    // Incrémenter cette valeur à chaque modification
    // ==========================================
    version: 52,

    id: 1,
    code: "07893516",
    password: "260826",

    nom: "Cocheret François",
    email: "francois.cocheret@gmail.com",
    telephone: "+356 0000 0000",

    // ==========================================
    // VILLE / ADRESSE
    // ==========================================
    adresse: "25 Triq il-Merkanti",
    ville: "Valletta",
    codePostal: "VLT 1171",
    pays: "Malte",

    // ==========================================
    // COMPTE PRINCIPAL
    // ==========================================
    solde: 1012357,
    devise: "€",

    // ==========================================
    // AUTRES COMPTES
    // ==========================================
    comptes: {
      courant: {
        nom: "Compte Courant",
        numero: "2284",
        montant: 1012357,
      },

      epargne: {
        nom: "Compte Épargne",
        numero: "7821",
        montant: 30000.40,
      },

      livretA: {
        nom: "Livret A",
        numero: "5462",
        montant: 15000.20,
      },

      planEpargne: {
        nom: "Plan Épargne",
        numero: "8891",
        montant: 50000.17,
      },
    },

    // ==========================================
    // ÉTAT DU COMPTE
    // ==========================================
    compteBloque: true,

    montantDeblocage: 19786,

    blockReason:
      "Votre compte a été temporairement bloqué pour des raisons de sécurité. Veuillez contacter votre conseiller.",

    // ==========================================
    // COORDONNÉES BANCAIRES
    // ==========================================
    numeroCompte:
      "MT35 0030 2034 6446 9785 2436 245",

    bic: "LIDIMTMTXXX",

    // ==========================================
    // CARTE
    // ==========================================
    carte: "4298",
    exp: "12/27",

    // ==========================================
    // DÉCOUVERT
    // ==========================================
    decouvertAutorise: 0,
    decouvertUtilise: 0,

    // ==========================================
    // TRANSACTIONS
    // ==========================================
    transactions: [
      {
        id: 1,
        date: "2024-05-20",
        libelle: "Virement reçu - LIDION BANK",
        montant: 924607,
        type: "credit",
        categorie: "Virement",
      },

      {
        id: 2,
        date: "2023-04-15",
        libelle: "Achat en ligne - Boutique XYZ",
        montant: -89.99,
        type: "debit",
        categorie: "Achat",
      },

      {
        id: 3,
        date: "2023-04-10",
        libelle: "Retrait DAB",
        montant: -200,
        type: "debit",
        categorie: "Retrait",
      },

      {
        id: 4,
        date: "2023-03-28",
        libelle: "Virement reçu",
        montant: 3500,
        type: "credit",
        categorie: "Virement",
      },

      {
        id: 5,
        date: "2023-03-05",
        libelle: "Prélèvement loyer",
        montant: -850,
        type: "debit",
        categorie: "Logement",
      },
    ],
  },
};

// ==========================================
// CONNEXION
// ==========================================

export const loginUser = (code, password) => {
  const user = usersDB[code];

  if (!user) {
    return {
      success: false,
      message: "Code client incorrect",
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Mot de passe incorrect",
    };
  }

  // Ne jamais transmettre le mot de passe au currentUser
  const { password: _, ...userSafe } = user;

  return {
    success: true,
    user: userSafe,
  };
};