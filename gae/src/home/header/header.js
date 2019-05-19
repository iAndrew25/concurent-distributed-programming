import React from 'react';
import classNames from 'classnames';

export default function({currentPage, handlePageChange}) {
	return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<a className="navbar-brand" href="#">League of Legends</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarColor01">
				<ul className="navbar-nav mr-auto">
					<li className={classNames("nav-item", {"active": currentPage === 'CHAMPIONS'})} onClick={() => handlePageChange('CHAMPIONS')}>
						<a className="nav-link">Champions</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}