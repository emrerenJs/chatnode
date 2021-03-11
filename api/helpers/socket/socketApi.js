const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');
const socketAuthorization = require('../../middleware/socketAuthorization');
const fs = require('fs');

const io = socketio();

const socketApi = {
    io
};
//Hashs
const UsersHash = require('../hash/UsersHash')
const RoomsHash = require('../hash/RoomsHash')
const MessagesHash = require('../hash/MessagesHash')

io.use(socketAuthorization);

/*REDIS ADAPTER*/
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}))
/*REDIS ADAPTER*/

const isTimeOut = socket => {
    if (socket.request.user._expire > (Date.now() - 1000)) {
        return false;
    } else {
        socket.disconnect();
        return true;
    }
}

io.on('connection', socket => {
    console.log("connected (SocketAPI)", socket.request.user);
    UsersHash.upsert(socket.id, socket.request.user);
    UsersHash.list(users => {
        io.emit('onlineUserList', users);
    });
    RoomsHash.list(rooms => {
        io.emit('roomList', rooms);
    })

    socket.on('newRoom', roomName => {
        if (!isTimeOut(socket)) {
            RoomsHash.upsert(roomName);
            RoomsHash.list(rooms => {
                io.emit('roomList', rooms);
            })
        }
    })

    socket.on('newMessage', message => {
        if (!isTimeOut(socket)) {
            MessagesHash.upsert({
                ...message,
                user: socket.request.user
            })
        }
    })

    socket.on('disconnect', () => {
        console.log("disconnected (SocketAPI)", socket.request.user.name);
        UsersHash.disconnect(socket.request.user.googleId);
        UsersHash.list(users => {
            io.emit('onlineUserList', users);
        })
    })
});

module.exports = socketApi;