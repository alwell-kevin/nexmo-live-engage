var conversationList = {};

class Conversation {
    constructor(customerId, brand) {
        this.customerId = customerId;
        this.brand = brand
    }
}

var getConv = (customerId) => {
    return conversationList[customerId]
}

var createConv = (customerId) => {
    var conv = new Conversation(customerId);

    conversationList[conv.customerId] = conv;

    return conv
}

module.exports.getConv = getConv;
module.exports.createConv = createConv;