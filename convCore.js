var conversationList = {};

class Conversation {
    constructor(customerId, brand) {
        this.customerId = customerId;
        this.brand = brand
    }
}

var getConv = (customerId) => {
  console.log("Getting ConvID: ", conversationList[customerId])
    return conversationList[customerId]
}

var createConv = (customerId, brand) => {
    var conv = new Conversation(customerId, brand);
    conversationList[conv.customerId] = conv;
    
    console.log("Created a new conversation: ", conversationList[conv.customerId])
    
    return conversationList[conv.customerId]
}

module.exports.getConv = getConv;
module.exports.createConv = createConv;