const Router = require('koa-router');
const ctrl = require('./cases.ctrl');

const cases = new Router();

//Get case list
cases.get('/', ctrl.getCaseList);

//Upload new case
cases.post('/', ctrl.postCase);

//Upload case images
cases.post('/images', ctrl.postImages);

//Update specific case
cases.patch('/:id', ctrl.updateCase);

//Delete specific case
cases.delete('/:id', ctrl.removeCase);

module.exports = cases;