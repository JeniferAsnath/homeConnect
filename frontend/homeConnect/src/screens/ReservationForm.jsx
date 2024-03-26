import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, DatePickerAndroid, StyleSheet } from 'react-native';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleReservation = () => {
    // Envoyer les données de réservation au serveur ou effectuer d'autres actions
    console.log('Nom:', name);
    console.log('Email:', email);
    console.log('Date d\'arrivée:', arrivalDate);
    // Afficher un message de confirmation ou rediriger l'utilisateur, etc.
    // Réinitialiser les champs du formulaire si nécessaire
    setName('');
    setEmail('');
    setArrivalDate('');
    setShowModal(true); // Afficher la modal de confirmation
  };

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'calendar'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Date sélectionnée par l'utilisateur, mettre à jour l'état
        setArrivalDate(`${year}-${month + 1}-${day}`);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Entrez votre nom"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Entrez votre email"
        keyboardType="email-address"
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.label, { flex: 1 }]}>Date d'arrivée:</Text>
        <Button title="Sélectionner" onPress={showDatePicker} />
      </View>
      <Button title="Réserver" onPress={handleReservation} />
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Votre réservation a été confirmée!</Text>
          <Button title="OK" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20
  }
});

export default ReservationForm;
