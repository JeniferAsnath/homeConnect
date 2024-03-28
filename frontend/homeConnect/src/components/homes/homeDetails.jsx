import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import Geolocation from "react-native-geolocation-service"; // Bibliothèque pour la géolocalisation
import StarRating from "react-native-star-rating"; // Bibliothèque pour les évaluations

const ApartmentDetails = ({ apartmentId }) => {
  const [apartmentDetails, setApartmentDetails] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [views, setViews] = useState(0);
  const [satisfactionScore, setSatisfactionScore] = useState(0);
  const [location, setLocation] = useState(null);

  <StarRating
    starSize={30}
    disabled={false}
    maxStars={5}
    rating={satisfactionScore}
    selectedStar={(rating) => recordSatisfactionScore(rating)}
  />;

  // Appel de getLocation dans le useEffect pour récupérer la localisation de l'utilisateur
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const granted = await Geolocation.requestAuthorization("whenInUse");
        if (granted === "granted") {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (error) => {
              console.error("Erreur de géolocalisation :", error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la localisation :",
          error
        );
      }
    };

    fetchLocation();
  }, []);
  // Récupérer les détails de l'appartement depuis l'API
  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        const response = await fetch(
          `https://api.example.com/apartments/${apartmentId}`
        );
        const data = await response.json();
        setApartmentDetails(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'appartement :",
          error
        );
      }
    };

    fetchApartmentDetails();
  }, [apartmentId]);

  // Récupérer la localisation de l'utilisateur
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Demander la permission de localisation à l'utilisateur
        const granted = await Geolocation.requestAuthorization("whenInUse");
        if (granted === "granted") {
          // Obtenir les coordonnées GPS de l'utilisateur
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
            },
            (error) => {
              console.error("Erreur de géolocalisation :", error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la localisation :",
          error
        );
      }
    };

    fetchLocation();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + 1) % apartmentDetails.images.length
    );
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex + apartmentDetails.images.length - 1) %
        apartmentDetails.images.length
    );
  };

  // Fonction pour enregistrer une vue
  const recordView = async () => {
    try {
      // Envoyer une requête au serveur pour enregistrer une vue sur cet appartement
      await fetch(
        `https://api.example.com/apartments/${apartmentId}/record-view`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Mettre à jour le nombre de vues localement
      setViews(views + 1);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la vue :", error);
    }
  };

  // Fonction pour enregistrer un score de satisfaction
  const recordSatisfactionScore = async (score) => {
    try {
      // Envoyer une requête au serveur pour enregistrer le score de satisfaction pour cet appartement
      await fetch(
        `https://api.example.com/apartments/${apartmentId}/record-satisfaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score }),
        }
      );
      // Mettre à jour le score de satisfaction localement
      setSatisfactionScore(score);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du score de satisfaction :",
        error
      );
    }
  };

  if (!apartmentDetails) {
    return <Text>Chargement des détails de l'appartement...</Text>;
  }

  return (
    <View>
      <Text>{apartmentDetails.title}</Text>
      <Text>{apartmentDetails.rent}</Text>
      <Image
        source={{ uri: apartmentDetails.images[currentImageIndex] }}
        style={{ width: 200, height: 200 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Button title="Précédent" onPress={previousImage} />
        <Button title="Suivant" onPress={nextImage} />
      </View>
      <Text>Contact : {apartmentDetails.contact}</Text>
      <Text>adress : {apartmentDetails.adress}</Text>
      <Text>Arrêt de métro : {apartmentDetails.arrêtDeMétro}</Text>
      <Text>Intersection : {apartmentDetails.intersection}</Text>
    </View>
  );
};

export default ApartmentDetails;
