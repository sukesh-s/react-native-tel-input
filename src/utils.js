import {PhoneNumberUtil} from 'google-libphonenumber';
const phoneNumberUtil = PhoneNumberUtil.getInstance();

/**
 *
 * @param {string} phoneNumber phone number with country code eg:+91XXXXXXXXXX
 * @param {string} countryCode ISO 3166-2 two letter country code
 * @returns {boolean}
 */

export const isValidPhoneNumber = (phoneNumber, countryCode) => {
  if (!phoneNumber) {
    return false;
  }

  try {
    const parsedResult = phoneNumberUtil.parseAndKeepRawInput(
      phoneNumber,
      countryCode,
    );
    const isNumberValid = phoneNumberUtil.isValidNumber(parsedResult);
    return isNumberValid;
  } catch (error) {
    return false;
  }
};

export const _checkPhoneNumber = (phoneNumber, countryCode) => {
  if (!phoneNumber || !countryCode) {
    return false;
  }

  try {
    const parsedResult = phoneNumberUtil.parseAndKeepRawInput(
      phoneNumber,
      countryCode,
    );
    const isNumberValid = phoneNumberUtil.isValidNumber(parsedResult);
    const dialCode = parsedResult.getCountryCode();
    const rationalNumber = parsedResult.getNationalNumber();
    const _countryCode = phoneNumberUtil.getRegionCodeForNumber(parsedResult);

    return {
      isValid: isNumberValid,
      countryCode: _countryCode,
      callingCode: dialCode,
      formattedNumber: `${dialCode}${rationalNumber}`,
    };
  } catch (error) {
    return {
      isValid: false,
      formattedNumber: phoneNumber,
      countryCode: countryCode,
    };
  }
};
