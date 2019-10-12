import React from 'react';
import { Col, Row, CardTitle } from 'reactstrap';
import './form.scss';
import { connect } from 'react-redux';
import { formDataOperations } from '../redux/ducks/formData';

const { getFormData, setQuery, setFormData } = formDataOperations;

const Form = ({ setQuery, setFormData, formDataState, getFormData }) => {
	const { formData, query, selectedMatch } = formDataState;
	const handleChange = (event) => {
		setQuery(event.target.value);
		getFormData(event.target.value);
		setFormData();
	};
	const selectMatch = (match) => {
		setFormData(match);
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
	return (
		<div className="content">
			<CardTitle>APUESTA</CardTitle>
			<Row>
				<Col xs={12} xl={12}>
					<p>Partido</p>
					<input placeholder=" - " value={query} onChange={handleChange} />
					{renderAutocomplete()}
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
					<input placeholder="..." />
				</Col>
				<Col xs={4} xl={4}>
					<p>Pick</p>
					<input placeholder="..." />
				</Col>
				<Col xs={4} xl={4}>
					<p>Odds</p>
					<input placeholder="..." />
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = ({ formDataState }) => ({
	formDataState
});

const mapDispatchToProps = { getFormData, setQuery, setFormData };

export default connect(mapStateToProps, mapDispatchToProps)(Form);
