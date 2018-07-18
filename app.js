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
    //NOT GETTING INBOUND SMS. MIGHT NOT BE GETTING REQ.body as expected
    var conv = convCore.getConv(req.query.msisdn)
    liveEngageCore.handleInboundSms(req.query.msisdn, req.query.text)

    resp.sendStatus(200);
});

app.all("/event/content/standard", (req, resp) => {
    console.log("STANDARD CONTENT: ", req.body.body.changes)

    console.log("_______________________________________________")

    console.log("STANDARD CONTENT: ", req.body.body)

    console.log("***********************************************")
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