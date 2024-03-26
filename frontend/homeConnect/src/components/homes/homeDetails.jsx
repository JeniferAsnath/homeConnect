import React, { useState } from 'react';
import { View, Text, Image, FlatList, Button } from 'react-native';

const ApartmentDetails = ({ details }) => {

  const details = {
    titre: "Appartement de 2 chambres charmant et rénové, situé sur la ligne de métro",
    loyer: "4 999 $ par mois plus dépôt de garantie",
    caractéristiques: [
      "Vue magnifique",
      "Confortable",
      "Proche de l'espace vert",
      "Impeccablement propre",
      "Quartier agréable"
    ],
    taille: "1 300 pieds carrés",
    chambres: 2,
    sallesDeBain: 2,
    contact: "Edwin Johnson",
    quartier: "Nom du quartier",
    arrêtDeMétro: "Nom de l'arrêt de métro",
    intersection: "Intersection principale",
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
  };
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % details.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((currentImageIndex + details.images.length - 1) % details.images.length);
  };

  return (
    <View>
      <Text>{details.titre}</Text>
      <Text>{details.loyer}</Text>
      {/* Afficher d'autres détails */}
      <FlatList
        horizontal
        data={details.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
        )}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        initialScrollIndex={currentImageIndex}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <Button title="Précédent" onPress={previousImage} />
        <Button title="Suivant" onPress={nextImage} />
      </View>
      <Text>Contact : {details.contact}</Text>
      <Text>Quartier : {details.quartier}</Text>
      <Text>Arrêt de métro : {details.arrêtDeMétro}</Text>
      <Text>Intersection : {details.intersection}</Text>
    </View>
  );
};

export default ApartmentDetails;
