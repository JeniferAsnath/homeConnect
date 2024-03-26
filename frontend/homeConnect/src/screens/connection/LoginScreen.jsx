import { View, Text, TextInput,Alert } from "react-native";
import React, { useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/StyleLogin";

export default function LoginScreen(props) {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(true);

  const handleLogin = async () => {
    const data = {
      identity: emailOrPhone,
      password: password,
    };

    try {
      const response = await fetch("http://192.168.90.89:8001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json(); // Extraction des données JSON de la réponse

    if (response.ok) {
      // Vérifier si la réponse est réussie (statut HTTP 200-299)
      if (responseData.userType === 'bailleur') {
        navigation.navigate("Main");
        Alert.alert("Success", "Vous êtes connecté avec succès !");
      } else {
        Alert.alert("Error", responseData.message);
      }
    } else {
      // Gérer les erreurs HTTP (par exemple, statut 404, 500, etc.)
      Alert.alert("Error", "Une erreur s'est produite. Veuillez réessayer plus tard.");
    }
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion :", error);
    Alert.alert(
      "Error",
      "Une erreur s'est produite. Veuillez réessayer plus tard."
    );
  }
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
        <Text className=" text-regal-blue  " >
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
          <Text className="text-lg font-bold text-white text-white text-center ">
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
