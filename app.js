require('dotenv').config()

var https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const convCore = require('./convCore.js')
const liveEngageCore = require('./integrations/chatIntegration.js')

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

//LAUNCH CONVERSATION
app.all('/launch', (req, resp) => {
    //Create conversation instance.
    //Set conversation LiveId
    //Set conversation customerId to req.query.customerId
    //Send Init Message to conversation.customerId

    var conv = convCore.createConv(req.query.customerId, req.query.brand);
    liveEngageCore.initConv(conv.uuid)

    resp.sendStatus(200);
});

//INBOUND MESSAGE
app.all('/inbound/sms', (req, resp) => {
    var conv = convCore.getConv(req.query.from)
    liveEngageCore.handleInboundSms(req.query.text, req.query.from)

    resp.sendStatus(200);
});

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})