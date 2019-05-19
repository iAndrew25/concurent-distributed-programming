import ReactDOM from 'react-dom';
import Routes from './app/routes';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter>
		<Routes />
	</BrowserRouter>
), document.getElementById('root'));