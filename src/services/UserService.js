// services/UserService.js

export const usersDB = {
  "07893516": {
    id: 1,
    code: "07893516",
    password: "260826",

    nom: "Cocheret François",
    email: "francois.cocheret@gmail.com",
    telephone: "+356 0000 0000",

    adresse: "25 Triq il-Merkanti, Valletta VLT 1171, Malta",

    solde: 1012357,
    devise: "€",

    compteBloque: true,
    montantDeblocage: 19786,

    blockReason:
      "Votre compte a été temporairement bloqué pour des raisons de sécurité. Veuillez contacter votre conseiller.",

    numeroCompte: "MT35 0030 2034 6446 9785 2436 245",
    bic: "LIDIMXX",

    carte: "4298",
    exp: "12/27",

    decouvertAutorise: 0,
    decouvertUtilise: 0,

    transactions: [
      {
        id: 1,
        date: "2024-05-20",
        libelle: "Virement reçu - LIDION BANK",
        montant: 4607,
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

  const { password: _, ...userSafe } = user;

  return {
    success: true,
    user: userSafe,
  };
};