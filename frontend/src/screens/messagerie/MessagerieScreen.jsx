import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { sendMessage } from './messageService'; // Importer la fonction pour envoyer un message depuis messageService

const MessagingScreen = ({ route }) => {
  const { houseId, houseName, houseImage } = route.params;
  const [message, setMessage] = useState('');

  const handleMessageSend = async () => {
    try {
      // Envoyer le message avec les détails de la maison
      await sendMessage(houseId, message);
      alert('Message sent successfully');
      // Réinitialiser le champ de message après l'envoi
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Message</Text>
      <View style={styles.houseDetails}>
        <Text style={styles.houseName}>{houseName}</Text>
        <Image source={{ uri: houseImage }} style={styles.houseImage} />
      </View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message here..."
        style={styles.input}
        multiline
      />
      <Button title="Send" onPress={handleMessageSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  houseDetails: {
    alignItems: 'center',
    marginBottom: 20,
  },
  houseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  houseImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default MessagingScreen;
