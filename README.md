# Clapway Node Library

## Installation

`npm i @bokoness/clapway`

## Express example

```js
const express = require("express");
const bodyParser = require("body-parser");

//requiring the Clapway package
const Clapway = require("./clapway");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
simple steps for first usage of the package:
1 - redirecting user to payment, using the hash of the project(test hash or real one)
2 - getting the token from the url
3 - initializing clapway object with the users's token
4 - now we can use the verify function and the usage function
*/

//our Clapway object
let clap = new Clapway();

//redirect user to payment area
app.get("/pay", (req, res) => {
	let hash = "qlmpwv40jr";
	let url = Clapway.getPaymentUrl(hash);
	res.redirect(url);
});

//user will redirect to this route after payment
//now we can verify he's token
app.get("/afterPayment", async (req, res) => {
	let token = req.query.token;
	clap.setToken(token);
	await clap.verify();
	if (clap.verified) {
		res.send(`token is verified and have usages. usages left: ${clap.times}`);
	} else {
		res.status(403).send("User is not verified");
	}
});

//this endpoint will reduce one usage from the user's package
app.post("/reduceUsage", async (req, res) => {
	await clap.verify();
	if (clap.verified) {
		if (await clap.usage()) {
			res.send(`there has been a usage. usages left:  ${clap.times}`);
		} else {
			res.status(403).send("No more uses left");
		}
	} else {
		res.status(403).send("User is not verfied");
	}
});

app.listen(3000, () => {
	console.log(`Server is listening on port 3000`);
});
```
