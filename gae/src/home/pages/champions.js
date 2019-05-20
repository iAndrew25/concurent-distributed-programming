import React from 'react';

import {LOL_URL, LOL_IMG, TRANSLATE, SPEECH} from '../../utils/config';

export default class Home extends React.Component {
	state = {
		displayChampions: [],
		champions: []
	}

	componentDidMount() {
		fetch(LOL_URL)
			.then(r => r.json())
			.then(({data}) => this.setState({champions: data}));
	}

	handleOnChange = e => {
		let championName = e.target.value.toLowerCase().trim();

		if(championName) {
			this.setState({
				displayChampions: Object.entries(this.state.champions).filter(([key, value]) => key.toLowerCase().includes(championName) === true)
			});
		} else {
			this.setState({
				displayChampions: []
			});
		}
	}

	speech = text => {
		window.open(`${SPEECH}${text}`);
	}

	translate = (text, id) => {
		fetch(`${TRANSLATE}&lang=ro&text=${text}`)
			.then(r => r.json())
			.then(({text}) => {
				this.setState({
					displayChampions: this.state.displayChampions.map(([key, value]) => {
						if(key === id) {
							return [
								key,
								Object.assign({}, value, {
									blurb: text.join('. ')
								})
							]
						} else {
							return [key, value];
						}
					})
				});	
			});
	}

	renderDisplayChampions() {
		return (
			<div className="champions-list">
				{this.state.displayChampions.map(([key, value]) => 
					<div className="champion" key={key}>
						<img src={`${LOL_IMG}/${value.image.full}`} className="champion-image"/>
						<div>
							<span className="champion-name">{key}</span>
							<p>{value.blurb}</p>
							<button onClick={() => this.translate(value.blurb, key)}>Translate</button>
							<button onClick={() => this.speech(value.blurb)}>Speech</button>
							<p>Tags: <span className="tags">{value.tags.join(', ')}</span></p>
						</div>
					</div>
				)}
			</div>
		)
	}

	render() {
		let {currentPage} = this.state;

		return(
			<div className="selected-champions">
				<input onChange={this.handleOnChange} placeholder="Search your champion..." className="champions-input" />
				{this.renderDisplayChampions()}
			</div>
		)
	}
}