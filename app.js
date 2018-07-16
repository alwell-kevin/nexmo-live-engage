require('dotenv').config()

var https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const convCore = require('./convCore.js')
const liveEngageCore = require('./integrations/liveEngageIntegration.js')

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));

//http://localhost:3000/pool/create?key=374609c6&secret=330ef6e8837b1b5f&pool_id=Adidas_Verify_Pool

//CREATE POOL
app.all('/launch', (req, resp) => {
    //Create conversation instance.
    //Set conversation LiveId
    //Set conversation phone to req.query.phone
    //Send Init Message to conversation.phone

    var conv = convCore.createConv(req.query.phone);
    liveEngageCore.initConv(conv.uuid)

    resp.sendStatus(200);
});

// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})