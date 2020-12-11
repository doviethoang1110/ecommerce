const {ConversationService} = require('../../container');

module.exports.messages = (socket, io, users) => {
    socket.on("SAVE_MESSAGE", async (data) => {
        const doc = await ConversationService.createNewConversation(data);
        console.log(doc)
        data.participants.forEach(p => users[`${p}`].join("single-room"));
        io.to("single-room").emit("RECEIVED_MESSAGE", doc);
    })
}