const socket = require('socket.io');
const { application } = require('./config/configuration');
const { friendRequest } = require('./helpers/socket/friendRequest');
global.users = {};

module.exports.initialize = (server) => {
    const io = socket(server, {
        cors: {
            origin: application.origin,
            methods: application.methods,
            allowedHeaders: application.headers,
        }
    });

    io.on('connection', (socket) => {
        socket.on("SET_USER_ID", (id) => {
            users[`${id}`] = socket;
        });
        friendRequest(socket,users)
    });
}