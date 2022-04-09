const PromiseState = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

export default class CustomPromise {
	constructor(executor) {
		this.state = PromiseState.PENDING;
		this.result = null;
		this.child = null;
		this.fulfilledQueue = [];
		this.rejectedQueue = [];

		executor(this._resolve.bind(this), this._reject.bind(this));
	}

	_resolve(value) {
		this.state = PromiseState.FULFILLED;
		this.result = value;
		if (this.fulfilledQueue.length > 0) {
			this.fulfilledQueue.shift()(value);
		} else {
			this.child?._resolve(value);
		}
	}

	_reject(reason) {
		this.state = PromiseState.REJECTED;
		this.result = reason;
		if (this.rejectedQueue.length > 0) {
			this.rejectedQueue.shift()(reason);
		} else {
			this.child?._reject(reason);
		}
	}

	then(onFulfilled) {
		this.child = new CustomPromise(resolve => {
			switch (this.state) {
				case PromiseState.PENDING: {
					this.fulfilledQueue.push(value => {
						resolve(onFulfilled(value));
					});
					break;
				}
				case PromiseState.FULFILLED: {
					resolve(onFulfilled(this.result));
					break;
				}
			}
		});
		return this.child;
	}

	catch(onRejected) {
		this.child = new CustomPromise(resolve => {
			switch (this.state) {
				case PromiseState.PENDING: {
					this.rejectedQueue.push(reason => {
						resolve(onRejected(reason));
					});
					break;
				}
				case PromiseState.REJECTED: {
					resolve(onRejected(this.result));
					break;
				}
			}
		});
		return this.child;
	}
}
