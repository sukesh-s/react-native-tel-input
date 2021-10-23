import {useState, useEffect, useCallback} from 'react';
import Countries from './countryList';
import {_checkPhoneNumber} from './utils';
const usePhoneState = (
  value,
  countryCode = '',
  onChange,
  onCountryChange,
  onFormattedText,
  onCallingCodeChange,
) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleOnCountryChange = country => {
    setSelectedCountry(country);
    console.log(country);
    validatePhoneNumber('', country?.country_code);
  };

  const handleOnPhoneNumberChange = number => {
    setPhoneNumber(number);
    validatePhoneNumber(number, '');
  };

  const validatePhoneNumber = useCallback(
    (number = '', code = '') => {
      const phone = number || phoneNumber;
      const country = code || selectedCountry?.country_code;
      const parsedDetails = _checkPhoneNumber(phone, country);
      if (onChange && phone) {
        onChange(phone);
      }
      if (onFormattedText) {
        const formattedNumber =
          parsedDetails && parsedDetails?.formattedNumber
            ? `+${parsedDetails?.formattedNumber}`
            : phone;
        onFormattedText(formattedNumber);
      }
      if (onCountryChange && country) {
        onCountryChange(country);
      }
      if (onCallingCodeChange && parsedDetails && parsedDetails?.callingCode) {
        onCallingCodeChange(parsedDetails?.callingCode);
      }
    },
    [
      onChange,
      onCountryChange,
      onFormattedText,
      phoneNumber,
      selectedCountry,
      onCallingCodeChange,
    ],
  );

  /**initial values */
  useEffect(() => {
    if (!phoneNumber || phoneNumber !== value) {
      setPhoneNumber(value);
    }
    if (selectedCountry?.country_code !== countryCode) {
      const item = Countries.find(
        country => country?.country_code === countryCode,
      );
      setSelectedCountry(item);
    }
    if (value && countryCode) {
      validatePhoneNumber(value, countryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, countryCode]);

  return {
    phoneNumber,
    selectedCountry,
    handleOnCountryChange,
    handleOnPhoneNumberChange,
  };
};

export default usePhoneState;
