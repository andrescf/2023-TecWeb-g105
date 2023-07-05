const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes.js');
const orm = require('./models');
const cors = require('@koa/cors');


const app = new Koa();

app.context.orm = orm;

app.use(KoaLogger());
app.use(koaBody());
app.use(cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Use allowMethods instead of methods
    allowHeaders: ['Authorization', 'Content-Type'], // Use allowHeaders instead of allowedHeaders
    credentials: true
}));

app.use(router.routes());

module.exports = app;