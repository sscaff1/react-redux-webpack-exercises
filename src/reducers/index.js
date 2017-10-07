import { combineReducers } from 'redux';
import form from './form';
import fields from './fields';
import button from './button';

export default combineReducers({
	fields,
	form,
	button
});
