const Router = require('koa-router');
const ctrl = require('./cases.ctrl');
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
cases.get('/', ctrl.getCaseList);

//Upload new case
cases.post('/', ctrl.postCase);

//Upload case images
cases.post('/images', upload.array('images',10), ctrl.postImages);

//Update specific case
cases.patch('/:id', ctrl.updateCase);

//Delete specific case
cases.delete('/:id', ctrl.removeCase);

//Write Comment
cases.post('/comment/:id', ctrl.postComment);

//Update Comment
cases.patch('/comment/:id', ctrl.updateComment);

//Remove Comment
cases.delete('/comment/:id', ctrl.removeComment);

module.exports = cases;