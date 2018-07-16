var conversationList = {};

class Conversation {
    constructor(phone) {
        this.uuid = Math.random();
        this.phone = phone;
    }
}

var getConv = (uuid) => {
    return conversationList[uuid]
}

var createConv = (phone) => {
    var conv = new Conversation(phone);

    conversationList[conv.uuid] = conv;

    return conv
}

module.exports.getConv = getConv;
module.exports.createConv = createConv;