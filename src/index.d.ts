import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange?: (value: string) => void;
  onCountryChange?: (value: string) => void;
  onFormattedText?: (value: string) => void;
  onCallingCodeChange?: (value: string) => void;
  disable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

declare const PhoneInput: React.FC<PhoneInputProps>;
export default PhoneInput;
export function isValidPhoneNumber(
  phoneNumber: string,
  countryCode?: string,
): boolean;
