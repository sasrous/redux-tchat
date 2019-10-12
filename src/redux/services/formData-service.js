import { filterData } from '../../utils';
export const getFormData = async (query) => {
	try {
		return await filterData(query);
	} catch (error) {
		throw error;
	}
};
