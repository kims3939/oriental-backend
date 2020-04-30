const mongoose = require('mongoose');
const caseSchema = require('../../model/CaseSchema');
const caseModel = mongoose.model('case',caseSchema);

exports.searchCase = async ctx => {
    let { keyword } = ctx.request.query;
    if(Array.isArray(keyword)) keyword = keyword.join(' ');
    
    await caseModel.find({$text: {$search: keyword}})
    .then( doc => {
        ctx.body = {
            status:'success',
            payload:doc
        }
    })
    .catch( e => {
        ctx.body = {
            status:'error',
            payload:e
        }
    });
};