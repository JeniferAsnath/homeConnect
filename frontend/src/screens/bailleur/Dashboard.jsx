import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Dashboard = () => {
  const [houses, setHouses] = useState([]);
  const [houseStats, setHouseStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const housesData = await axios.get('https://api.example.com/houses');
        setHouses(housesData.data);

        const statsData = await axios.get('https://api.example.com/house-stats');
        setHouseStats(statsData.data);

        const notificationsData = await axios.get('https://api.example.com/notifications');
        setNotifications(notificationsData.data);

        const messagesData = await axios.get('https://api.example.com/messages');
        setMessages(messagesData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <Text style={styles.sectionTitle}>Overview of published houses</Text>
      <FlatList
        data={houses}
        renderItem={({ item }) => (
          <View style={styles.houseItem}>
            <Text style={styles.houseName}>{item.name}</Text>
            <Text style={styles.houseLocation}>{item.location}</Text>
            <Text style={styles.houseInfo}>Views: {item.views}</Text>
            <Text style={styles.houseInfo}>Likes: {item.likes}</Text>
            <Text style={styles.houseInfo}>Comments: {item.comments}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.sectionTitle}>House Performance Statistics</Text>
      <View style={styles.statsContainer}>
        <Text>Total published houses: {houseStats.total}</Text>
        <Text>Total visits booked: {houseStats.visits}</Text>
        <Text>Total likes received: {houseStats.likes}</Text>
      </View>

      <Text style={styles.sectionTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text>{item.text}</Text>
            <Text style={styles.notificationDate}>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.sectionTitle}>Messages</Text>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text>{item.sender}: {item.text}</Text>
            <Text style={styles.messageDate}>{item.date}</Text>
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
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  houseItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  houseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  houseLocation: {
    fontSize: 14,
    color: '#888',
  },
  houseInfo: {
    fontSize: 12,
    color: '#333',
  },
  statsContainer: {
    marginVertical: 10,
  },
  notificationItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationDate: {
    color: '#888',
    fontSize: 12,
  },
  messageItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageDate: {
    color: '#888',
    fontSize: 12,
  },
});

export default Dashboard;
