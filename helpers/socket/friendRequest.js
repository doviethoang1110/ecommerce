const { UserService } = require('../../container');

module.exports.friendRequest = (socket,users) => {
    socket.on("SEND_ADD_FRIEND_REQUEST", async ({sender, receiver}) => {
        try {
            await UserService.addFriendRequest({requesterId:sender.id, addresserId: receiver.id});
            if(users[`${receiver.id}`]) socket.to(users[`${receiver.id}`].id).emit("RECEIVED_ADD_FRIEND_REQUEST", {...sender})
        }catch (error) {
            console.log(error);
            socket.emit("ADD_FRIEND_REQUEST_FAILURE", "Gửi yêu cầu thất bại");
        }
    });

    socket.on("REMOVE_ADD_FRIEND_REQUEST", async ({requesterId, addresserId}) => {
        await UserService.deniedAddFriendRequest({requesterId, addresserId});
        if(users[`${+addresserId}`]) socket.to(users[`${addresserId}`].id).emit("REMOVE_ADD_FRIEND_REQUEST_SUCCESS", requesterId);
    });
}