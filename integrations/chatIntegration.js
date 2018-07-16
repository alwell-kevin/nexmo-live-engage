var convCore = require('../convCore.js');
var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

var initConv = (cuuid) => {
    var conv = convCore.getConv(cuuid);
    var initialMessage = process.env.INITIAL_MESSAGE.replace("<brand>", conv.brand);
    var isnum = /^\d+$/.test(conv.customerId);
    
    if (isnum) {
        //IMPROVE INITIAL MESSAGE BY USING THE BRAND IN THE MESSAGE.
        nexmo.message.sendSms(process.env.NEXMO_NUM, conv.customerId, initialMessage);
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















