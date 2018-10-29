import fetch from 'node-fetch';

export default class webApi {
	static get(url) {
		return fetch(url, {
			method: 'GET'
		}).then(res => {
			return res.json();
		});
	}
}