import {parsePhoneNumber} from 'libphonenumber-js';

export function validateEmail(email) {
  const filter =
    /(^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/;
  if (filter.test(email)) {
    return true;
  }
  return false;
}

export function validatePassword(password) {
  // Requirements from Auth0 (https://auth0.com/docs/authenticate/database-connections/password-strength)
  // Fair: at least 8 characters including a lower-case letter, an upper-case letter, and a number.
  if (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    return true;
  }
  return false;
}

export function validateUsername(username) {
  if (username && username.length > 2 && username.length < 20) {
    return true;
  }
  return false;
}

export function validateZipCode(zipCode) {
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
  return isValidZip;
}

export function validatePhoneNumber(phoneNumber) {
  try {
    const parsed = parsePhoneNumber(phoneNumber, 'US');
    return parsed.isValid();
  } catch (e) {
    return false;
  }
}

export function validateNubmer(strNumber) {
  if (strNumber == '') {
    return false;
  }
  const pattern = /^[0-9]$/;

  return pattern.test(strNumber);
}

export function validateRequired(str) {
  if (str && str.length > 0) {
    return true;
  }
  return false;
}
