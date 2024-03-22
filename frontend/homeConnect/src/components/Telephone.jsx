import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-input";
import ModalPicker from 'react-native-modal-picker'
import ModalPickerImage from 'react-native-image-picker'

export default function Telephone() {
  const phoneRef = useRef(null);
  const countryPickerRef = useRef(null);
  const [pickerData, setPickerData] = useState([]);

  useEffect(() => {
    if (phoneRef.current) {
      setPickerData(phoneRef.current.getPickerData());
    }
  }, []);

  const onPressFlag = () => {
    if (countryPickerRef.current) {
      countryPickerRef.current.open();
    }
  };

  const selectCountry = (country) => {
    if (phoneRef.current) {
      phoneRef.current.selectCountry(country.iso2);
    }
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneRef}
        onPressFlag={onPressFlag}
        initialCountry={"us"}
        initialValue="13178675309"
        textProps={{
          placeholder: "Enter a phone number...",
        }}
      />

      {/* <ModalPickerImage
        ref={countryPickerRef}
        data={pickerData}
        onChange={(country) => {
          selectCountry(country);
        }}
        cancelText="Cancel"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // couleur de fond de l'élément
  },
});
