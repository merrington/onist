const _ = require('lodash');
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

  async handlePagedResults(cb) {
    let allResults = [];
    let moreResults = true;
    let page = 1;

    while (moreResults) {
      this.addToken();
      const response = await cb(page);
      const results = _.get(response, 'data', []);

      if (results) {
        allResults = allResults.concat(results);
        page += 1;
        if (results.length < pageSize) {
          moreResults = false;
        }
      } else {
        moreResults = false;
      }
    }
    return allResults;
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
      const members = await this.handlePagedResults(page => {
        return this.gh.orgs.getMembers({
          org,
          per_page: pageSize,
          page
        });
      });

      return (await Promise.all(
        members.map(async member => ({
          login: member.login,
          avatar_url: member.avatar_url,
          followers: await this.getFollowers(member.login),
          following: await this.getFollowing(member.login)
        }))
      )).sort((m1, m2) => m2.followers - m1.followers);
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async getFollowers(username) {
    try {
      const followers = await this.handlePagedResults(page => {
        return this.gh.users.getFollowersForUser({ username });
      });

      return followers.length;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  async getFollowing(username) {
    try {
      const following = await this.handlePagedResults(page => {
        return this.gh.users.getFollowingForUser({ username });
      });

      return following.length;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}

module.exports = Github;
