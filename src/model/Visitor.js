const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = Schema({
    _id:String,
    case_id:String,
    visitors:{
        type:[String],
        default:[]
    }
});

module.exports = VisitorSchema;