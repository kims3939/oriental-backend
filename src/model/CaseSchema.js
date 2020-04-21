const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./UserSchema');
const CommentSchema = require('./CommentSchema');

const CaseSchema = Schema({
    writer:UserSchema,
    title:String,
    categoris:[String],
    images:[String],
    caseText:String,
    likes:Number,
    views:Number,
    comments:[CommentSchema]
});

module.exports = CaseSchema;