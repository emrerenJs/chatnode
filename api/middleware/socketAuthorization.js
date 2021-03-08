const cookieParser = require('cookie-parser');
const passportSocketIO = require('passport.socketio');
const redisStore = require('../helpers/session/redisStore');

const onAuthorizeSuccess = (data,accept) => {
    console.log('successful connection (SocketAPI - Authorization)');
    accept(null,true);
}

const onAuthorizeFail = (data,message,error,accept) => {
    if(error)
        throw new Error(message);
    console.log("failed to connect (SocketAPI - Authorization");
    accept(null,false);
}

module.exports = passportSocketIO.authorize( {
    cookieParser,
    key:'connect.sid',
    secret:process.env.SESSION_SECRET_KEY,
    store:redisStore,
    success:onAuthorizeSuccess,
    fail:onAuthorizeFail
})