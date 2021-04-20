# Implemeting the CloseApp package with Express

```js
const express = require("express");
const bodyParser = require("body-parser");

//requiring the package
const Clapway = require("./clapway");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//The user's token
let token =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY2xhcHdheS5jbGFwLmNvLmlsIiwianRpIjoiNzRuME9wb1pOTGR5UkFRLS0xYWtNbHZyZTltNXdRIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0OjgwMDEiLCJoYXNoSWQiOiI3NG4wT3BvWk5MZHlSQVEtLTFha01sdnJlOW01d1EiLCJwbGFuX2lkIjoyNCwiZXhwaXJlX2F0IjpudWxsLCJ0aW1lcyI6MTAwLCJwbGFuIjoiXHUwNWQ3XHUwNWQ5XHUwNWUwXHUwNWRkIiwicHJvamVjdCI6Ilx1MDVkMVx1MDVkM1x1MDVkOVx1MDVlN1x1MDVkNVx1MDVlYSIsInByb2plY3RfaWQiOjQsImN1cnJlbnRfdGltZSI6IjIwMjEtMDQtMjBUMTM6NTk6MjAuMjQyMjM0WiJ9._En1Llv_Mkegdm0W4EgLeYQuD9n3LXAvQCLV4MgCzhM&";

//Creating an instance of clapway, providing it with a token
let c1 = new Clapway(token);

//getPaymentUrl method
//this route will redirect the user to the payment page, in order for him to pay and get a token
//the getPaymentUrl accepts the project hashed id
app.get("/redirectToPayment", (req, res) => {
	let hash = "qlmpwv40jr";
	let url = Clapway.getPaymentUrl(hash);
	res.redirect(url);
});

//The verify method
//this method will verify the user's token
//will return true if its valid, and false if its not, or if it have no more uses left
app.get("/verify", async (req, res) => {
	let response = await c1.verify();
	res.send(response);
});

//The usage method
//Reduce one usage from user subscription
//Will return true if 1 usage has been reduced and false if not
app.post("/usage", async (req, res) => {
	let response = await c1.usage();
	res.send(response);
	response = await c1.verify();
});

app.listen(3000, () => {
	console.log(`Server is listening on port 3000`);
});
```
