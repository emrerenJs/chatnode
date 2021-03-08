const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');
const socketAuthorization = require('../../middleware/socketAuthorization');

const io = socketio();

const socketApi = {
    io
};
//Hashs
const UsersHash = require('../hash/UsersHash')

io.use(socketAuthorization);

/*REDIS ADAPTER*/
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}))
/*REDIS ADAPTER*/


io.on('connection', socket => {
    console.log("connected (SocketAPI)", socket.request.user.name);
    UsersHash.upsert(socket.id, socket.request.user);
    UsersHash.list(users => {
        io.emit('onlineUserList',users);
    });

    socket.on('disconnect', () => {
        console.log("disconnected (SocketAPI)", socket.request.user.name);
        UsersHash.disconnect(socket.request.user.googleId);
        UsersHash.list(users => {
            io.emit('onlineUserList',users);
        })
    })
});

module.exports = socketApi;