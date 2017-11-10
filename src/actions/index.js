import validator from './validator';
import { error } from 'util';
export const actionTypes = {
	SHOW_COUNTRY: 'SHOW_COUNTRY',
	HANDLE_ERROR: 'HANDLE_ERROR'
};

export const showCountry = (show) => {
	return {
		type: actionTypes.SHOW_COUNTRY,
		show,
	}
}

const handleError = (field, error) => {
	return {
		type: actionTypes.HANDLE_ERROR,
		field,
		error
	}
}

export const validateField = (field, value) => {
	return (dispatch, getState) => {
		const { fields } = getState();
		const errors = validator(field, value, fields);
		if (errors.length) {
			dispatch(handleError(field, errors[0]));
		}
	}
}