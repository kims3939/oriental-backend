const Router = require('koa-router');
const caseCtrl = require('./cases.ctrl');
const commentCtrl = require('./comment.ctrl');

const multer = require('@koa/multer');

const cases = new Router();

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './images');
    },
    filename:(req, file, cb) => {
        console.log(file);
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload = multer({storage:storage});

//Get case list
cases.get('/', caseCtrl.getCaseList);

//Upload new case
cases.post('/', caseCtrl.postCase);

//Upload case images
cases.post('/images', upload.array('images',10), caseCtrl.postImages);

//Update specific case
cases.patch('/', caseCtrl.updateCase);

//Increase specific case's view count
cases.patch('/like', caseCtrl.increaseLike);

//Delete specific case
cases.delete('/', caseCtrl.removeCase);



//Write Comment
cases.post('/comment', commentCtrl.postComment);

//Update Comment
cases.patch('/comment', commentCtrl.updateComment);

//Remove Comment
cases.delete('/comment', commentCtrl.removeComment);

module.exports = cases;