import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import HomeCard from "./HomeCard.jsx";
import casa from "../../../assets/rendu-3d-du-modele-maison.jpg";

const ListOfHome = () => {
  const homes = [
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
    <ScrollView className="h-full px-6 space-y-1 py-1">
      <Text className="font-bold text-xl ">List of home</Text>
      <View className="flex-row justify-between py-1">
        <Text className=" font-light pb-3 ">200 homes</Text>
        <TouchableOpacity>
          <Text className="font-bold text-regal-blue underline ">See all</Text>
        </TouchableOpacity>
      </View>

      {homes.map((h) => (
        <View className=" bg-black/5 mb-3 rounded-xl">
          
          <HomeCard
            key={h.id}
            image={h.image}
            like={h.like}
            size={h.size}
            icon={h.icon}
            bed={h.bed}
            adress={h.adress}
            pays={h.pays}
            nbrBed={h.nbrBed}
            price={h.price}
            home={''}
          />
        </View>
      ))}
    </ScrollView>
  );
};
export default ListOfHome;
