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

	get(url) {
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
					reject(xhr.responseText);
				}
			};
			xhr.open(
				method,
				this.config.baseUrl ? `${this.config.baseUrl}${url}` : url
			);
			xhr.send(data ? JSON.stringify(data) : null);
		});
	}
}

export default new Axios();
