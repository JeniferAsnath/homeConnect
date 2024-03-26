import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import HeaderHome from "../components/HeaderHome";
import { Avatar } from "react-native-elements";
import HeadProfile from "./profile/HeadProfile";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import HomeCard from "../components/homes/HomeCard";
import casa from "../../assets/rendu-3d-du-modele-maison.jpg";

export default function ProfileBaiScreen() {
  const homesPublish = [
    {
      id: 1,
      image: casa,
    },
    {
      id: 2,
      image: casa,
    },
    {
      id: 3,
      image: casa,
    },
    {
      id: 4,
      image: casa,
    },
    {
      id: 5,
      image: casa,
    },
    {
      id: 6,
      image: casa,
    },
    {
      id: 7,
      image: casa,
    },
    {
      id: 8,
      image: casa,
    },
    {
      id: 9,
      image: casa,
    },
    {
      id: 10,
      image: casa,
    },
    {
      id: 11,
      image: casa,
    },
    {
      id: 12,
      image: casa,
    },
  ];
  return (
    <ScrollView className="px- space-y-4 max-h-max ">
      <HeadProfile
        image={require("../../assets/profile-pic(3).png")}
        nom={"jen wang"}
        adress={"Lubumbashi"}
        pays={"rdc"}
        icon={"star"}
        moyenVote={3.5}
        evaluation={"75"}
        action={"Follow"}
        bailleur={"fel"}
      />
      <View className=" items-center">
        <TouchableOpacity className="w-80 p-2 rounded-2xl bg-regal-blue">
          <Text className=" text-white text-center "> Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View className="flex-row justify-around space-x-4">
          <TouchableOpacity aria-selected>
            <Material name="grid" size={25} />
          </TouchableOpacity>

          <TouchableOpacity className="pr">
            <Material name="calendar-check-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity className="pr">
            <Material name="star-outline" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexWrap: "wrap",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        {homesPublish.map((index) => (
          <View className="">
            <HomeCard key={index.id} image={index.image} profile={"flex"} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
