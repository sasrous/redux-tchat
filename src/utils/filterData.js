import { fakeAPI } from '../constants';

export const filterData = (query) => {
	return fakeAPI.data.matches.filter((match) => {
		return match.name.toUpperCase().includes(query.toUpperCase());
	});
};
