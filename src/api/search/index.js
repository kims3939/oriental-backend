const Router = require('koa-router');
const searchCtrl = require('./search.ctrl');

const search = new Router();

//Get case list
search.get('/', searchCtrl.searchCase);

module.exports = search;