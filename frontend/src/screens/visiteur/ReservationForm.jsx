import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ReservationForm = ({ onSubmit, onCancel }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');

  const handleReservation = async () => {
    try {
      // Vérifier que toutes les informations nécessaires sont remplies
      if (!startDate || !endDate || !numberOfGuests) {
        throw new Error('Veuillez remplir toutes les informations de réservation.');
      }
  
      // Préparer les données de la réservation
      const reservationData = {
        startDate,
        endDate,
        numberOfGuests: parseInt(numberOfGuests), // Convertir en entier
      };
  
      // Envoyer la requête de réservation à l'API
      const response = await fetch('https://api.example.com/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
  
      // Vérifier si la requête a réussi
      if (!response.ok) {
        throw new Error('Échec de la réservation. Veuillez réessayer plus tard.');
      }
  
      // Exécuter la fonction de soumission fournie en tant que prop
      onSubmit();
      console.log('Réservation envoyée !');
    } catch (error) {
      console.error('Erreur lors de la réservation :', error.message);
      // Afficher une alerte ou un message d'erreur
      Alert.alert('Erreur', error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Date de début (YYYY-MM-DD)"
        value={startDate}
        onChangeText={text => setStartDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date de fin (YYYY-MM-DD)"
        value={endDate}
        onChangeText={text => setEndDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre de personnes"
        value={numberOfGuests}
        onChangeText={text => setNumberOfGuests(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Annuler" onPress={onCancel} />
        <Button title="Réserver" onPress={handleReservation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default ReservationForm;
