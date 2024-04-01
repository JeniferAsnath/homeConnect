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
  const [role, setRole] = useState(null);
  const [visible, setVisible] = useState(false);
  const phoneInput = useRef(null);

  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
  };

  const validateFields = () => {
    const isValidNom = /^[A-Za-z\s]{3,25}$/.test(nom);
    const isValidPrenom = /^[A-Za-z\s]{3,25}$/.test(prenom);
    const isValidPhone = phoneNumber.trim() !== "";
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = /[A-Za-z\d@$!%*?&]{8,}/.test(password);

    setIsValidNom(isValidNom);
    setIsValidPrenom(isValidPrenom);
    setIsValidPhone(isValidPhone);
    setIsValidEmail(isValidEmail);
    setIsValidPassword(isValidPassword);

    return isValidNom && isValidPrenom && isValidPhone && isValidEmail && isValidPassword;
  };

  const handleSignUp = async () => {
    const isValid = validateFields();

    if (!isValid) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    setVisible(true);
  };

  const handleRoleSelection = async (type) => {
    setRole(type);
    setVisible(false);
    await signUpUser();
  };

  const signUpUser = async () => {
    
      Alert.alert("bravo", "type utilisateur choisis avec succès.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);


    try {
      const userData = await axios.post("http://192.168.34.89:8001/signup", {
        lastName: nom,
        firstName: prenom,
        phoneNumber: phoneNumber,
        email,
        password,
        role,
      });

      Alert.alert("Félicitation", "Enregistrement réussi !", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);

      let errorMessage =
        "Une erreur s'est produite lors de l'inscription. Veuillez réessayer plus tard.";
      if (error.response) {
        // Extract error message from server response (if available)
        const errorData = error.response.data;
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      }

      Alert.alert("Erreur", errorMessage, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } finally {
      setVisible(false); // Hide user type selection modal after signup attempt
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
            onChangeText={(value) => {
              setNom(value);
            }}
            onBlur={validateFields}
          />
        </View>
        {!isValidNom && <Text style={{ color: "red" }}>Nom invalide</Text>}
        <View className="bg-gris p-4 rounded-2xl w-full ">
          <TextInput
            placeholder="Prénom"
            placeholderTextColor={"gray"}
            value={prenom}
            onChangeText={(value) => {
              setPrenom(value);
            }}
            onBlur={validateFields}
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
            onChangeText={(value) => {
              setEmail(value);
            }}
            onBlur={validateFields}
          />
        </View>
        {!isValidEmail && <Text style={{ color: "red" }}>Email invalide</Text>}
        <View className="bg-gris p-3 rounded-2xl w-full ">
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            onBlur={validateFields}
          />
        </View>
        {!isValidPassword && (
          <Text style={{ color: "red" }}>Mot de passe invalide</Text>
        )}

        <TouchableOpacity
          onPress={handleSignUp}
          className="w-full   bg-regal-blue p-2 shadow-inherit shadow-2xl rounded-full"
        >
          <Text className="text-lg font-bold text-white text-center ">
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
          className="flex-1 justify-center  items-center "
        >
          <View
            className="flex justify-center  bg-white rounded-xl space-y-4  "
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>Choisissez votre type d'utilisateur :</Text>
            <TouchableOpacity
              onPress={() => handleRoleSelection("visitor")}
              className="  bg-regal-blue p-2 shadow-inherit shadow-2xl rounded-full"
            >
              <Text className="text-lg font-bold text-white text-center ">
                Visiteur
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRoleSelection("bailleur")}
              className="  bg-regal-blue p-2 shadow-inherit shadow-2xl rounded-full"
            >
              <Text className="text-lg font-bold  text-white text-center ">
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
