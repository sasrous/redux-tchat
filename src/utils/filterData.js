import { fakeAPI } from '../constants';

export const filterData = (query) => {
	return fakeAPI.data.matches.filter((match) => {
		console.log(match.name);
		return match.name.toUpperCase().includes(query.toUpperCase());
	});
};
