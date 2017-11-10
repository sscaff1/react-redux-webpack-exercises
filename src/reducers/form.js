import { actionTypes } from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case actionTypes.SHOW_COUNTRY:
			return { ...state, showCountryField: action.show };
		default:
			return state;
	}
}