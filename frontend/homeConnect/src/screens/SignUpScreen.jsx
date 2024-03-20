import React, { useState, useRef } from "react";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Header from "../components/Header";

export default function SignUpScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const phoneInput = useRef(null);

  const handleSignUp = () => {
    if (!nom || !prenom || !phoneInput.current || !email || !password || !userType) {
      console.log("Veuillez remplir tous les champs.");
      return;
    }

    console.log("Formulaire valide, inscription en cours...");
  };

  return (
    <View style={{  backgroundColor: "white" }}>
      <Header  />
      <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 10, paddingTop: 20 }}>
        Sign Up
      </Text>

      <View style={{ alignItems: "center", marginHorizontal: 20, marginTop: 10 }}>
        <View style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 10, width: "100%", marginBottom: 10 }}>
          <TextInput
            placeholder="Nom"
            placeholderTextColor={"gray"}
            value={nom}
            onChangeText={setNom}
          />
        </View>
        <View style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 10, width: "100%", marginBottom: 10 }}>
          <TextInput
            placeholder="Prénom"
            placeholderTextColor={"gray"}
            value={prenom}
            onChangeText={setPrenom}
          />
        </View>
        <View style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 10, width: "100%", marginBottom: 10 }}>
          <PhoneInput
            ref={phoneInput}
            defaultValue=""
            defaultCode="FR"
            layout="first"
          />
        </View>
        <View style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 10, width: "100%", marginBottom: 10 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"gray"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={{ backgroundColor: "rgba(0,0,0,0.1)", padding: 10, borderRadius: 10, width: "100%", marginBottom: 10 }}>
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor={"gray"}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{ backgroundColor: "#0069D9", padding: 10, borderRadius: 10, width: "100%", marginBottom: 10 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white", textAlign: "center" }}>
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
