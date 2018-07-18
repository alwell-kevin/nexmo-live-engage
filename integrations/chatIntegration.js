var convCore = require('../convCore.js');
var Nexmo = require('nexmo');
const request = require('request');
var AppToken = {};
var ConsumerToken = {}

var nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
});

var initConv = (customerId, brand) => {
    //Auth Live Engage Session.
    //Create Live Engage Conversation.
    //Send initial Mesasge.
    getAppJwt().then(function(access_token) {
        getConsumerJwt().then(function(token) {
            createLiveEngageConv().then(function(conversationId) {
                var conv = convCore.createConv(customerId, brand, conversationId);
                var initialMessage = process.env.INITIAL_MESSAGE.replace("<brand>", conv.brand);
                var isnum = /^\d+$/.test(conv.customerId);

                if (isnum) {
                    console.log("Sending message to: ", process.env.NEXMO_NUMBER);

                    // IMPROVE INITIAL MESSAGE BY USING THE BRAND IN THE MESSAGE.
                    nexmo.message.sendSms(process.env.NEXMO_NUMBER, conv.customerId, initialMessage);
                } else {
                    console.log("Conversation is happening via Facebook channel.");
                }
            })
        })
    })
}

var handleInboundSms = (customerId, message) => {
    var conv = convCore.getConv(customerId);

    //Forward to live Engage Platform
    console.log("INBOUND SMS: ", message, "CUSTOMER: ", customerId, "CONV: ", conv);
    sendLivePersonMessage(conv.conversationId, message)
}

var handleInboundAgent = (customerId, message) => {
    var conv = convCore.getConv(customerId);

    nexmo.message.sendSms(process.env.NEXMO_NUM, conv.customerId, message);
}

var getAppJwt = () => {
    return new Promise((resolve, reject) => {
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
            resolve(AppToken.access_token)
        })
    })
}

var getConsumerJwt = () => {
    return new Promise((resolve, reject) => {
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

        request(options, (err, res, body) => {
            ConsumerToken = body;
            console.log("GET Consumer JWT: ", ConsumerToken);
            resolve(ConsumerToken)
        })
    })
}

createLiveEngageConv = () => {
    return new Promise((resolve, reject) => {
        var params = [{
                "kind": "req",
                "id": "1,",
                "type": "userprofile.SetUserProfile",
                "body": {
                    "authenticatedData": {
                        "lp_sdes": [{
                                "type": "ctmrinfo",
                                "info": {
                                    "socialId": "1234567890",
                                    "ctype": "vip"
                                }
                            },
                            {
                                "type": "personal",
                                "personal": {
                                    "firstname": "Willy",
                                    "lastname": "Wonka",
                                    "gender": "MALE"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "kind": "req",
                "id": "2,",
                "type": "cm.ConsumerRequestConversation",
                "body": {
                    "channelType": "MESSAGING",
                    "brandId": "5459027",
                    "ttrDefName": "URGENT",
                    "skillId": "-1"
                }
            }
        ]

        var options = {
            uri: "https://va.msg.liveperson.net/api/account/" + process.env.LIVE_PERSON_ACCT_NUM + "/messaging/consumer/conversation?v=3",
            method: 'POST',
            json: params,
            headers: {
                "Content-Type": "application/json",
                "Authorization": AppToken.access_token,
                "X-LP-ON-BEHALF": ConsumerToken.token
            }
        };

        console.log("Open new conversation options: ", options)

        request(options, (err, res, resp) => {
            var conversationId = resp[1].body.conversationId;
            console.log("CREATED NEW CONV: ", conversationId);
            resolve(conversationId);
        })
    })
}

var sendLivePersonMessage = (convId, message) => {
    return new Promise((resolve, reject) => {
        var params = {
            "kind": "req",
            "id": "1",
            "type": "ms.PublishEvent",
            "body": {
                "dialogId": convId,
                "event": {
                    "type": "ContentEvent",
                    "contentType": "text/plain",
                    "message": message
                }
            }
        }

        var options = {
            uri: "https://va.msg.liveperson.net/api/account/" + process.env.LIVE_PERSON_ACCT_NUM + "/messaging/consumer/conversation/send?v=3",
            method: 'POST',
            json: params,
            headers: {
                "Content-Type": "application/json",
                "Authorization": AppToken.access_token,
                "X-LP-ON-BEHALF": ConsumerToken.token
            }
        };

        request(options, (err, res, resp) => {
            resolve();
        })
    })
}

module.exports.initConv = initConv;
module.exports.handleInboundSms = handleInboundSms;
module.exports.handleInboundAgent = handleInboundAgent;
module.exports.getAppJwt = getAppJwt;