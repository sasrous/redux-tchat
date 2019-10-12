import * as types from './types';

export const formDataGetRequest = () => ({
	type: types.FORMDATA_GET_REQUEST
});

export const formDataGetSuccess = (formData) => ({
	type: types.FORMDATA_GET_SUCCESS,
	data: formData
});

export const formDataGetError = (error) => ({
	type: types.FORMDATA_GET_ERROR,
	error
});

export const formDataSetData = (formData) => ({
	type: types.FORMDATA_SET_FORMDATA,
	data: formData
});
export const formDataSetQuery = (query) => {
	console.log(query);
	return {
		type: types.FORMDATA_SET_QUERY,
		data: query
	};
};
