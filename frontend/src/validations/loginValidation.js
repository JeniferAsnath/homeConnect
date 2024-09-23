import React, { useState } from "react";
const [nom, setNom] = useState("");
const [nomError, setNomError] = useState("");
const [prenom, setPrenom] = useState("");
const [prenomError, setPrenomError] = useState("");
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

// validation pour le nom
export function validateNom(nom) {
    if (nom.trim() === "") {
        setNomError("Veuillez saisir votre nom.");
        return false;
      }
      setNomError("");
      return true;
}

// validation pour le prénom
export function validatePrenom(prenom) {
  return prenom.length > 0; // Vérifie si le prénom n'est pas vide
}

// validation pour l'email
export function validateEmail(email) {
  // Ajoutez votre logique de validation pour l'email ici
}

// validation pour le mot de passe
export function validatePassword(password) {
  // Ajoutez votre logique de validation pour le mot de passe ici
}
