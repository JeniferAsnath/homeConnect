import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import Material from "react-native-vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWindowDimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function AddImage({ route }) {
  const { title, rent, description, bedrooms, bathrooms, address } =
    route.params;
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const [formData, setFormData] = useState(new FormData());
  useEffect(() => {
    ensureDirExists();
  }, []);

  const handleLaunchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      saveImage(result.assets[0]);
    }
  };

  const handleLaunchImageLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        allowsEditing: false,
        allowsMultipleSelection: true,
        selectionLimit: 10,
        // Assurez-vous que allowsEditing est défini sur false
      });
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        saveImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Erreur lors de la sélection d'image :", error);
      // Gérez l'erreur ici
    }
  };

  const saveImage = async (image) => {
    if (image.uri) {
      await ensureDirExists();
      const filename = new Date().getTime() + ".jpeg";
      const dest = imgDir + filename;
      await FileSystem.copyAsync({ from: image.uri, to: dest });
      setImages([...images, { uri: dest, name: filename }]);
    } else {
      console.error("L'URI de l'image est undefined.");
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'ID utilisateur :",
        error
      );
      return null;
    }
  };

 
  const handleAddHome = async () => {
    if (images.length === 0) {
      Alert.alert("Erreur", "Veuillez ajouter au moins une image.");
      return;
    }

    setIsLoading(true);

    try {
      const userId = await getUserId();
      if (!userId) {
        setIsLoading(false);
        Alert.alert("Erreur", "Impossible de récupérer l'ID de l'utilisateur.");
        return;
      }
      const addressData = await axios.post(
        "http://192.168.37.89:8001/addAddress",
        address
      );
      const addressId = addressData?.data?.address?.id;
  
      formData.append("title", title);
      formData.append("rent", parseFloat(rent)); 
      formData.append("description", String(description)); 
      formData.append("bedrooms", parseInt(bedrooms));  
      formData.append("bathrooms", parseInt(bathrooms));  
      formData.append("userId", String(userId)); 
  
      const response = await axios.post(
        `http://192.168.37.89:8001/addHome?userId=${userId}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
  

      if (response.status === 200) {
        const houseId = response.data.houseId; // Assurez-vous que la réponse contient l'ID de la maison
        console.log(response);

        // Envoyer les images avec l'ID de la maison
        sendImages(images, houseId);

        Alert.alert("Succès", "Maison ajoutée avec succès");

      } else {
        Alert.alert("Erreur", "Erreur lors de l'ajout de la maison");
      }

      setImages([]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors de l'ajout de la maison :", error);
    }
    // console.log(formData);<t
  };

  const sendImages = async (images, houseId) => {
    try {
      const formData = new FormData(); 
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, {
          uri: image.uri,
          type: "image/jpeg",
          name: `image_${index}.jpg`,
        });
      });

      await axios.post(`http://192.168.37.89:8001/addImage/${houseId}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi des images :", error);
      // Gérez l'erreur ici
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter des images</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLaunchCamera}>
          <Material name="camera" size={50} color={"#000"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLaunchImageLibrary}
        >
          <Material name="photo" size={50} color={"#000"} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              margin: 1,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image
              name="images"
              style={{ width: 80, height: 80 }}
              source={{ uri: item.uri }}
            />
            <Ionicons.Button
              name="trash"
              onPress={() => handleDeleteImage(index)}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleAddHome}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"#fff"} />
        ) : (
          <Text style={styles.submitButtonText}>Ajouter la maison</Text>
        )}
      </TouchableOpacity>

      {/* Affichage des données de formData */}
      <View>
        {Array.from(formData).map(([name, value]) => (
          <Text key={name}>{`${name}: ${value}`}</Text>
        ))}
      </View>
    </View>
  </SafeAreaView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imagesContainer: {
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});
