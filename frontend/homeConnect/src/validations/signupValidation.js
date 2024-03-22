// validation.js

export const validateNom = (value) => {
  const isValid = /^[A-Za-z]{3,25}$/.test(value);
  return isValid ? null : "Nom invalide";
};

export const validatePrenom = (value) => {
  const isValid = /^[A-Za-z]{3,25}$/.test(value);
  return isValid ? null : "Prénom invalide";
};

export const validateEmail = (value) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return isValid ? null : "Email invalide";
};

export const validatePassword = (value) => {
  const isValid = /[A-Za-z\d@$!%*?&]{8,}/.test(value);
  return isValid ? null : "Mot de passe invalide";
};

export const validatePhone = (value) => {
  // Logique de validation pour le numéro de téléphone
};
