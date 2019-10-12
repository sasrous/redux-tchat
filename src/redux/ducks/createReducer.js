import { combineReducers } from 'redux';
import formDataReducer from './formData/reducers';
const createReducer = () =>
	combineReducers({
		formDataState: formDataReducer
	});

export default createReducer;
