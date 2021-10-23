## react-native-tel-input

<div align="center">
	<img src="https://user-images.githubusercontent.com/48245207/138543997-524fe036-7f81-4d24-8b37-99b326081d90.gif"/>
</div>

    npm i react-native-tel-input --save
### Usage

	import React, {useState} from 'react';
    import {View, Text, StyleSheet} from 'react-native';
    import PhoneInput, {isValidPhoneNumber} from 'react-native-input-phone';
    
    const Example = () => {
      const [phoneNumber, setPhoneNumber] = useState('');
      const [formattedText, setFormattedText] = useState();
      const [country, setCountry] = useState('IN');
      const [callingCode, setCallingCode] = useState();
    
      return (
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
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        width: '100%',
      },
      output: {
        alignItems: 'center',
        margin: 16,
      },
    });
    export default Example;
    
	
### Props
- value: string;*--(phone number with or without callingcode)*
- countryCode: string; *--(two letter country code)*
- onChange?: (value: string) => void;
- onCountryChange?: (value: string) => void;
- onFormattedText?: (value: string) => void;
- onCallingCodeChange?: (value: string) => void;
- disable?: boolean;
- containerStyle?: StyleProp<ViewStyle>;
- inputStyle?: StyleProp<TextStyle>;

### Helper methods
- isValidPhoneNumber(phoneNumber: string,countryCode?: string): boolean;

>isvalidphonenumber(formattedtext) 

> or

>isvalidphonenumber(value,countrycode)


