const { UserService } = require('../../container');

module.exports.onlineFriends = (socket, users) => {
    socket.on("GET_ONLINE_FRIENDS", async (data) => {
        let listFriend = await UserService.listFriends(data);
        const listUsers = Object.keys(users);
        listFriend = listFriend.filter(l => listUsers.includes(l.id.toString()));
        socket.emit("RECEIVED_ONLINE_FRIENDS", listFriend);
    })
}