import React from 'react';
import { Col, Row, CardTitle } from 'reactstrap';
import './form.scss';
import { connect } from 'react-redux';
import { formDataOperations } from '../redux/ducks/formData';

//select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const { getFormData, setQuery, setBet, setFormData } = formDataOperations;

const Form = ({ setQuery, setBet, setFormData, formDataState, getFormData }) => {
	const { formData, query, selectedMatch, selectedBet } = formDataState;

	const handleChange = (event) => {
		setQuery(event.target.value);
		getFormData(event.target.value);
		setFormData();
	};
	const selectMatch = (match) => {
		setQuery(match.name);
		setFormData(match);
		saveBetDetail();
	};
	const clearMatch = () => {
		setFormData();
		setQuery('');
		saveBetDetail();
	};
	const saveBetDetail = (label, value) => {
		setBet({
			label: label,
			value: value
		});
	};
	const handleOddSubmit = (e) => {
		const { bets } = selectedMatch;
		bets.map((bet) => {
			if (bet.bookieId === e) {
				saveBetDetail('odds', {
					bookieId: e,
					id: selectedBet.picks,
					value: bet.odds[selectedBet.picks - 1].value
				});
			}
			return null;
		});
	};
	const renderAutocomplete = () => {
		return formData && formData.length > 0 && query.length > 0
			? formData.map((match) => (
					<button key={match.name} className={'autocomplete__suggestion'} onClick={() => selectMatch(match)}>
						{match.name}
					</button>
				))
			: null;
	};
	const renderDropdown = (label) => {
		if (selectedMatch.bets && selectedMatch.bets.length > 0) {
			const { bets } = selectedMatch;
			switch (label) {
				case 'market':
					let marketarr = [];
					return bets.map((bet) => {
						//check for fuplicates
						if (marketarr.indexOf(bet.market) < 0) {
							marketarr.push(bet.market);
							return <MenuItem value={bet.market}>{bet.market}</MenuItem>;
						} else return null;
					});
				case 'picks':
					let pickarr = [];
					return bets.map((bet) => {
						return bet.picks[0].split(', ').map((pick) => {
							if (pickarr.indexOf(pick) < 0) {
								pickarr.push(pick);
								return <MenuItem value={pick}>{pick}</MenuItem>;
							} else return null;
						});
					});

				case 'odds':
					return bets.map((bet) => {
						return bet.odds.map((odd) => {
							if (odd.id === selectedBet.picks) {
								return (
									<MenuItem
										value={bet.bookieId}
									>{`${odd.value.toString()} - ${bet.bookieId}`}</MenuItem>
								);
							} else return null;
						});
					});
				default:
					return '';
			}
		}
	};
	return (
		<div className="content">
			<CardTitle className="main-title">Apuesta</CardTitle>
			<Row>
				<Col xs={12} md={12}>
					<p>Partido</p>
					<div className="autocomplete">
						<input
							placeholder="ej: Barcelona - Madrid"
							value={query}
							onChange={handleChange}
							className="autocomplete__input"
						/>
						<button className="autocomplete__clear-btn" onClick={() => clearMatch()}>
							X
						</button>
						<div className={query.length === 0 ? 'autocomplete__wrapper--hidden' : 'autocomplete__wrapper'}>
							{selectedMatch.name ? null : renderAutocomplete()}
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={4}>
					<div className="autofill">
						<p>Deporte</p>
						<input disabled placeholder="selecciona un patido" value={selectedMatch.sport} readOnly />
					</div>
				</Col>
				<Col xs={12} md={4}>
					<div className="autofill">
						<p>Pais</p>
						<input disabled placeholder="selecciona un partido" value={selectedMatch.country} readOnly />
					</div>
				</Col>
				<Col xs={12} md={4}>
					<div className="autofill">
						<p>Torneo</p>
						<input
							disabled
							placeholder="selecciona un partido"
							value={selectedMatch.competition}
							readOnly
						/>
					</div>
				</Col>
			</Row>
			<CardTitle>Pick</CardTitle>
			<Row>
				<Col xs={12} md={4} className="dropdown">
					<FormControl disabled={!selectedMatch.name}>
						<InputLabel htmlFor="market-id">Market</InputLabel>
						<Select
							value={selectedBet.market}
							onChange={(e) => saveBetDetail('market', e.target.value)}
							inputProps={{
								name: 'market',
								id: 'market-id'
							}}
						>
							{renderDropdown('market')}
						</Select>
					</FormControl>
				</Col>
				<Col xs={12} md={4} className="dropdown">
					<FormControl disabled={!selectedBet.market || !selectedMatch.name}>
						<InputLabel htmlFor="market-id">Pick</InputLabel>
						<Select
							value={selectedBet.picks}
							onChange={(e) => saveBetDetail('picks', e.target.value)}
							inputProps={{
								name: 'picks',
								id: 'picks-id'
							}}
						>
							{renderDropdown('picks')}
						</Select>
					</FormControl>
				</Col>
				<Col xs={12} md={4} className="dropdown">
					<FormControl disabled={!selectedBet.picks || !selectedMatch.name}>
						<InputLabel htmlFor="odds-id">Odds</InputLabel>
						<Select
							value={selectedBet.odds.bookieId}
							onChange={(e) => handleOddSubmit(e.target.value)}
							inputProps={{
								name: 'odds',
								id: 'odds-id'
							}}
						>
							{renderDropdown('odds')}
						</Select>
					</FormControl>
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = ({ formDataState }) => ({
	formDataState
});

const mapDispatchToProps = { getFormData, setQuery, setBet, setFormData };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
