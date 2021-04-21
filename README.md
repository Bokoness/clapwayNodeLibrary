# Clapway Node Library

## Instaltion

## Express example

```js
const express = require("express");
const bodyParser = require("body-parser");

//requiring the Clapway package
const Clapway = require("@bokoness/clapway");

const app = express();

let clap = new Clapway();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
simple steps for first usage of the package:
    1 - redirecting user to payment, using the hash of the project(test hash or real one)
    2 - getting the token from the url
    3 - initializing clapway object with the users's token
    4 - now we can use the verify function and the usage function
*/

app.get("/pay", (req, res) => {    
	let hash = "qlmpwv40jr";
	let url = Clapway.getPaymentUrl(hash);
	res.redirect(url);
});

app.get("/afterPayment", async (req, res) =>{    
    let token = req.query.token;
    clap.setToken(token); 
    await clap.verify();
    if(clap.verified){
        console.log("token is verified and have usages. usages left: ", clap.times);
        res.send(`token is verified and have usages. usages left: ${clap.times}`);
    } else {
        res.status(403).send("User is not verified")
    }
    
    if(await clap.usage()){
        console.log("there has been a usage. usages left: ", clap.times);
    }        

})

app.listen(8001, () => {
	console.log(`Server is listening on port 8001`);
});

