import * as actions from './actions';

import * as formDataService from '../../services/formData-service';
import { async } from 'q';

export const setFormData = (formData) => (dispatch) => {
	dispatch(actions.formDataSetData(formData));
};
export const setQuery = (query) => {
	return actions.formDataSetQuery(query);
};

export const getFormData = (query) => async (dispatch) => {
	dispatch(actions.formDataGetRequest());

	try {
		const response = await formDataService.getFormData(query);
		console.log('response: ', response);
		dispatch(actions.formDataGetSuccess(response));
		response && dispatch(setFormData(response));
	} catch (error) {
		dispatch(actions.formDataGetError(error));
	}
};
export const setBet = (data) => {
	return actions.formDataSetBet(data);
};
