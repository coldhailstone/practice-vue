import CustomPromise from './promise';

class Axios {
	constructor() {
		this.config = {
			baseUrl: ''
		};
	}

	create(config) {
		const instance = new Axios();
		instance.config = { ...config };

		return instance;
	}

	get(url, config) {
		if (config && config.params) {
			const queryString = Object.keys(config.params)
				.map(key => `${key}=${config.params[key]}`)
				.join('&');
			url += `?${queryString}`;
		}
		return this._fetch('GET', url);
	}

	post(url, data) {
		return this._fetch('POST', url, data);
	}

	_fetch(method, url = '', data) {
		return new CustomPromise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = () => {
				if (xhr.status === 200 || xhr.status === 201) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(`${xhr.status} ${xhr.statusText}`);
				}
			};
			xhr.open(
				method,
				this.config.baseUrl ? `${this.config.baseUrl}${url}` : url
			);
			xhr.send(data ? JSON.stringify(data) : {});
		});
	}
}

export default new Axios();
