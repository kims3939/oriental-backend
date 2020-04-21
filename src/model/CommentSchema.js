const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./UserSchema');
const CommentSchema = Schema();

CommentSchema.add({
    writer:UserSchema,
    comment:String,
    likes:Number,
    reply:[CommentSchema]
});

module.exports = CommentSchema;