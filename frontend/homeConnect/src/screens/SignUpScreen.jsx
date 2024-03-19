import React, { useState, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Image } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { Svg, Path } from "react-native-svg";
import Light from "../../assets/Pngtree_.png";
import Ligh from "../../assets/Pngtree_.png";

import SelectList from 'react-native-dropdown-select-list'

export default function SignUpScreen() {
  const navigation = useNavigation();
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [nom, setUsernom] = useState("");
  const [prennom, setUserprenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountryPickerVisible(false);
    // Mettre à jour le code de pays dans le champ de saisie du téléphone
    phoneInput.current.selectCountry(country.cca2.toLowerCase());
  };

  const types = [
    {
      key : 'LO',
      value : 'Locataire'
    },
    {
      key : 'BA',
      value : 'Bayeur'
    }
  ]

  const handleSignUp = () => {
    if (!username || !phoneNumber || !email || !password || !userType) {
      console.log("Veuillez remplir tous les champs.");
      return;
    }

    console.log("Formulaire valide, inscription en cours...");
  };
  return (
    <View className="bg-white h-full w-full">
      <StatusBar hidden />
      <View className="flesbg h-[20%] mb-12 ">
        <View className="flex-row  bg-regal-blue h-[85%]  ">
          <Image
            source={Light}
            resizeMode="contain"
            className="w-1/2 h-[70%]  "
          />
          <Image
            source={Ligh}
            resizeMode="contain"
            className="w-1/2 h-[70%] "
          />
        </View>

        <Svg height={80} viewBox="0 0 1440 320">
          <Path
            fill="#326383"
            d="M0,288L0,192L62.6,192L62.6,64L125.2,64L125.2,64L187.8,64L187.8,288L250.4,288L250.4,288L313,288L313,192L375.7,192L375.7,160L438.3,160L438.3,128L500.9,128L500.9,160L563.5,160L563.5,96L626.1,96L626.1,160L688.7,160L688.7,320L751.3,320L751.3,192L813.9,192L813.9,96L876.5,96L876.5,256L939.1,256L939.1,96L1001.7,96L1001.7,192L1064.3,192L1064.3,32L1127,32L1127,288L1189.6,288L1189.6,96L1252.2,96L1252.2,192L1314.8,192L1314.8,224L1377.4,224L1377.4,288L1440,288L1440,0L1377.4,0L1377.4,0L1314.8,0L1314.8,0L1252.2,0L1252.2,0L1189.6,0L1189.6,0L1127,0L1127,0L1064.3,0L1064.3,0L1001.7,0L1001.7,0L939.1,0L939.1,0L876.5,0L876.5,0L813.9,0L813.9,0L751.3,0L751.3,0L688.7,0L688.7,0L626.1,0L626.1,0L563.5,0L563.5,0L500.9,0L500.9,0L438.3,0L438.3,0L375.7,0L375.7,0L313,0L313,0L250.4,0L250.4,0L187.8,0L187.8,0L125.2,0L125.2,0L62.6,0L62.6,0L0,0L0,0Z"
          />
        </Svg>
      </View>
      <Text className="font-bold tracking-wider pl-5 py-4  text-base-color text-2xl ">
        Sign Up
      </Text>

      <View className="flex items-center mx-5 space-y-2">
        <View className="bg-black/5 p-2 rounded-2xl w-full">
          <TextInput placeholder="Nom" placeholderTextColor={"gray"} />
        </View>
        <View className="bg-black/5 p-2 rounded-2xl w-full">
          <TextInput placeholder="Prenom" placeholderTextColor={"gray"} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            
          }}
        >
          <TouchableOpacity
            onPress={() => setUserType("locataire")}
            className="flex-row bg-black/5 p-3 mr-1 rounded-2xl w-[48%]"
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderColor: "#F4511E",
                borderWidth: 1,
                marginRight: 5,
                backgroundColor:
                  userType === "locataire" ? "#F4511E" : "transparent",
              }}
            ></View>
            <Text className="text-gray-500">Locataire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("bailleur")}
            className="flex-row bg-black/5 ml-1 p-3 rounded-2xl w-[48%]"
            
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderColor: "#F4511E",
                borderWidth: 1,
                marginRight: 5,
                backgroundColor:
                  userType === "bailleur" ? "#F4511E" : "transparent",
              }}
            ></View>
            <Text className="text-gray-500">Bailleur</Text>
          </TouchableOpacity>
        </View>
        <PhoneInput
          ref={phoneInput}
          value={phoneNumber}
          onChangePhoneNumber={(number) => setPhoneNumber(number)}
          withShadow
          placeholder={"numero"}
          className="bg-black/5 p-3 rounded-2xl w-full"
          initialCountry="rd"
        />
        {countryPickerVisible && (
          <CountryPicker
            withFilter={true}
            withFlagButton={false}
            withCountryNameButton={false}
            onSelect={onSelectCountry}
            onClose={() => setCountryPickerVisible(false)}
            visible={countryPickerVisible}
          />
        )}
        <View className="bg-black/5 p-2 rounded-2xl w-full">
          <TextInput placeholder="Email" placeholderTextColor={"gray"} />
        </View>
        <View className="bg-black/5 p-2 rounded-2xl w-full mb-3">
          <TextInput placeholder="Password" placeholderTextColor={"gray"} />
        </View>
        <TouchableOpacity className="w-full mb-3  bg-regal-blue p-1  rounded-full ">
          <Text className="text-lg font-bold text-white text-center">
            Enregistrer
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <Text>already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("Se connecter")}>
          <Text className="text-base-color">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
