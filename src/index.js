const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const api = require('./api');
router.use('/api', api.routes());

app.use(bodyparser());
app.use(serve('images/'));
app.use(router.routes())
app.use(router.allowedMethods());

app.listen(4000);