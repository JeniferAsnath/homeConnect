import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Modal,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Header from "../../components/StyleLogin copy.jsx";

export default function SignUpScreen() {
  const navigation = useNavigation();
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
  const phoneInput = useRef(null);

  

  
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
    return true;
  };
  const handleUserTypeSelection = async (type) => {
    setUserType(type);
    setVisible(false);
    await signUpUser();
  };
  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
  };
  const handleSignUp = async () => {
    if (!validationAll() == false ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    setVisible(true);
  };

  const validationAll = () => {
    const returns =
      validateNom(nom) &&
      validatePrenom(prenom) &&
      validatePhone(phoneNumber) &&
      validateEmail(email) &&
      validatePassword(password);
    return returns;
  };

  const signUpUser = async () => {
    if (userType == null) {
      Alert.alert("Erreur", "Veuillez sélectionner un type d'utilisateur.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    try {
      // const phoneNumber = phoneInput.current?.getValue();
      const userData = await axios.post("http://192.168.242.89:8001/signup", {
        lastName: nom,
        firstName: prenom,
        phoneNumber: phoneNumber,
        email,
        password,
        userType,
      });
      // await sendSignUpData(userData);

      Alert.alert("Félicitation", "Enregistrement réussi !", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      console.error("Erreur lors de l'inscription :", error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      // console.log("phoneInput:", phoneInput);
      // console.log("phoneInput.current:", phoneInput);
    }
  };

  return (
    <ScrollView className="bg-white h-full w-full">
      <Header />
      <Text className="font-bold tracking-wider pl-8 pt-8  text-base-color text-2xl ">
        Sign Up
      </Text>

      <View className="flex  p-4 space-y-3">
        <View className="bg-gris p-4 rounded-2xl w-full ">
          <TextInput
            placeholder="Nom"
            placeholderTextColor={"gray"}
            value={nom}
            onChangeText={validateNom}
          />
        </View>
        {!isValidNom && <Text style={{ color: "red" }}>Nom invalide</Text>}
        <View className="bg-gris p-4 rounded-2xl w-full ">
          <TextInput
            placeholder="Prénom"
            placeholderTextColor={"gray"}
            value={prenom}
            onChangeText={validatePrenom}
          />
        </View>
        {!isValidPrenom && (
          <Text style={{ color: "red" }}>Prénom invalide</Text>
        )}
        <View className="bg-gris p-1  rounded-2xl w-full ">
          <PhoneInput
            ref={phoneInput}
            defaultValue=""
            defaultCode="CD"
            layout="first"
            textContainerStyle={{
              backgroundColor: "#f5f8fa",
              height: 55,
            }}
            countryPickerButtonStyle={{
              backgroundColor: "#f0f4f6",
            }}
            value={phoneNumber}
            onChangeText={handlePhoneInputChange}
          />
        </View>
        {!isValidPhone && (
          <Text style={{ color: "red" }}>Numéro de téléphone invalide</Text>
        )}
        <View className="bg-gris p-4 rounded-2xl w-full ">
          <TextInput
            placeholder="Email"
            placeholderTextColor={"gray"}
            value={email}
            onChangeText={validateEmail}
          />
        </View>
        {!isValidEmail && <Text style={{ color: "red" }}>Email invalide</Text>}
        <View className="bg-gris p-3 rounded-2xl w-full ">
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
            value={password}
            onChangeText={validatePassword}
          />
        </View>
        {!isValidPassword && (
          <Text style={{ color: "red" }}>Mot de passe invalide</Text>
        )}

        <TouchableOpacity
          onPress={handleSignUp}
          className="w-full   bg-regal-blue p-2 shadow-inherit shadow-2xl rounded-full"
        >
          <Text className="text-lg font-bold text-white text-white text-center ">
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View
          className="flex-1 justify-center self-end items-end  "
          // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            className="flex justify-center  bg-white rounded-xl"
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>Choisissez votre type d'utilisateur :</Text>
            <TouchableOpacity
              onPress={() => handleUserTypeSelection("visiteur")}
              className="  bg-regal-blue p-2 shadow-inherit shadow-2xl rounded-full"
            >
              <Text className="text-lg font-bold text-white text-white text-center ">
                Visiteur
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUserTypeSelection("bailleur")}
              className="  bg-regal-blue p-2 shadow-inherit shadow-2xl rounded-full"
            >
              <Text className="text-lg font-bold text-white text-white text-center ">
                Bailleur
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="flex-row justify-center">
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("Login")}>
          <Text className="text-base-color">Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
