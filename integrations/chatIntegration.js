var convCore = require('../convCore.js');
var Nexmo = require('nexmo');
const request = require('request');
var AppToken = {};

var nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

var initConv = (customerId) => {
    console.log("INITIALIZING CONVERSATION: ", customerId);

    var conv = convCore.getConv(customerId);
    var initialMessage = process.env.INITIAL_MESSAGE.replace("<brand>", conv.brand);
    var isnum = /^\d+$/.test(conv.customerId);

    if (isnum) {
        console.log("Sending message to: ", process.env.NEXMO_NUMBER);

        // IMPROVE INITIAL MESSAGE BY USING THE BRAND IN THE MESSAGE.
        nexmo.message.sendSms(process.env.NEXMO_NUMBER, conv.customerId, initialMessage);
    } else {
        console.log("Conversation is over Facebook");
    }

    //Auth Live Engage Session.
    //Create Live Engage Conversation.
    //Send initial Mesasge.
}

var handleInboundSms = (customerId, message) => {
    var conv = getConv(conv);

    //Forward to live Engage Platform
}

var handleInboundAgent = (customerId, message) => {
    var conv = getConv(conv);

    nexmo.message.sendSms(process.env.NEXMO_NUM, conv.customerId, message);
}

var getAppJwt = () => {
    var options = {
        uri: "https://va.sentinel.liveperson.net/sentinel/api/account/" + process.env.LIVE_PERSON_ACCT_NUM + "/app/token?v=1.0&grant_type=client_credentials&client_id=" + process.env.LIVE_PERSON_CLIENT_ID + "&client_secret=" + process.env.LIVE_PERSON_CLIENT_SECRET,
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };

    request(options, (err, res, body) => {
        AppToken = JSON.parse(body);
        console.log("GET APP JWT: ", AppToken.access_token);
    })
}

var getConsumerJwt = () => {
    var params = {
        "ext_consumer_id": "nexmo_google_customer"
    }

    var options = {
        uri: "https://va.idp.liveperson.net/api/account/" + process.env.LIVE_PERSON_ACCT_NUM + "/consumer?v=1.0",
        method: 'POST',
        json: params,
        headers: {
            "Content-Type": "application/json",
            "Authorization": AppToken.access_token
        }
    };

    console.log("Consumer options: ", options)

    request(options, (err, res, body) => {
        AppToken = body;
        console.log("GET Consumer JWT: ", AppToken);
    })
}

module.exports.initConv = initConv;
module.exports.handleInboundSms = handleInboundSms;
module.exports.handleInboundAgent = handleInboundAgent;
module.exports.getAppJwt = getAppJwt;