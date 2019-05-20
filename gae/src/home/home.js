import React from 'react';

import Header from './header/header';

import Champions from './pages/champions';
import Maps from './pages/map';
import Cinematic from './pages/cinematic';

export default class Home extends React.Component {
	state = {
		currentPage: 'CHAMPIONS'
	}

	handlePageChange = currentPage => {
		this.setState({currentPage});
	}

	renderPage = currentPage => {
		switch(currentPage) {
			case 'CHAMPIONS':
				return <Champions />
			case 'MAP':
				return <Maps />
			case 'CINEMATIC':
				return <Cinematic />
			default:
				return null;
		}
	}

	render() {
		let {currentPage} = this.state;

		return(
			<div>
				<Header currentPage={currentPage} handlePageChange={this.handlePageChange} />
				{this.renderPage(currentPage)}
			</div>
		)
	}
}