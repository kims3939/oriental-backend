const Router = require('koa-router');
const cases = require('./cases');
//const auth = require('./auth');

const api = new Router();

api.use('/cases', cases.routes());
//api.use('/auth', auth.routes());

module.exports = api;