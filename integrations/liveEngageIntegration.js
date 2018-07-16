var convCore = require('../convCore.js');
var Nexmo = require('nexmo');
 
var nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APP_ID
  });

var initConv = (cuuid) => {
  var conv = convCore.getConv(cuuid);

  nexmo.message.sendSms(process.env.NEXMO_NUM, recipient, message, options, callback)

}