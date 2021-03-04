const mongoose = require('mongoose')
const findOrCreate = require('mongoose-find-or-create');

const Schema = mongoose.Schema;
const User = new Schema({
    googleId:{
        type: String,
        unique:true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String
});

User.plugin(findOrCreate);
module.exports = mongoose.model("Users",User);