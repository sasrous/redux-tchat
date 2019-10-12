import React from 'react';
import { Col, Row, CardTitle } from 'reactstrap';
import './form.scss';
import { connect } from 'react-redux';
import { formDataOperations } from '../redux/ducks/formData';

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
	};
	const clearMatch = () => {
		setFormData();
		setQuery('');
	};
	const saveBetDetail = (label, value) => {
		setBet({
			label: label,
			value: value
		});
	};
	const renderAutocomplete = () => {
		return formData && formData.length > 0 && query.length > 0 ? (
			formData.map((match) => (
				<button
					key={match.name}
					className={
						match.name === selectedMatch.name ? (
							'autocomplete__suggestion--selected autocomplete__suggestion'
						) : (
							'autocomplete__suggestion'
						)
					}
					onClick={() => selectMatch(match)}
				>
					{match.name}
				</button>
			))
		) : (
			<div>no matches placeholder</div>
		);
	};
	const renderDropdown = (label) => {
		if (selectedMatch.bets) {
			switch (label) {
				case 'market':
					return selectedMatch.bets.map((bet) => {
						return <button onClick={() => saveBetDetail(label, bet[label])}> {bet[label]}</button>;
					});
				case 'picks':
					return selectedMatch.bets.map((bet) => {
						return bet[label][0]
							.split(' ')
							.map((pick) => <button onClick={() => saveBetDetail(label, pick)}> {pick}</button>);
					});
				case 'odds':
					return selectedMatch.bets.map((bet) => {
						return bet[label].map((odd) => {
							return (
								<button
									onClick={() =>
										saveBetDetail(label, { id: odd.id, value: odd.value, bookieId: bet.bookieId })}
									id={odd.id}
								>
									{odd.value.toString()}
								</button>
							);
						});
					});
				default:
					return '';
			}
		}
	};
	return (
		<div className="content">
			<CardTitle>APUESTA</CardTitle>
			<Row>
				<Col xs={12} xl={12}>
					<p>Partido</p>
					<input placeholder=" - " value={query} onChange={handleChange} />
					{renderAutocomplete()}
					<button onClick={() => clearMatch()}>X</button>
				</Col>
			</Row>
			<Row>
				<Col xs={4} xl={4}>
					<p>Deporte</p>
					<input placeholder="selecciona un patido" value={selectedMatch.sport} readOnly />
				</Col>
				<Col xs={4} xl={4}>
					<p>Pais</p>
					<input placeholder="selecciona un partido" value={selectedMatch.country} readOnly />
				</Col>
				<Col xs={4} xl={4}>
					<p>Torneo</p>
					<input placeholder="selecciona un partido" value={selectedMatch.competition} readOnly />
				</Col>
			</Row>
			<CardTitle>Pick</CardTitle>
			<Row>
				<Col xs={4} xl={4}>
					<p>Mercado</p>
					<input placeholder="..." value={selectedBet.market} readOnly />
					{renderDropdown('market')}
				</Col>
				<Col xs={4} xl={4}>
					<p>Pick</p>
					<input placeholder="..." value={selectedBet.picks} readOnly />
					{renderDropdown('picks')}
				</Col>
				<Col xs={4} xl={4}>
					<p>Odds</p>
					<input
						placeholder="..."
						value={`${selectedBet.odds.value} - ${selectedBet.odds.bookieId}`}
						readOnly
					/>
					{renderDropdown('odds')}
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
