const {ConversationService} = require('../../container');

module.exports.conversations = (socket, io, users) => {
    socket.on("GET_CONVERSATIONS", async (id) => {
        const result = await ConversationService.getAllConversationsOfUser(id);
        socket.emit("RECEIVED_CONVERSATIONS", result);
    });

    socket.on("GET_MESSAGES", async ({id, type, page}) => {
        const result = await ConversationService.findConversationById(id, type, page);
        socket.emit("RECEIVED_MESSAGES", result);
    });

    socket.on("LOADMORE_MESSAGES", async ({id, type, page}) => {
        const result = await ConversationService.loadMoreMessages(id, type, page);
        socket.emit("RECEIVED_LOADMORE_MESSAGES", result);
    });

    socket.on("SAVE_MESSAGE", async (data) => {
        data.participants.forEach(p => {
            if(users[`${p}`]) {
                if(!users[`${p}`].rooms.has(`room-${data.conversationId}`)) users[`${p}`].join(`room-${data.conversationId}`)
            }
        });
        const result = await ConversationService.createNewConversation(data);
        io.to(`room-${data.conversationId}`).emit("RECEIVED_MESSAGE", result);
    });

    socket.on("TYPING", async (data) => {
        data.participants.forEach(p => {
            if(users[`${p}`]) {
                if(!users[`${p}`].rooms.has(`room-${data.conversationId}`)) users[`${p}`].join(`room-${data.conversationId}`)
            }
        });
        socket.broadcast.to(`room-${data.conversationId}`).emit("TYPING_MESSAGE", {
            conversationId: data.conversationId,
            name: data.name,
            image: data.image,
            type: data.type
        });
    });

    socket.on("CLEAR_TYPING", async (data) => {
        data.participants.forEach(p => {
            if(users[`${p}`]) {
                if(!users[`${p}`].rooms.has(`room-${data.conversationId}`)) users[`${p}`].join(`room-${data.conversationId}`)
            }
        });
        socket.broadcast.to(`room-${data.conversationId}`).emit("CLEAR_TYPING", {name: data.name});
    })
}