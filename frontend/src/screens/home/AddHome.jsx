import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AddImage from "./AddImage";

const AddHome = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (
      !title ||
      !rent ||
      !description ||
      !bedrooms ||
      !bathrooms ||
      !address.street ||
      !address.city ||
      !address.country
    ) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    setIsLoading(true);
    navigation.navigate("Addimage", {
      title,
      rent,
      description,
      bedrooms,
      bathrooms,
      address,
    });
    setIsLoading(false);
  };
  return (
    <View>
      <Text className="bg-regal-blue text-center text-white font-bold p-4 rounded-tr-full rounded-bl-full ">
        Add your home
      </Text>
      <ScrollView className=" mb-32 ">
        <View className="  justify-center space-y-3 rounded-2xl p-6">
          {/* Titre */}
          <Text>Titre </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Titre de la maison"
            className="p-3 rounded-2xl bg-black/5 "
          />
          {/* Loyer */}
          <Text>Loyer </Text>
          <TextInput
            value={rent}
            onChangeText={setRent}
            keyboardType="number-pad"
            placeholder="Loyer par mois"
            className="p-3 rounded-2xl bg-black/5 "
          />
          {/* Description */}
          <Text>Description </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Description de la maison"
            className="p-3 rounded-2xl bg-black/5 "
          />
          {/* Chambres */}
          <Text>Chambres </Text>
          <TextInput
            value={bedrooms}
            onChangeText={setBedrooms}
            keyboardType="number-pad"
            placeholder="Nombre de chambres"
            className="p-3 rounded-2xl bg-black/5 "
          />
          {/* Salles de bain */}
          <Text>Salles de bain </Text>
          <TextInput
            value={bathrooms}
            onChangeText={setBathrooms}
            keyboardType="number-pad"
            placeholder="Nombre de salles de bain"
            className="p-3 rounded-2xl bg-black/5 "
          />
          {/* Adresse */}
          <Text>Adresse </Text>
          <TextInput
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
            placeholder="Rue"
            className="p-3 rounded-xl bg-black/5 "
          />
          <TextInput
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
            placeholder="Ville"
            className="p-3 rounded-xl bg-black/5 "
          />
          <TextInput
            value={address.country}
            onChangeText={(text) => setAddress({ ...address, country: text })}
            placeholder="Pays"
            className="p-3 rounded-xl bg-black/5 "
          />

          {/* Bouton pour ajouter des images */}
          <TouchableOpacity
            className="bg-regal-blue p-3 rounded-full"
            onPress={handleNext} // Rediriger vers l'écran d'ajout d'images
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} color={"#fff"} />
            ) : (
              <Text className="text-center text-white font-bold">
                Ajouter des images
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddHome;
