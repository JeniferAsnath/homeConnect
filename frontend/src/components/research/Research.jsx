import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons as Material } from 'react-native-vector-icons';

const Research = ({ handleClick }) => {
  return (
    <View>
      <TouchableOpacity
        className="p-2 space-x-2 flex-row bg-black/5 shadow-inherit shadow-2xl rounded-full"
        onPress={handleClick}
      >
        <Material name="magnify" size={30} />
        <TextInput
          placeholder="What are you looking for?"
        />
      </TouchableOpacity>
    </View>
  );
}

export default Research;