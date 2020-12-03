const { UserService } = require('../../container');

module.exports.friendRequest = (socket,io,users) => {
    socket.on("SEND_ADD_FRIEND_REQUEST", async (data) => {
        try {
            const result = await UserService.addFriendRequest(data);
            socket.to(users[`${data.addresserId}`].id).emit("RECEIVED_ADD_FRIEND_REQUEST", 123)
            socket.emit("ADD_FRIEND_REQUEST_SUCCESS", 345);
        }catch (error) {
            console.log(error);
            socket.emit("ADD_FRIEND_REQUEST_FAILURE", "Gửi yêu cầu thất bại");
        }
    })
}