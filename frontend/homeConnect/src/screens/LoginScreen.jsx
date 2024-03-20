import { View, Text, TextInput } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

export default function LoginScreen(props) {
  const navigation = useNavigation();
  return (
    <View className="bg-white h-full w-full">
      <Header/>
      
      <Text className="font-bold tracking-wider pl-5 py-4  text-base-color text-2xl ">
        Login
      </Text>
      <View className="flex  p-4 space-y-3">
        {/* <Text className="text-regal-blue pl-1">Email</Text> */}
        <View className="bg-black/5 p-2 rounded-2xl w-full">
          <TextInput placeholder="Email" placeholderTextColor={"gray"} />
        </View>
        {/* <Text className="text-regal-blue pl-1">Password</Text> */}
        <View className="bg-black/5 p-2 rounded-2xl w-full ">
          <TextInput placeholder="Password" placeholderTextColor={"gray"} />
        </View>
        <View className="flex-row justify-self-end self-end mb-5  ">
          <Text>Forgot password?</Text>
          <TouchableOpacity onPress={() => navigation.push("Signup")}>
            <Text className="text-base-color">reset</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="w-full mb-2  bg-regal-blue p-1 shadow-inherit shadow-2xl rounded-full">
          <Text className="text-lg font-bold text-white text-white text-center ">
            Connexion
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center">
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("S'enregistrer")}>
          <Text className="text-base-color">SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
