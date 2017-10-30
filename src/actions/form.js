export const actionTypes = {
	SHOW_COUNTRY_FIELD: 'SHOW_COUNTRY_FIELD'
};

export const toggleCountryVisibility = (show) => {
	return {
		type: actionTypes.SHOW_COUNTRY_FIELD,
		show
	}
}