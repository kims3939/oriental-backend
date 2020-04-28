const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

const api = require('./api');
router.use('/api', api.routes());

app.use(cors());
app.use(bodyparser());
app.use(serve('images/'));
app.use(router.routes())
app.use(router.allowedMethods());

mongoose.connect('mongodb://localhost/oriental',{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;
db.on('error', e => console.error(e));
db.once('open', ()=> {
    console.log('db connected');
});

app.listen(4000, () => {
    console.log('server listening on 4000');
});