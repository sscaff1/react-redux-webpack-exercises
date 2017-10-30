import { actionTypes } from '../actions/form';

export default function formReducer(state = {}, action) {
	switch (action.type) {
		case actionTypes.SHOW_COUNTRY_FIELD:
			return { ...state, showCountry: action.show };
		default:
			return state;
	}
}