import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidNom, setIsValidNom] = useState(true);
  const [isValidPrenom, setIsValidPrenom] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [userType, setUserType] = useState(null);
  const [visible, setVisible] = useState(false);

  const validateNom = (value) => {
    const isValid = /^[A-Za-z]{3,25}$/.test(value);
    setIsValidNom(isValid && value !== "");
    setNom(value);
    if (!isValid && value !== "") setErrorText("Nom invalide.");
  };

  const validatePrenom = (value) => {
    const isValid = /^[A-Za-z]{3,25}$/.test(value);
    setIsValidPrenom(isValid && value !== "");
    setPrenom(value);
    if (!isValid && value !== "") setErrorText("Prénom invalide.");
  };

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsValidEmail(isValid && value !== "");
    setEmail(value);
    if (!isValid && value !== "") setErrorText("Email invalide.");
  };

  const validatePassword = (value) => {
    const isValid = /[A-Za-z\d@$!%*?&]{8,}/.test(value);
    setIsValidPassword(isValid && value !== "");
    setPassword(value);
    if (!isValid && value !== "") setErrorText("Mot de passe invalide.");
  };

  const validatePhone = () => {
    // Ajoutez ici la logique de validation du numéro de téléphone si nécessaire
    return true;
  };

  const signUpUser = async () => {
    // Ajoutez ici la logique d'inscription
  };

  const handleSignUp = async () => {
    // Ajoutez ici la logique de gestion de l'inscription
  };

  const handleUserTypeSelection = async (type) => {
    // Ajoutez ici la logique de sélection du type d'utilisateur
  };

  return (
    <AuthContext.Provider
      value={{
        nom,
        prenom,
        email,
        password,
        phoneNumber,
        isValidNom,
        isValidPrenom,
        isValidEmail,
        isValidPassword,
        isValidPhone,
        errorText,
        userType,
        visible,
        setNom,
        setPrenom,
        setEmail,
        setPassword,
        setPhoneNumber,
        setIsValidNom,
        setIsValidPrenom,
        setIsValidEmail,
        setIsValidPassword,
        setIsValidPhone,
        setErrorText,
        setUserType,
        setVisible,
        validateNom,
        validatePrenom,
        validateEmail,
        validatePassword,
        validatePhone,
        signUpUser,
        handleSignUp,
        handleUserTypeSelection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
