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
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload = multer({storage:storage});

//Get case list
cases.get('/', caseCtrl.getCaseList);

//Upload new case
cases.post('/', caseCtrl.postCase);

//Upload case images
cases.post('/images', upload.array('images'), caseCtrl.postImages);

//Update specific case
cases.patch('/', caseCtrl.updateCase);

//Update case images
cases.patch('/images', upload.array('images'), caseCtrl.updateImages);

//Like specific case
cases.patch('/like', caseCtrl.like);

//Unlike specific case
cases.patch('/unlike', caseCtrl.unlike);

//Delete specific case
cases.delete('/', caseCtrl.removeCase);

//Write Comment
cases.post('/comment', commentCtrl.postComment);

//Update Comment
cases.patch('/comment', commentCtrl.updateComment);

//Remove Comment
cases.delete('/comment', commentCtrl.removeComment);

module.exports = cases;