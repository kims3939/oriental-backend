const mongoose = require('mongoose');
const caseSchema = require('../../model/CaseSchema');
const uniqeid = require('uniqid');
const caseModel = mongoose.model('case',caseSchema);

exports.postComment = async ctx => {
    const { case_id, writer, comment } = ctx.request.body;
    const _id = uniqeid('comment-');
    const commentObj = {
        _id,
        writer,
        comment
    };

    await caseModel.findOneAndUpdate(
        {_id: case_id},
        {$push: {comments: commentObj}})
        .then(() => {
            ctx.body = {
                status:'success',
                payload:null
            }
        })
        .catch(e => {
            ctx.body = {
                status:'error',
                payload:e
            }
        });
};

exports.updateComment = async ctx => {
   const { case_id, comment_id, comment } = ctx.request.body;
   await caseModel.findOneAndUpdate(
       {_id: case_id, "comments._id": comment_id},
       {$set: {"comments.$.comment": comment}}
   )
   .then(() => {
        ctx.body = {
            status:'success',
            payload:null
        }
   })
   .catch( e => {
        ctx.body = {
            status:'error',
            payload:e
        }
   });
};

exports.removeComment = async ctx => {
    const { case_id, comment_id } = ctx.request.query;
    console.log(case_id, comment_id);
    await caseModel.findOneAndUpdate(
        {_id: case_id},
        {$pull: {"comments": {"_id":comment_id}}}
    )
    .then(() => {
        ctx.body = {
            status:'success',
            payload:null
        }
    })
    .catch(e => {
        ctx.body = {
            status:'error',
            payload:e
        }
    });
};