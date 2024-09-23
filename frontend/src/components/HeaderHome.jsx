import { Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";
// import styles from "./screenheader.style";

const HeaderHome = ({ imageUrl, icon, dimension, size, handlePress,icone,style,  onPress}) => {
  return (
    <SafeAreaView className="flex-row   justify-between py-3 px-4 "  >
      <TouchableOpacity onPress={onPress}>
       {imageUrl && <Avatar rounded  size={dimension} source={imageUrl}></Avatar>}
        {icone && <Material
          name={icone}
          color={style}
          size={size}
        />}
      </TouchableOpacity>
      <TouchableOpacity className="" onPress={handlePress}>
        <Material
          name={icon}
          size={size}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HeaderHome;
