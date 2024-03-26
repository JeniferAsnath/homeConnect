import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddHome = () => {
  const [title, setTitle] = useState("");
  const [rent, setRent] = useState("");
  const [features, setFeatures] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  // Fonction pour lancer l'appareil photo et capturer une image
  const handleLaunchCamera = () => {
    const options = {
      mediaType: 'photo', // Spécifie que vous souhaitez capturer une photo
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé la capture de l\'image');
      } else if (response.error) {
        console.log('Erreur lors de la capture de l\'image :', response.error);
      } else {
        // Utilisez la réponse pour accéder à l'image capturée
        console.log('Image capturée :', response);
        setImages([...images, { uri: response.uri }]);
      }
    });
  };

  // Fonction pour ouvrir la galerie et sélectionner une image
  const handleLaunchImageLibrary = () => {
    const options = {
      mediaType: 'photo', // Spécifie que vous souhaitez sélectionner une photo
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé la sélection de l\'image');
      } else if (response.error) {
        console.log('Erreur lors de la sélection de l\'image :', response.error);
      } else {
        // Utilisez la réponse pour accéder à l'image sélectionnée
        console.log('Image sélectionnée :', response);
        setImages([...images, { uri: response.uri }]);
      }
    });
  };

  // Autres fonctions de manipulation des données et d'envoi à l'API

  return (
    <View style={styles.container}>
      {/* Votre formulaire et autres éléments d'interface utilisateur ici */}
      <TouchableOpacity style={styles.imageButton} onPress={handleLaunchCamera}>
        <Text style={styles.imageButtonText}>Capturer une image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageButton} onPress={handleLaunchImageLibrary}>
        <Text style={styles.imageButtonText}>Sélectionner depuis la galerie</Text>
      </TouchableOpacity>
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View>
      <Button title="Ajouter la maison" onPress={handleAddHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default AddHome;
