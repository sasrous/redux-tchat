export const fakeAPI = {
	data: {
		bookies: [
			{
				id: 'bet365',
				name: 'Bet 365'
			},
			{ id: 'hill', name: 'William Hill' }
		],
		countries: [ { id: 'fr', name: 'France' }, { id: 'es', name: 'Spain' } ],
		matches: [
			{
				name: 'Barcelona - Madrid',
				sport: 'Fútbol',
				country: 'es',
				competition: 'La Liga',
				bets: [
					{
						bookieId: 'bet365',
						market: '12',
						picks: [ '1, 2' ],
						odds: [ { id: '1', value: 1.4 }, { id: '2', value: 3.4 } ]
					},
					{
						bookieId: 'hill',
						market: '12',
						picks: [ '1, 2' ],
						odds: [ { id: '1', value: 1.6 }, { id: '2', value: 3.6 } ]
					}
				]
			},
			{
				name: 'Nadal - Federer',
				sport: 'Tennis',
				country: 'fr',
				competition: 'Roland-Garros',
				bets: [
					{
						bookieId: 'bet365',
						market: '12',
						picks: [ '1, 2' ],
						odds: [ { id: '1', value: 1.4 }, { id: '2', value: 1.4 } ]
					},
					{
						bookieId: 'hill',
						market: '12',
						picks: [ '1,2' ],
						odds: [ { id: '1', value: 0.8 }, { id: '2', value: 0.9 } ]
					}
				]
			}
		]
	}
};
