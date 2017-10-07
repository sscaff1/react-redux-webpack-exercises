import validator from './validator';

export const changeField = (field, value, fields, hasBeenValidated) => {
  const errorMessages = hasBeenValidated ? validator(field, value, fields) : [];

  return {
    type: 'CHANGE_VALUE',
    errorMessage: errorMessages.length > 0 ? errorMessages[0] : '',
    field,
    value,
    isValid: errorMessages.length === 0,
    hasBeenValidated,
  };
};

export const focusOnField = focusField => ({
  type: 'FOCUS_ON_FIELD',
  focusField,
});

const submitForm = () => ({ type: 'SUBMIT_FORM' });

export const validateAllFields = () => {
  return (dispatch, getState) => {
    const { fields } = getState();
    for (let field in fields) {
      const { value } = fields[field];
      dispatch(changeField(field, value, fields, true));
    }

    const { fields: afterFields } = getState();
    for (let field in afterFields) {
      if (afterFields[field].errorMessage) {
        return dispatch(focusOnField(field));
      }
    }

    return dispatch(submitForm());
  };
};

export const showCountry = () => ({ type: 'SHOW_COUNTRY' });

const toggleLoading = loading => ({ type: 'TOGGLE_LOADING', loading });

const receivedStates = states => {
  return {
    type: 'RECEIVED_STATES',
    states,
  };
};

const toggleDisableButton = disabled => ({
  type: 'TOGGLE_DISABLE_BUTTON',
  disabled,
});

const noAccessToStates = () => ({
  type: 'NO_ACCESS_TO_STATES',
});

export const getStatesForCountry = country => {
  return (dispatch, getState, fetch) => {
    dispatch(toggleDisableButton(true));

    const { form } = getState();
    return fetch(`/api/regions/countries/${country}/states`)
      .then(resp => resp.json())
      .then(data => {
        if (form.loading) {
          dispatch(toggleLoading(false));
        }
        dispatch(toggleDisableButton(false));
        return dispatch(receivedStates(data));
      })
      .catch(() => dispatch(noAccessToStates()));
  };
};
