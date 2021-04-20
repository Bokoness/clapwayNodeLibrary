const axios = require("axios");

const host = "https://clapway.clap.co.il";

class Clapway {
	constructor(token) {
		this.times;
		this.verified = false;
		this.token = token;
	}

	/**
	 * Verifies a token
	 * @param {*} token the token to verify
	 * @returns true if token is verified and false if not
	 */
	async verify() {
		try {
			let url = `${host}/api/subscription/verify?token=${this.token}`;
			const { data } = await axios.get(url);
			this.times = data.times;
			this.verified = true;
			return true;
		} catch (e) {
			if (e.response.status === 403) console.log("No more usages");
			return false;
		}
	}

	/**
	 * Reduce one usage from user subscription
	 * @param token the user's token
	 * @returns true if
	 */
	async usage() {
		try {
			let url = `${host}/api/subscription/usage`;
			await axios.post(url, {
				token: this.token,
			});
			this.times--;
			return true;
		} catch (e) {
			if (e.response.stats === 403) {
				console.log("No more usages");
				return false;
			}
			return new Error(e);
		}
	}

	/**
	 * Returns a url for payment
	 * @param hash the project's hash
	 * @returns a payment url
	 */
	static getPaymentUrl(hash) {
		return `${host}?p=${hash}`;
	}
	//get metadata
}

module.exports = Clapway;
