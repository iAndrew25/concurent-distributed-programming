import React from 'react';

import Header from './header/header';

import {LOL_URL, LOL_IMG} from '../utils/config';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 'CHAMPIONS',
			champions: [],
			displayChampions: []
		}

		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		//this.translate = this.translate.bind(this);
	}

	componentDidMount() {
		fetch(LOL_URL)
			.then(r => r.json())
			.then(({data}) => this.setState({champions: data}));
	}

	handlePageChange(currentPage) {
		this.setState({currentPage});
	}

	handleOnChange(e) {
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

	renderDisplayChampions() {
		return (
			<div className="champions-list">
				{this.state.displayChampions.map(([key, value]) => 
					<div className="champion">
						<img src={`${LOL_IMG}/${value.image.full}`} className="champion-image"/>
						<div>
							<span className="champion-name">{key}</span>
							<p>{value.blurb}</p>
							<button>Translate</button>
							<p>Tags: <span className="tags">{value.tags.join(', ')}</span></p>
						</div>
					</div>
				)}
			</div>
		)
	}

//async translate(id, text) {
//	const {Translate} = require('@google-cloud/translate');

//	const translate = new Translate({projectId: 'leagueoflegends'});

//	const target = 'ro';

//	const [translation] = await translate.translate(text, target);
//	
//	this.setState({
//		displayChampions: this.state.displayChampions.map(([key, value]) => {
//			if(key === id) {
//				return [
//					key,
//					Object.assign({}, value, {
//						blurb: translation
//					})
//				]
//			} else {
//				return [key, value];
//			}
//		})
//	});	
//}

	render() {
		let {currentPage} = this.state;

		return(
			<div>
				<Header currentPage={currentPage} handlePageChange={this.handlePageChange} />
				<div className="selected-champions">
					<input onChange={this.handleOnChange} placeholder="Search your champion..." className="champions-input" />
					{this.renderDisplayChampions()}
				</div>
			</div>
		)
	}
}