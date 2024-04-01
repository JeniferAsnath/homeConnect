import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import Material from "react-native-vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWindowDimensions } from "react-native";
import api from '../../../api'

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

    if (!result.cancelled) {
      saveImage(result.assets[0].uri);
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
  
      if (!result.cancelled) {
        saveImage(result.assets[0].uri)
      }
    } catch (error) {
      console.error("Erreur lors de la sélection d'image :", error);
      // Gérez l'erreur ici
    }
  };

  const saveImage = async (uri) => {
    if (uri) {
      await ensureDirExists();
      const filename = new Date().getTime() + ".jpeg";
      const dest = imgDir + filename;
      await FileSystem.copyAsync({ from: uri, to: dest });
      setImages([...images, dest]);
    } else {
      console.error("L'URI de l'image est undefined.");
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleAddHome = async () => {
    if (images.length === 0) {
      Alert.alert("Erreur", "Veuillez ajouter au moins une image.");
      return;
    }

    setIsLoading(true);

    try {
      const addressData = await api.post("/addAddress", address)
      const addressId = addressData?.data?.address?.id;

      const homeData = await api.post("/addHome",  {
        title,
        rent,
        description,
        bedrooms,
        bathrooms,
        addressId,
        images: images,
      });

      if (homeData.status) {
        alert("Maison créée");
      } else {
        alert("Erreur lors de la création");
      }

      setImages([]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Erreur lors de l'ajout de la maison :", error);
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
              <Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
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
