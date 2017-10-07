export const validationRules = {
  firstName: ['required', 'max30', 'restrictChars'],
  lastName: ['required', 'max30', 'restrictChars'],
  address1: ['required', 'max75', 'restrictChars'],
  address2: ['restrictChars', 'max75'],
  city: ['required', 'max30', 'restrictChars'],
  country: ['requiredSelect'],
  state: ['requiredSelect'],
  zip: ['required', 'zipCode', 'restrictChars'],
  phone: ['required', 'max20', 'phone', 'restrictChars'],
  email: ['required', 'email'],
};

const STANDARD_COUNTRIES = ['US', 'CA'];

export const validations = {
  required: {
    validate(value) {
      return !value;
    },
    message() {
      return 'This field is required.';
    },
  },
  requiredSelect: {
    validate(value) {
      return value === '-1';
    },
    message() {
      return 'Please make a selection';
    },
  },
  max: {
    validate(value, rule) {
      const maxChars = parseInt(rule.substr(3), 10);
      return value.length > maxChars;
    },
    message(rule) {
      return `Please enter no more than ${parseInt(
        rule.substr(3),
        10
      )} characters.`;
    },
  },
  restrictChars: {
    validate(value) {
      return /[<>]/.test(value);
    },
    message() {
      return 'This field does not accept the < or > characters';
    },
  },
  zipCode: {
    validate(value, rule, fields) {
      if (STANDARD_COUNTRIES.includes(fields.country.value)) {
        return validations.max.validate(value, 'max10');
      }
      return false;
    },
    message() {
      return validations.max.message('max10');
    },
  },
  email: {
    validate(value) {
      const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
      return !emailRegExp.test(value);
    },
    message() {
      return 'Please enter a valid email address.';
    },
  },
  phone: {
    validate(value) {
      const phoneRegExp = /^[\(\)\-\+\d]*$/;
      return !phoneRegExp.test(value) || value.length < 10;
    },
    message() {
      return 'Please specify a valid phone number';
    },
  },
};
