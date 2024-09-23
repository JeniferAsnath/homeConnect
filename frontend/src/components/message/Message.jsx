  import React, { useState, useEffect } from 'react';
  import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
  import io from 'socket.io-client';
  import axios from 'axios';

  const socket = io('https://your-backend-url'); // Remplacez l'URL par l'URL de votre backend
  const API_URL = 'http://example.com/api';

  const MessagingScreen = ({ route }) => {
    const { houseId, houseName, houseImage } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
      // Écouter les nouveaux messages depuis le serveur WebSocket
      socket.on('newMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        // Désabonner l'écoute des nouveaux messages lors du démontage du composant
        socket.off('newMessage');
      };
    }, []);

    const sendMessageViaREST = async () => {
      try {
        // Envoyer le message avec les détails de la maison via REST
        await axios.post(`${API_URL}/houses/${houseId}/messages`, {
          message: newMessage,
        });
        alert('Message sent successfully via REST');
        // Réinitialiser le champ de message après l'envoi
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message via REST:', error);
        alert('Failed to send message via REST');
      }
    };

    const sendMessageViaWebSocket = () => {
      // Envoyer le nouveau message au serveur WebSocket
      socket.emit('sendMessage', { houseId, message: newMessage });
      setNewMessage('');
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Send Message</Text>
        <View style={styles.houseDetails}>
          <Text style={styles.houseName}>{houseName}</Text>
          <Image source={{ uri: houseImage }} style={styles.houseImage} />
        </View>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here..."
          style={styles.input}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button title="Send via REST" onPress={sendMessageViaREST} />
          <Button title="Send via WebSocket" onPress={sendMessageViaWebSocket} />
        </View>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.sender}>{item.senderId}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    messageContainer: {
      marginBottom: 10,
    },
    sender: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    content: {
      fontSize: 16,
    },
  });

  export default MessagingScreen;
