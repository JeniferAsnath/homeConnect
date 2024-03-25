import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import HeaderHome from "../components/HeaderHome";
import Message from "../components/message/Message";
import profile1 from "../../assets/IMGA.jpg";
import profile2 from "../../assets/profile-pic(3).png";

export default function Messagerie() {
  const messages = [
    {
      id: 1,
      nom: "jen",
      profile: profile1,
      date: "24 mars 2024",
      message: " hey salut",
    },
    {
      id: 2,
      nom: "jen",
      profile: profile2,
      date: "24 mars 2024",
      message: " comment vous allez?",
    },
    {
      id: 3,
      nom: "jen",
      profile: profile1,
      date: "24 mars 2024",
      message: " hey salut",
    },
    {
      id: 4,
      nom: "jen",
      profile: profile2,
      date: "24 mars 2024",
      message: "comment vous allez?",

    },
    {
      id: 5,
      nom: "jen",
      profile: profile1,
      date: "24 mars 2024",
      message: " hey salut",
    },
  ];
  return (
    <View className="">
      <HeaderHome icone={"chevron-left-box"} style={"#F4511E"} size={25} />
      <View className="flex-row justify-between px-4">
        <Text className="font-bold">Messages</Text>
        <TouchableOpacity>
          <Text className="text-regal-blue underline">View all</Text>
        </TouchableOpacity>
      </View>
      {messages.map((a) => (
        <View>
          <Message
            key={a.id}
            image={a.profile}
            nom={a.nom}
            message={a.message}
            date={a.date}
          />
        </View>
      ))}
    </View>
  );
}
