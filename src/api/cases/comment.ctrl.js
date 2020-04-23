exports.postComment = async ctx => {
    const { case_id, writer, comment } = ctx.request.body;
    const commentObj = {
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
    const { case_id, comment_id } = ctx.request.body;
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