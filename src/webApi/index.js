import fetch from 'node-fetch';

export default class webApi {
	static get(url) {
		return fetch(url, {
			method: 'GET'
		}).then(res => res.json());
	}
	static post() {
		return fetch(url, {method: 'POST'}).then(res => res.json());
	}
}