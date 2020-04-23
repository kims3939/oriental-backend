const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = require('./UserSchema');
const CommentSchema = require('./CommentSchema');

const CaseSchema = Schema({
    _id:String,
    writer:UserSchema,
    title:{
        type:String,
        default:""
    },
    categories:{
        type:[String],
        default:[]
    },
    images:{
        type:[String],
        default:[]
    },
    caseText:{
        type:String,
        default:""
    },
    likers:{
        type:[UserSchema],
        default:[]
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:[CommentSchema],
        default:[]
    },
    timestamp:{ 
        type: Date,
        default:Date.now
    }
});

module.exports = CaseSchema;