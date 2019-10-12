export const initialState = {
	formDataState: {
		isLoading: false,
		query: '',
		selectedMatch: {
			name: '',
			sport: '',
			country: '',
			competition: '',
			bets: []
		},
		selectedBet: {
			market: '',
			picks: '',
			odds: { id: '', value: '', bookieId: '' }
		}
	},
	isLoading: false
};
