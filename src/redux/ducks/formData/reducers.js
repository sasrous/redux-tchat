import * as types from './types';
import { initialState } from '../../../constants';

const formDataReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case types.FORMDATA_SET_QUERY:
			console.log(action, 'action');
			return {
				...state,
				query: action.data
			};
		case types.FORMDATA_GET_REQUEST:
			return {
				...state,
				isLoading: true
			};

		case types.FORMDATA_GET_ERROR:
			return {
				...state,
				isLoading: false,
				error: {
					message: action.error.response ? action.error.response.data.msg : action.error.message
				}
			};

		case types.FORMDATA_SET_FORMDATA:
			let selectedMatch = initialState.formDataState.selectedMatch;
			if (action.data) {
				selectedMatch = action.data;
			}
			return {
				...state,
				selectedMatch: selectedMatch,
				isLoading: false
			};
		case types.FORMDATA_GET_SUCCESS:
			return {
				...state,
				formData: action.data,
				isLoading: false
			};
		case types.FORMDATA_SET_BET:
			const newBet = {
				...state.selectedBet,
				[action.data.label]: action.data.value
			};
			return {
				...state,
				selectedBet: newBet,
				isLoading: false
			};

		default:
			return state;
	}
};

export default formDataReducer;
