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

  router.delete('/orgs/:orgName', async function(ctx) {
    const orgName = getOrgName(ctx);

    //verify org exists
    const org = github.getOrg(orgName);

    if (org) {
      const res = await ctx.db.remove({
        orgName
      });
      ctx.status = 200;
    } else {
      ctx.status = 204;
    }
  });

  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(8080);
});
