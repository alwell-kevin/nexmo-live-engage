var conversationList = {};

var conversationFactory = (customerId, brand, conversationId) => {
    return { customerId: customerId, brand: brand, conversationId: conversationId }
}


var getConv = (customerId) => {
    console.log("Getting ConvID: ", conversationList[customerId])
    return conversationList[customerId];
}

var getConvByConvId = (convId) => {
    var conversation;
    console.log("In getConvByConvId", convId)

    Object.values(conversationList).forEach(function(con) {
        if (con.conversationId === convId) {
            //Matching Conversation
            console.log("Getting ConvID: ", con);
            conversation = con;
        }
    });
    
    console.log("IN CONV BY CONV ID : ", conversation);

    return conversation
}

var createConv = (customerId, brand, conversationId) => {
    var conv = conversationFactory(customerId, brand, conversationId);
    conversationList[conv.customerId] = conv;
    console.log("Created a new conversation: ", conversationList[conv.customerId])

    return conversationList[conv.customerId]
}

module.exports.getConv = getConv;
module.exports.createConv = createConv;
module.exports.getConvByConvId = getConvByConvId;