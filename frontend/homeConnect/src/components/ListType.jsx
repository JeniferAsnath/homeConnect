import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

const ListType = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: 'Voulez vous...',
    value: null,
  };

  const options = [
    { label: 'Faire louer', value: 'Faire louer' },
    { label: 'Louer', value: 'louer' },
  ];

  return (
    <View className="bg-black/5 p-2 rounded-2xl w-full ">
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
      {/* {selectedValue && <Text>Selected: {selectedValue}</Text>} */}
    </View>
  );
};

export default ListType;