const { UserService } = require('../../container');

module.exports.friendRequest = (socket,users) => {
    socket.on("SEND_ADD_FRIEND_REQUEST", async ({sender, receiver}) => {
        try {
            await UserService.addFriendRequest({requesterId:sender.id, addresserId: receiver.id});
            if(users[`${receiver.id}`]) socket.to(users[`${receiver.id}`].id).emit("RECEIVED_ADD_FRIEND_REQUEST", {...sender})
        }catch (error) {
            console.log(error);
            socket.emit("FAILURE", "Có lỗi xảy ra");
        }
    });

    socket.on("REMOVE_ADD_FRIEND_REQUEST", async ({requesterId, addresserId}) => {
        await UserService.deniedAddFriendRequest({requesterId, addresserId});
        if(users[`${+addresserId}`]) socket.to(users[`${addresserId}`].id).emit("REMOVE_ADD_FRIEND_REQUEST_SUCCESS", requesterId);
    });

    socket.on("ACCEPT_ADD_FRIEND_REQUEST", async ({requesterId, addresserId, addresserName}) => {
        try {
            await UserService.acceptFriendRequest({requesterId, addresserId, data: {userActionId: addresserId, status: 3}});
            if(users[`${+requesterId}`]) socket.to(users[`${requesterId}`].id).emit("ACCEPT_ADD_FRIEND_REQUEST_SUCCESS", addresserName);
        }catch (error) {
            socket.emit("FAILURE", "Có lỗi xảy ra");
        }
    })
}