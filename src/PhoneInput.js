import React, {useRef, useImperativeHandle} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import CountryPicker from './CountryPicker';
import usePhoneState from './usePhoneState';
import {isValidPhoneNumber} from './utils';
import {phoneInputContainer} from './styles';

const PhoneInput = React.forwardRef(
  (
    {
      value,
      countryCode,
      onChange = () => {},
      onCountryChange = () => {},
      onFormattedText = () => {},
      onCallingCodeChange = () => {},
      containerStyle,
      inputStyle,
      disable = false,
      placeholder = 'Phone number',
    },
    ref,
  ) => {
    const {
      phoneNumber,
      selectedCountry,
      handleOnCountryChange,
      handleOnPhoneNumberChange,
    } = usePhoneState(
      value,
      countryCode,
      onChange,
      onCountryChange,
      onFormattedText,
      onCallingCodeChange,
    );

    const phoneInputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      phoneNumber,
      countryCode: selectedCountry?.country_code,
      isValidPhoneNumber,
    }));

    return (
      <View style={phoneInputContainer.container}>
        <View
          style={StyleSheet.flatten([
            phoneInputContainer.innerContainer,
            containerStyle,
          ])}>
          <View style={phoneInputContainer.flagContainer}>
            <CountryPicker
              disable={disable}
              onChange={handleOnCountryChange}
              country={selectedCountry}
            />
          </View>
          <TextInput
            ref={phoneInputRef}
            style={StyleSheet.flatten([
              phoneInputContainer.inputContainer,
              inputStyle,
            ])}
            value={phoneNumber}
            editable={!disable}
            onChangeText={handleOnPhoneNumberChange}
            keyboardType="number-pad"
            placeholder={placeholder}
          />
        </View>
      </View>
    );
  },
);

export default PhoneInput;

PhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onCountryChange: PropTypes.func,
  onFormattedText: PropTypes.func,
  onCallingCodeChange: PropTypes.func,
  disable: PropTypes.bool,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
};
