var convCore = require('../convCore.js');
var Nexmo = require('nexmo');

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

module.exports.initConv = initConv;
module.exports.handleInboundSms = handleInboundSms;
module.exports.handleInboundAgent = handleInboundAgent;