const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./UserSchema');
const CommentSchema = Schema();

CommentSchema.add({
    _id:String,
    writer:UserSchema,
    comment:{
        type:String,
        default:""
    },
    likes:{
        type:Number,
        default:0
    },
    timestamp:{ 
        type: Date,
        default:Date.now
    }
});

module.exports = CommentSchema;