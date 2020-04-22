const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./UserSchema');
const CommentSchema = Schema();

CommentSchema.add({
    writer:UserSchema,
    comment:String,
    likes:{
        type:Number,
        default:0
    },
    reply:[CommentSchema]
});

module.exports = CommentSchema;