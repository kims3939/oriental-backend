const mongoose = require('mongoose');
const caseSchema = require('../../model/CaseSchema');
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
    const newCase = new caseModel({
        title,
        writer,
        categories,
        images,
        caseText,
        likes,
        views
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
    const { _id, title, categories, images, caseText } = ctx.request.body;
    await caseModel.findByIdAndUpdate(id, {
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
    const { _id } = ctx.request.body;
    await caseModel.findByIdAndDelete(_id)
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

exports.postComment = async ctx => {
    
};

exports.updateComment = async ctx => {
   
};

exports.removeComment = async ctx => {
    
};