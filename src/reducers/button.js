export default (state = {}, action) => {
	switch (action.type) {
		case 'TOGGLE_DISABLE_BUTTON':
			return {
				...state,
				disabled: action.disabled
			};
		default:
			return state;
	}
};
