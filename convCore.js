var conversationList = {};

class Conversation {
    constructor(customerId, brand, conversationId) {
        this.customerId = customerId;
        this.brand = brand;
        this.conversationId = conversationId
    }
}

var getConv = (customerId) => {
    console.log("*******************customerId: ", customerId, "list: ", conversationList, conversationList.Conversation.customerId)
    console.log("Getting ConvID: ", conversationList[customerId])
    return conversationList[customerId]
}

var createConv = (customerId, brand, conversationId) => {
    var conv = new Conversation(customerId, brand, conversationId);
    conversationList[conv.customerId] = conv;
    console.log("Created a new conversation: ", conversationList[conv.customerId])

    return conversationList[conv.customerId]
}

module.exports.getConv = getConv;
module.exports.createConv = createConv;