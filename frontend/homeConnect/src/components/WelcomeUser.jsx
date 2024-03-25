import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Research from "./research/Research.jsx";

const WelcomeUser = ({ searchHome, setSearchHome, handleClick }) => {
  return (
    <View className="px-5 space-y-4">
      <View className=" pb-4">
        <Text>Hello Jen</Text>
        <Text>Let find your best residence</Text>
      </View>

      <Research handleClick={handleClick} />
      <View className=" space-y-4">
        <View>
          <Text className="font-bold ">What do you need?</Text>
        </View>
        <View className="bg-white flex-row rounded-full m-4">
          <TouchableOpacity className="w-1/2  bg-base-color rounded-full ">
            <Text className="text-white text-center rounded-full p-2 ">
              permanency
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-1/2  bg-white rounded-full ">
            <Text className="text-base-color text-center rounded-full p-2">
              Temporary
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Le reste de votre code */}
    </View>
  );
};

export default WelcomeUser;
