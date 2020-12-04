const { UserService } = require('../../container');

module.exports.friendRequest = (socket,users) => {
    socket.on("SEND_ADD_FRIEND_REQUEST", async ({sender, receiver}) => {
        try {
            await UserService.addFriendRequest({requesterId:sender.id, addresserId: receiver.id});
            socket.to(users[`${receiver.id}`].id).emit("RECEIVED_ADD_FRIEND_REQUEST", {...sender})
            socket.emit("ADD_FRIEND_REQUEST_SUCCESS", {...receiver});
        }catch (error) {
            console.log(error);
            socket.emit("ADD_FRIEND_REQUEST_FAILURE", "Gửi yêu cầu thất bại");
        }
    })
}