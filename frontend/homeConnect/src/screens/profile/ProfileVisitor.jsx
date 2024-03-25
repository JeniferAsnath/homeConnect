import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import HeaderHome from "../../components/HeaderHome";
import { Avatar } from "react-native-elements";
import HeadProfile from "./HeadProfile";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import HomeCard from "../../components/homes/HomeCard";
import casa from "../../../assets/rendu-3d-du-modele-maison.jpg";

export default function ProfileVisitor() {
  const reservation = [
    {
      id: 1,
      image: casa,
      like: "heart-outline",
      size: "10px",
      icon: "star-outline",
      bed: "bed-king",
      adress: "2578 Folsom street, san francisco",
      pays: "USA",
      nbrBed: 5,
      price: 300,
    },
    {
      id: 2,
      image: casa,
      like: "heart-outline",
      size: "10px",
      icon: "star-outline",
      bed: "bed-king",
      adress: "2578 Folsom street, san francisco",
      pays: "USA",
      nbrBed: 5,
      price: 300,
    },
    {
      id: 3,
      image: casa,
      like: "heart-outline",
      size: "10px",
      icon: "star-outline",
      bed: "bed-king",
      adress: "2578 Folsom street, san francisco",
      pays: "USA",
      nbrBed: 5,
      price: 300,
    },
    {
      id: 4,
      image: casa,
      like: "heart-outline",
      size: "10px",
      icon: "star-outline",
      bed: "bed-king",
      adress: "2578 Folsom street, san francisco",
      pays: "USA",
      nbrBed: 5,
      price: 300,
    },
    {
      id: 5,
      image: casa,
      like: "heart-outline",
      size: "10px",
      icon: "star-outline",
      bed: "bed-king",
      adress: "2578 Folsom street, san francisco",
      pays: "USA",
      nbrBed: 5,
      price: 300,
    },
    {
      id: 6,
      image: casa,
      like: "heart-outline",
      size: "10px",
      icon: "star-outline",
      bed: "bed-king",
      adress: "2578 Folsom street, san francisco",
      pays: "USA",
      nbrBed: 5,
      price: 300,
    },
  ];
  return (
    <ScrollView className="px-4 space-y-4 max-h-max ">
      <HeadProfile
        image={require("../../../assets/profile-pic(3).png")}
        nom={"jen wang"}
        adress={"Lubumbashi"}
        pays={"rdc"}
      />
      <View className=" items-center">
        <TouchableOpacity className="w-80 p-2 rounded-2xl bg-regal-blue">
          <Text className=" text-white text-center "> Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View className="flex-row  space-x-4">

          <TouchableOpacity className="pr">
            <Material name="calendar-check-outline" size={25} />
          </TouchableOpacity>
          <Text className="font-bold">Vos reservations </Text>

         
        </View>
      </View>
      <View className=" items-center ">
        {reservation.map((r) => (
          <View className="flex  bg-black/5 rounded-2xl  mb-3 ">
            <View className="w-1/2">
              <Text className="text-base-color font-bold">26 mars 2024</Text>
            </View>
            <View >
              <HomeCard
                key={r.id}
                image={r.image}
                favorite={"flex"}
                like={r.like}
                size={r.size}
                icon={r.icon}
                bed={r.bed}
                adress={r.adress}
                pays={r.pays}
                nbrBed={r.nbrBed}
                price={r.price}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
