import COUNTRIES from './countries';

const defaultField = {
  errorMessage: '',
  value: '',
  isValid: false,
  hasBeenValidated: false,
};

const fields = {
  firstName: defaultField,
  lastName: defaultField,
  address1: defaultField,
  address2: defaultField,
  city: defaultField,
  country: {
    ...defaultField,
    value: 'US',
    children: COUNTRIES,
  },
  state: {
    ...defaultField,
    value: '-1',
    children: {},
  },
  zip: defaultField,
  phone: defaultField,
  email: defaultField,
};

const form = {
  showCountryField: false,
  loading: true,
  focusField: 'firstName',
  formSubmitted: false,
  accessToStates: true,
};

const button = {
  disabled: false,
  loading: false,
};

export default {
  fields,
  form,
  // button,
};
