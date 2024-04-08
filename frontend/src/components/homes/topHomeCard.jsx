import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularHomecard.style";
import { checkImageURL } from "../../../../utils";

const topHomeCard = ({ item, selectedHome, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedHome, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedHome, item)}>
        {/* <Image
          source={{
            uri: checkImageURL(item?.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode='contain'
          style={styles.logoImage}
        /> */}
      </TouchableOpacity>
      <Text  numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.HomeName(selectedHome, item)} numberOfLines={1}>
          {item.Home_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedHome, item)}>
            {item?.home_publisher} -
          </Text>
          <Text style={styles.location}> {item.home_country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularHomeCard;