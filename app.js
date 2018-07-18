require('dotenv').config()

var https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const convCore = require('./convCore.js')
const liveEngageCore = require('./integrations/chatIntegration.js')

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

//LAUNCH CONVERSATION ON SMS & LP
app.all('/launch', (req, resp) => {
    var brand = req.query.brand.replace(/\s/g, '');
    var customerId = req.query.customerId;
    liveEngageCore.initConv(customerId, brand);
    var url = "https://www." + brand + ".com"
    resp.redirect(url);
});

//INBOUND MESSAGE
app.all('/inbound/sms', (req, resp) => {
    var message = req.query.text;
    console.log("_______________________________________________")
    console.log("SMS INBOUND: ", message);
    console.log("***********************************************")
    //NOT GETTING INBOUND SMS. MIGHT NOT BE GETTING REQ.body as expected
    var conv = convCore.getConv(req.query.msisdn)
    liveEngageCore.handleInboundSms(req.query.msisdn, message)

    resp.sendStatus(200);
});

app.all("/event/content/standard", (req, resp) => {
    var msg = req.body.body.changes[0].event.message;
    var convId = req.body.body.changes[0].dialogId;
    console.log("***********************************************")
    console.log(req.body.body.changes[0]);
    console.log("_______________________________________________")
    console.log("AGENT INBOUND: ", msg, convId);
    console.log("***********************************************")
    if (msg && convId) {
        liveEngageCore.handleInboundAgent(convId, msg);
    }
    resp.sendStatus(200);
});

app.all("/event/content/rich", (req, resp) => {
    console.log(req.body)
    resp.sendStatus(200);
});

app.all("/event/status/accept", (req, resp) => {
    console.log(req.body)
    resp.sendStatus(200);
});

app.all("/event/state/chat", (req, resp) => {
    // console.log(req.body)
    resp.sendStatus(200);
});

app.all("/event/state/notify", (req, resp) => {
    console.log(req.body)
    resp.sendStatus(200);
});

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})