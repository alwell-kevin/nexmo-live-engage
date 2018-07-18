var conversationList = {};

var conversationFactory = (customerId, brand, conversationId) => {
    return { customerId: customerId, brand: brand, conversationId: conversationId }
}


var getConv = (customerId) => {
    console.log("Getting ConvID: ", conversationList[customerId])
    return conversationList[customerId];
}

var createConv = (customerId, brand, conversationId) => {
    var conv = conversationFactory(customerId, brand, conversationId);
    conversationList[conv.customerId] = conv;
    console.log("Created a new conversation: ", conversationList[conv.customerId])

    return conversationList[conv.customerId]
}

module.exports.getConv = getConv;
module.exports.createConv = createConv;