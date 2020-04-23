const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    _id:String,
    username:String,
    email:String,
    password:String,
    speciality:String
});

module.exports = UserSchema;