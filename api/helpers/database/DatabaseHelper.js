const mongoose = require('mongoose');

const connect = () => {
    const options = {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,options);
    mongoose.connection.on('open', ()=> {
        console.log("Connected (Mongo DB)");
    });
    mongoose.connection.on('error', err => {
        console.log("Error (Mongo DB)\n",err);
    })
    mongoose.Promise = global.Promise;
}

module.exports = {connect}