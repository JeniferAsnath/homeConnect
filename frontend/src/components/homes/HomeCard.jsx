import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

const HomeCard = ({
  image,
  size,
  like,
  icon,
  bed,
  adress,
  pays,
  nbrBed,
  price,
  favorite,
  home,
  profile
}) => {
  return (
    <>
      {!favorite && !profile && (
        <View className="flex-row space-x-2 rounded-xl  ">
          <View className="w-1/2" style={home}>
            <TouchableOpacity className=" ">
              <Image
                source={image}
                resizeMode="cover"
                style={{ width: 160, height: 170, borderRadius: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity className="z-50 bottom-1 right-3 absolute justify-end items-end">
              <Material name={like} size={20} color={"white"} />
            </TouchableOpacity>
          </View>
          <View className="w-1/2 py-2 ">
            <TouchableOpacity className=" space-y-1">
              <View className="flex-row space-x-1 items-center font-light ">
                <Material name={icon} size={20} />
                <Text className="font-light ">3.5 (25)</Text>
              </View>
              <Text className="font-light ">{adress}</Text>
              <Text className="font-light ">{pays}</Text>
              <View className="flex-row space-x-1 items-center  ">
                <Material name={bed} />
                <Text className=" font-light ">{nbrBed}</Text>
                <Text className=" font-light ">Rooms</Text>
              </View>
              <View className="flex-row space-x-1">
                <Text className="font-bold ">{price}$</Text>
                <Text className="font-light ">/Month</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {favorite && (
        <View className=" p-2 rounded-xl  ">
          <View className="">
            <TouchableOpacity style={favorite}>
              <Image
                source={image}
                resizeMode="cover"
                style={{ width: 310, height: 170, borderRadius: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity className="z-50 bottom-1 right-3 absolute justify-end items-end">
              <Material name={like} size={20} color={"red"} />
            </TouchableOpacity>
          </View>
          <View className=" px-1 py-2 flex">
            <TouchableOpacity className=" space-y-1">
              <View className="flex-row justify-between">
                <View className="flex-row space-x-1 items-center font-light ">
                  <Material name={icon} size={20} />
                  <Text className="font-light ">3.5 (25)</Text>
                </View>
                <View className="flex-row space-x-1">
                  <Text className="font-bold ">{price}$</Text>
                  <Text className="font-light ">/Month</Text>
                </View>
              </View>
              <View className="flex-row justify-between">
                <View className="flex-row space-x-1 items-center  ">
                  <Material name={bed} />
                  <Text className=" font-light ">{nbrBed}</Text>
                  <Text className=" font-light ">Rooms</Text>
                </View>
                <Text className="font-light ">{pays}</Text>
              </View>
              <Text className="font-light ">{adress}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {profile && (
        <View className="    ">
          <TouchableOpacity className="flex " style={profile}>
            <Image
              source={image}
              resizeMode="cover"
              style={{ width: 120, height: 120 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default HomeCard;
