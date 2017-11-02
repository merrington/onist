require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const _ = require('lodash');

const initDB = require('../utils/initDB');
const github = require('../utils/github');

const app = new Koa();
const router = new Router();

getOrgName = ctx => ctx.params.orgName;

initDB('comments', db => {
  app.context.db = db;

  router.post('/orgs/:orgName/comments', async function(ctx) {
    const orgName = getOrgName(ctx);
    const comment = _.get(ctx, 'request.body.comment', undefined);

    //verify org exists
    const org = github.getOrg(orgName);

    if (org && comment) {
      const res = await ctx.db.insertOne({
        orgName,
        comment
      });
      ctx.status = 201;
    } else {
      ctx.status = 410;
    }
  });

  router.get('/orgs/:orgName/comments', async function(ctx) {
    const orgName = getOrgName(ctx);

    //TODO: add in paging support for improved performance
    const comments = await ctx.db.find({ orgName }).toArray();
    ctx.body = comments;
  });

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(8080);
});
