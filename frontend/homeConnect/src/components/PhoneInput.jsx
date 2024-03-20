import React from "react";
import { useState, useRef } from "react";
import PhoneInputComponent from "react-native-phone-number-input";
import CountryPicker from "react-native-country-picker-modal";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const PhoneInput = () => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountryPickerVisible(false);
    // Mettre à jour le code de pays dans le champ de saisie du téléphone
    phoneInput.current.selectCountry(country.cca2.toLowerCase());
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {showMessage && (
          <View style={styles.messageContainer}>
            <Text>Value : {value}</Text>
            <Text>Formatted Value : {formattedValue}</Text>
            <Text>Valid : {valid ? "true" : "false"}</Text>
          </View>
        )}
        <PhoneInputComponent
          ref={phoneInput}
          defaultValue={value}
          defaultCode="DR"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={styles.phoneInputTextContainer}
          textInputStyle={styles.phoneInputText}
        />
        {countryPickerVisible && (
          <CountryPicker
            withFilter={true}
            withFlagButton={false}
            withCountryNameButton={false}
            onSelect={onSelectCountry}
            onClose={() => setCountryPickerVisible(false)}
            visible={countryPickerVisible}
          />)}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const checkValid = phoneInputRef.current?.isValidNumber(value);
            setShowMessage(true);
            setValid(checkValid ? checkValid : false);
          }}
        >
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  messageContainer: {
    marginBottom: 20,
  },
  phoneInputContainer: {
    marginVertical: 10,
  },
  phoneInputTextContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  phoneInputText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PhoneInput;
