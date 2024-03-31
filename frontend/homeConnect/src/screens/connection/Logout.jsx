import React from 'react';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const LogoutScreen = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      // Envoie une requête POST au point de terminaison de déconnexion
      const response = await axios.post("http://192.168.34.89:8001/logout");

      if (response.status === 200) {
        // Si la déconnexion réussit, affichez un message de succès ou effectuez une autre action appropriée
        Alert.alert('Déconnexion réussie', [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        // Si la déconnexion échoue, affichez un message d'erreur ou effectuez une autre action appropriée
        Alert.alert('Échec de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      Alert.alert('Erreur lors de la déconnexion');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Déconnexion" onPress={logout} />
    </View>
  );
};

export default LogoutScreen;
