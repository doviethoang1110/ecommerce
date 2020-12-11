const socket = require('socket.io');
const { application } = require('./config/configuration');
const { friendRequest, onlineFriends, checkToken, messages } = require('./helpers/socket');
global.users = {};

module.exports.initialize = (server) => {
    const io = socket(server, {
        cors: {
            origin: application.origin,
            methods: application.methods,
            allowedHeaders: application.headers,
        }
    });
    io.use(async (socket, next) => {
        try {
            const id = await checkToken(socket);
            if(id) users[`${id}`] = socket;
            next();
        }catch (error) {
            next(error);
        }
    }).on('connection', (socket) => {
        let key;
        socket.on("SET_USER_ID", (id) => {
            if(id) users[`${id}`] = socket;
            key = Object.keys(users).find(u => users[u].id === socket.id);
        });
        friendRequest(socket,users);
        onlineFriends(socket, users);
        messages(socket, io, users);
        socket.on('disconnect', function(){
            console.log('user ' + key + ' disconnected');
            delete users[key];
        });
    });
}