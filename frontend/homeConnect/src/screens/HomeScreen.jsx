import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Favorites" onPress={() => navigation.navigate('Favorites')} />
      <Button title="Explore" onPress={() => navigation.navigate('Explore')} />
      <Button title="Messages" onPress={() => navigation.navigate('Messages')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
