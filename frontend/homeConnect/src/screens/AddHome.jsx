import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const AddHome = () => {
  const [formData, setFormData] = useState({
    title: "",
    rent: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    address: {
      street: "",
      city: "",
      country: "",
      postalCode:"",
    },
    images: [],
  });

  const handleAddHome = async () => {
    try {
      const addressData = await axios.post(
        "http://192.168.90.89:8001/addAddress",
        formData.address
      );
      const addressId = addressData.data.id;

      const homeData = {
        title: formData.title,
        rent: formData.rent,
        description: formData.description,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        addressId: addressId,
        images: formData.images.map((image) => image.uri),
      };

      const response = await axios.post(
        "http://192.168.90.89:8001/addHome",
        homeData
      );

      console.log(response.data);

      setFormData({
        title: "",
        rent: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        address: {
          street: "",
          city: "",
          country: "",
        },
        images: [],
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la maison :", error);
    }
  };

  const handleLaunchCamera = () => {
    const options = {
      mediaType: "photo",
    };

    launchCamera(options, (response) => {
      if (!response.didCancel && !response.error) {
        setFormData({ ...formData, images: [...formData.images, { uri: response.uri }] });
      }
    });
  };

  const handleLaunchImageLibrary = () => {
    const options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.error) {
        setFormData({ ...formData, images: [...formData.images, { uri: response.uri }] });
      }
    });
  };


  return (
    <View>
      <Text className="bg-regal-blue text-center text-white font-bold p-4 rounded-tr-full rounded-bl-full ">
        Add your home
      </Text>
      <ScrollView className=" mb-32 ">
        <View className="  justify-center space-y-3 rounded-2xl p-6">
          <Text>Titre </Text>
          <TextInput
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
            placeholder="Titre de la maison"
            className="p-3 rounded-2xl bg-black/5 "
          />
          <Text>Loyer </Text>
          <TextInput
            value={formData.rent}
            onChangeText={(text) => setFormData({ ...formData, rent: text })}
            placeholder="Loyer par mois"
            className="p-3 rounded-2xl bg-black/5 "
          />
          <Text>Description </Text>
          <TextInput
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Description de la maison"
            className="p-3 rounded-2xl bg-black/5 "
          />
          <Text>Chambres </Text>
          <TextInput
            value={formData.bedrooms}
            onChangeText={(text) => setFormData({ ...formData, bedrooms: text })}
            placeholder="Nombre de chambres"
            className="p-3 rounded-2xl bg-black/5 "
          />
          <Text>Salles de bain </Text>
          <TextInput
            value={formData.bathrooms}
            onChangeText={(text) => setFormData({ ...formData, bathrooms: text })}
            placeholder="Nombre de salles de bain"
            className="p-3 rounded-2xl bg-black/5 "
          />
          <Text>Street </Text>
          <TextInput
            value={formData.address.street}
            onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, street: text } })}
            placeholder="Adresse de la maison"
            className="p-3 rounded-xl bg-black/5 "
          />
          <Text>City </Text>
          <TextInput
            value={formData.address.city}
            onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, city: text } })}
            placeholder="Adresse de la maison"
            className="p-3 rounded-xl bg-black/5 "
          />
          <Text>Country </Text>
          <TextInput
            value={formData.address.country}
            onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, country: text } })}
            placeholder="Adresse de la maison"
            className="p-3 rounded-xl bg-black/5 "
          />
           <Text>postal Code </Text>
          <TextInput
            value={formData.address.postalCode}
            onChangeText={(text) => setFormData({ ...formData, address: { ...formData.address, postalCode: text } })}
            placeholder="Adresse de la maison"
            className="p-3 rounded-xl bg-black/5 "
          />
          <Text>Images </Text>
          <TouchableOpacity
            className="p-3 rounded-2xl bg-base-color/50 "
            onPress={handleLaunchCamera}
          >
            <Text style={styles.imageButtonText}>Capturer une image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLaunchImageLibrary}
            className="p-3 rounded-2xl bg-base-color/50 "
          >
            <Text style={styles.imageButtonText}>
              Sélectionner depuis la galerie
            </Text>
          </TouchableOpacity>
          <View style={styles.imagesContainer}>
            {formData.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={{ width: 100, height: 100, margin: 5 }}
              />
            ))}
          </View>
          <TouchableOpacity
            className="bg-regal-blue p-3 rounded-full"
            onPress={handleAddHome}
          >
            <Text className="text-center text-white font-bold">
              Ajouter la maison
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddHome;
const styles = {
  imageButton: {
    backgroundColor: "blue",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  imageButtonText: {
    color: "white",
    textAlign: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
};
