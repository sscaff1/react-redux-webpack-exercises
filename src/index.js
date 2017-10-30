import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ShippingForm from './containers/ShippingForm';
import configureStore from './configureStore';

const initialState = {
	form: {
		showCountry: false
	}
};

const store = configureStore(initialState)

render(
	<Provider store={store}>
		<ShippingForm />
	</Provider>
	, document.getElementById('app'));
