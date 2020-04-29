const mongoose = require('mongoose');
const caseSchema = require('../../model/CaseSchema');
const uniqeid = require('uniqid');
const caseModel = mongoose.model('case',caseSchema);
const fs = require('fs');

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

exports.postImages = ctx => {
    ctx.body = ctx.files.map( file => file.filename);
};

exports.postCase = async ctx => {
    const { title, writer, categories, images, caseText } = ctx.request.body;
    const _id = uniqeid('case-');
    const newCase = new caseModel({
        _id,
        title,
        writer,
        categories,
        images,
        caseText
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

exports.updateImages = ctx => {

    const images = ctx.files;
    const uploadedImages = ctx.request.body.uploadedImages;
    
    let imageList = [];
    images.map( image => imageList.push(image.filename));
    imageList = imageList.concat(uploadedImages);
    ctx.body = {
        status:'success',
        payload:imageList
    };
};

exports.updateCase = async ctx => {
    const { case_id, title, categories, images, caseText } = ctx.request.body;
    console.log(case_id);
    await caseModel.findById({_id:case_id})
    .then(doc => {
        const deleteImages = doc.images.filter( image => !images.include(image));
        deleteImages.map(image => {
            fs.unlink('images/'+image, err => console.log(err));
        });
    })
    .catch( err => {
        console.log(err);
    });
    
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
    const { case_id } = ctx.request.query;
    
    await caseModel.findById({_id: case_id})
    .then( doc => {
        doc.images.forEach(image => {
            fs.unlink('images/'+image, err => console.log(err));
        });
    })
    .catch( err => {
        console.log(err);
    });
    
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
    const { case_id, liker, toggle } = ctx.request.body;
    if(toggle){
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
    }
    else{
        await caseModel.findOneAndUpdate(
            {_id:case_id},
            {
                $inc:  {likes:-1},
                $pull: {likers:{username:liker.username}}
            }
        )
        .then(() => {
            ctx.body ={
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
    }
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

