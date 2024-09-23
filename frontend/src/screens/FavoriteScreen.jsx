import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import HeaderHome from "../components/HeaderHome";
import HomeCard from "../components/homes/HomeCard";
import casa from "../../assets/rendu-3d-du-modele-maison.jpg";

export default function Favorite() {
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
    <View>
      <HeaderHome icone={"chevron-left-box"} style={"#F4511E"} size={25} />
      <View>
        <Text className="px-4 font-bold">Favorite home</Text>
        <TouchableOpacity>
          <Text> </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {homes.map((f) => (
          <View key={f.id} className=" bg-black/5 rounded-xl m-4">
            <HomeCard
              
              image={f.image}
              like={f.like}
              size={f.size}
              icon={f.icon}
              bed={f.bed}
              adress={f.adress}
              pays={f.pays}
              nbrBed={f.nbrBed}
              price={f.price}
              favorite={"flex"}
            />
          </View>
        ))}
      </ScrollView>
      <Text>Favorite</Text>
    </View>
  );
}
