import {API_URL} from './config';

export default function(url, options) {
	return fetch(`${API_URL}${url}`, Object.assign({"headers": {"Content-Type": "application/json", "Accept": "application/json"}}, options))
}