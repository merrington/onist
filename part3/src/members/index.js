require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const _ = require('lodash');

const Github = require('../utils/github');
const github = new Github();

const app = new Koa();
const router = new Router();

getOrgName = ctx => ctx.params.orgName;

router.get('/orgs/:orgName/members', async function(ctx) {
  const orgName = getOrgName(ctx);

  //TODO: add in paging support for improved performance using GH API
  const members = await github.getMembers(orgName);
  ctx.body = members;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080);
