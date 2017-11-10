import { actionTypes } from '../actions';

export default (state = {}, action) => {
	switch (action.type) {
		case actionTypes.HANDLE_ERROR:
			return {
				...state,
				[action.field]: {
					...state[action.field],
					errorMessage: action.error,
				}
			}
		default:
			return state;
	}
}