import React from 'react';
import { View, Text, FlatList } from 'react-native';

const NearbyHomes = ({ homes }) => {
  return (
    <View>
      <Text>Nearby Homes</Text>
      <FlatList
        data={homes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            {/* Affichez d'autres détails de la maison ici */}
          </View>
        )}
      />
    </View>
  );
};

export default NearbyHomes;

