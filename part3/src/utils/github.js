const ghApi = require('github');

const gh = new ghApi();
const pageSize = 100;

class Github {
  constructor(api = gh) {
    this.gh = api;
  }

  addToken() {
    const token = process.env.GITHUB_TOKEN;
    if (token)
      gh.authenticate({
        type: 'token',
        token
      });
  }

  async getOrg(org) {
    try {
      this.addToken();
      const orgRes = await this.gh.orgs.get({ org });
      return orgRes.data ? orgRes.data : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getMembers(org) {
    try {
      let allMembers = [];
      let moreMembers = true;
      let page = 1;

      while (moreMembers) {
        this.addToken();
        const result = await this.gh.orgs.getMembers({
          org,
          per_page: pageSize,
          page
        });
        const members = result && result.data;

        if (members && Array.isArray(members)) {
          allMembers = allMembers.concat(members);
          page += 1;
          if (members.length < pageSize) {
            moreMembers = false;
          }
        } else {
          moreMembers = false;
        }
      }

      return allMembers;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

module.exports = Github;
