const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./UserSchema');
const CommentSchema = require('./CommentSchema');

const CaseSchema = Schema({
    id:String,
    writer:UserSchema,
    title:String,
    categories:[String],
    images:[String],
    caseText:String,
    likes:{
        type:[UserSchema],
        default:[]
    },
    views:Number,
    comments:[CommentSchema]
});

module.exports = CaseSchema;