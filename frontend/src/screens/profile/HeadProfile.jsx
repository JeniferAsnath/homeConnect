import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import HeaderHome from "../../components/HeaderHome";
import { Avatar } from "react-native-elements";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import ActionFollow from "./ActionFollow";

const headProfile = ({
  nom,
  adress,
  evaluation,
  image,
  icon,
  moyenVote,
  action,
  pays,
  bailleur,
  visitor
}) => {
  return (
    <>
      { !bailleur && !visitor &&
        <View className=" space-y-2">
          <HeaderHome
            icon={"bell-outline"}
            size={30}
            icone={"chevron-left-box"}
            dimension={50}
            style={"#F4511E"}
            onPress={() => navigation.push("Login")}
            handlePress={() => navigation.push("Profile")}
          />
          <View className="flex-row px-6 space-y-4 space-x-6">
            <View>
              <Avatar source={image} rounded size={140} />
            </View>
            <View className=" space-y-1">
              <Text className="font-bold text-lg">{nom}</Text>
              <View className="flex-row ">
                <Text className="">{adress}</Text>
                <Text className=" font-light uppercase">/{pays}</Text>
              </View>
              
              
            </View>
          </View>
        </View>
      }
      { bailleur &&
        <View className=" space-y-2">
          <HeaderHome
            icon={"bell-outline"}
            size={30}
            icone={"chevron-left-box"}
            dimension={50}
            style={"#F4511E"}
            onPress={() => navigation.push("Login")}
            handlePress={() => navigation.push("Profile")}
          />
          <View className="flex-row px-6 space-y-4 space-x-6">
            <View style={bailleur}>
              <Avatar source={image} rounded size={140} />
            </View>
            <View className=" space-y-1">
              <Text className="font-bold text-lg">{nom}</Text>
              <View className="flex-row ">
                <Text className="">{adress}</Text>
                <Text className=" font-light uppercase">/{pays}</Text>
              </View>
              <View className="flex-row my-1">
                <Material name={icon} size={20} color={"#F4511E"} />
                <Text className=""> {moyenVote} </Text>
                <TouchableOpacity>
                  <Text className="underline text-regal-blue ">
                    ({evaluation})
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity className="bg-base-color rounded-2xl ">
                  <Text className=" text-white text-center ">{action}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ActionFollow Followers={"10k"} Following={"67"}  like={"37k"}/>
        </View>
      }
      { visitor &&
        <View className=" space-y-2">
          <HeaderHome
            icon={"bell-outline"}
            size={30}
            icone={"chevron-left-box"}
            dimension={50}
            style={"#F4511E"}
            onPress={() => navigation.push("Login")}
            handlePress={() => navigation.push("Profile")}
          />
          <View className="flex-row px-6 space-y-4 space-x-6">
            <View style={visitor}>
              <Avatar source={image} rounded size={140} />
            </View>
            <View className=" space-y-1">
              <Text className="font-bold text-lg">{nom}</Text>
              <View className="flex-row ">
                <Text className="">{adress}</Text>
                <Text className=" font-light uppercase">/{pays}</Text>
              </View>
            
              
            </View>
          </View>
        </View>
      }
    </>
  );
};

export default headProfile;
