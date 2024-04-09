import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode as base64Decode } from "base-64"; // Importer la fonction decode de base-64
import Header from "../../components/StyleLogin";
import axios from "axios";
import api from "../../../api";
import { AuthContext } from "../../context/AuthContext";
// import "core-js/stable/atob";
global.atob = base64Decode;
export default function LoginScreen({ updateUserRole }) {
  const { user, isLoading, saveUserAuth } = useContext(AuthContext);

  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(true);

  // Fonction pour effectuer l'authentification et stocker le token dans AsyncStorage
  const authenticateUser = async (credentials) => {
    try {
      const response = await api.post(
        "http://192.168.149.89:8001/login",
        credentials
      );

      if (response.status === 200) {
        const responseData = response.data;
        const token = responseData.token;

        const [header, payload, signature] = token.split(".");

        const decodedPayload = global.atob(payload);

        const payloadData = JSON.parse(decodedPayload);

        const userId = payloadData.userId;

        const userData = { ...payloadData, token };

        // await AsyncStorage.setItem('userId', userId);

        console.log("ID de l'utilisateur:", userId);

        // Utilisez
        if (
          responseData.role === "bailleur" ||
          responseData.role === "visiteur"
        ) {
          updateUserRole(responseData.role);
          // navigation.navigate("Main");
          Alert.alert("Success", "Vous êtes connecté avec succès !");
          saveUserAuth(userData);
        } else {
          Alert.alert("Error", responseData.message);
        }
      } else {
        Alert.alert(
          "Error",
          "Une erreur s'est produite. Veuillez réessayer plus tard."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion :", error);
      Alert.alert(
        "Error",
        "Une erreur s'est produite. Veuillez réessayer plus tard."
      );
    }
  };

  const handleLogin = () => {
    const data = {
      identity: emailOrPhone,
      password: password,
    };
    authenticateUser(data);
  };
  return (
    <View className="bg-white h-full w-full">
      <Header />

      <Text className="font-bold tracking-wider pl-5 py-2  text-base-color text-2xl ">
        Login
      </Text>
      <TouchableOpacity
        className="pl-5 text-regal-blue  "
        onPress={() => setIsEmailLogin(!isEmailLogin)}
        style={{ marginTop: 20 }}
      >
        <Text className=" text-regal-blue  ">
          Se connecter avec {isEmailLogin ? "Numéro de téléphone" : "Email"}
        </Text>
      </TouchableOpacity>
      <View className="flex  p-4 space-y-3">
        {/* <Text className="text-regal-blue pl-1">Email</Text> */}
        <View className="bg-gris p-2 rounded-2xl w-full">
          <TextInput
            placeholder={isEmailLogin ? "Email" : "Numéro de téléphone"}
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            placeholderTextColor={"gray"}
          />
        </View>
        {/* <Text className="text-regal-blue pl-1">Password</Text> */}
        <View className="bg-gris p-2 rounded-2xl w-full ">
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={"gray"}
          />
        </View>
        <View className="flex-row justify-self-end self-end mb-5  ">
          <Text>Forgot password?</Text>
          <TouchableOpacity onPress={() => navigation.push("Signup")}>
            <Text className="text-base-color">reset</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full mb-2  bg-regal-blue p-1 shadow-inherit shadow-2xl rounded-full"
        >
          <Text className="text-lg font-bold text-white text-center ">
            Connexion
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("Signup")}>
          <Text className="text-base-color">SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
