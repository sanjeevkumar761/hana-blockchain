/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");

var port  = process.env.PORT || 3000;

var options = {
	anonymous : true, // remove to authenticate calls
	redirectUrl : "/index.xsjs"
};

// configure HANA
try {
	options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// configure UAA
try {
	options = Object.assign(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));
} catch (err) {
	console.log("[WARN]", err.message);
}

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);

//Make a POST requst to Hyperldger Fabric REST Server to do a transaction (sets sensor temperature to 19)
var request = require('request');

	var options = {
	  uri: 'http://148.100.99.170:3000/api/org.acme.sample.SetSensorTemp',
	  method: 'POST',
	  json: {
	    			"$class": "org.acme.sample.SetSensorTemp",
				  "gauge": "resource:org.acme.sample.Sensor#6146",
				  "newSensorValue": 19
	  }
	};
	
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body.id); // Print the shortened url.
	  }
});
