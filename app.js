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
    console.log(req.body)
    var conv = convCore.getConv(req.query.from)
    liveEngageCore.handleInboundSms(req.query.text, req.query.from)

    resp.sendStatus(200);
});

app.all("/event/content/standard", (req, resp) => {
    console.log(req)
    resp.sendStatus(200);
});

app.all("/event/content/rich", (req, resp) => {
    console.log(req)
    resp.sendStatus(200);
});

app.all("/event/status/accept", (req, resp) => {
    console.log(req)
    resp.sendStatus(200);
});

app.all("/event/state/chat", (req, resp) => {
    console.log(req)
    resp.sendStatus(200);
});

app.all("/event/state/notify", (req, resp) => {
    console.log(req)
    resp.sendStatus(200);
});

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})