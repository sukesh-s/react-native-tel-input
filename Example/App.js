import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import PhoneInput, {isValidPhoneNumber} from 'react-native-tel-input';
const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedText, setFormattedText] = useState();
  const [country, setCountry] = useState('IN');
  const [callingCode, setCallingCode] = useState();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.output}>
          <Text>
            {JSON.stringify(
              {
                phoneNumber: phoneNumber,
                countryCode: country,
                callingCode: callingCode,
                formattedText: formattedText,
                isValid: isValidPhoneNumber(phoneNumber, country),
              },
              null,
              2,
            )}
          </Text>
        </View>
        <PhoneInput
          value={phoneNumber}
          countryCode={country}
          onChange={setPhoneNumber}
          onCountryChange={setCountry}
          onFormattedText={setFormattedText}
          onCallingCodeChange={setCallingCode}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  output: {
    alignItems: 'center',
    margin: 16,
  },
});
export default App;
