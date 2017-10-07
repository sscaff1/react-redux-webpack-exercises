export default (state = {}, action) => {
	switch (action.type) {
		case 'CHANGE_VALUE':
			return {
				...state,
				[action.field]: {
					...state[action.field],
					errorMessage: action.errorMessage,
					value: action.value,
					isValid: action.isValid,
					hasBeenValidated: action.hasBeenValidated
				}
			};
		case 'RECEIVED_STATES':
			return {
				...state,
				state: {
					...state.state,
					errorMessage: '',
					children: action.states,
					hasBeenValidated: false
				}
			};
		default:
			return state;
	}
};
