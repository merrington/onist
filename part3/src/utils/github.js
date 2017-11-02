const ghApi = require('github');
const gh = new ghApi();

module.exports = {
  getOrg: async org => {
    try {
      const orgRes = await gh.orgs.get({ org });
      return orgRes.data ? orgRes.data : undefined;
    } catch (e) {
      return undefined;
    }
  }
};
