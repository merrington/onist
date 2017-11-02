const dbClient = require('../utils/mongo');

module.exports = function(cb) {
  //verify mongo 'comments' collection exists
  dbClient(async db => {
    const collection = await db.createCollection('comments');
    cb(collection);
  });
};
