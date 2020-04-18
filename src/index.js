const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();
const router = new Router();

const api = require('./api');
router.use('/api', api.routes());

app.use(KoaBody({multipart:true}));
app.use(router.routes()).use(router.allowedMethods());
app.listen(4000);