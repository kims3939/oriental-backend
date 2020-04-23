const mongoose = require('mongoose');
const caseSchema = require('../../model/CaseSchema');
const uniqeid = require('uniqid');
const caseModel = mongoose.model('case',caseSchema);

exports.getCaseList = async ctx => {
    await caseModel.find()
    .then( doc => {
        ctx.body = {
            status:'success',
            payload:doc
        }
    })
    .catch(e => {
        ctx.body = {
            status:'error',
            payload:e
        }
    });
};

exports.postImages = async ctx => {
    ctx.body = ctx.files.map( file => file.filename);
};

exports.postCase = async ctx => {
    const { title, writer, categories, images, caseText, likes, views } = ctx.request.body;
    const _id = uniqeid('case-');
    const newCase = new caseModel({
        _id,
        title,
        writer,
        categories,
        images,
        caseText,
        likes,
        views,
    });

    await newCase.save()
    .then(()=>{
        ctx.body = {
            status:'success',
            palyload:null
        }
    })
    .catch( e => {
        ctx.body = {
            status:'error',
            payload:e
        }
    });
};

exports.updateCase = async ctx => {
    const { case_id, title, categories, images, caseText } = ctx.request.body;
    await caseModel.findOneAndUpdate(
        {_id:case_id}, 
        {
            title,
            categories,
            images,
            caseText
        })
    .then(() => {
        ctx.body = {
            status:'success',
            palyload:null
        }
    })
    .catch(e => {
        ctx.body = {
            status:'error',
            payload:e
        }
    });
};

exports.removeCase = async ctx => {
    const { case_id } = ctx.request.body;
    await caseModel.findOneAndRemove({_id: case_id})
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


exports.like = async ctx => {
    const { case_id, liker } = ctx.request.body;
    await caseModel.findOneAndUpdate(
        {_id:case_id},
        { 
            $inc:  {likes:1},
            $addToSet: {likers: liker}
        }
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

exports.unlike = async ctx => {
    const { case_id, liker } = ctx.request.body;
    await caseModel.findOneAndUpdate(
        {_id:case_id},
        { 
            $inc:  {likes:-1},
            $pull: {likers: liker}
        }
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

exports.updateView = ctx => {
    //나중에 할래
};

