import { View, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Light from "../../assets/Pngtree.png";
import { Svg, Path } from "react-native-svg";

export default function Header(props) {
  return (
    <>
    <StatusBar hidden />
    
      <View className="flesbg h-[30%] mb-12 ">
        <View className="flex-row  bg-regal-blue h-[85%]  ">
          <Image
            source={Light}
            resizeMode="contain"
            className="w-1/2 h-[70%]  "
          />
          <Image
            source={Light}
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
    </>
  );
}
