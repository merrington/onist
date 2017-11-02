const dbClient = require('./mongo');

module.exports = function(createDb, cb) {
  //verify mongo 'comments' collection exists
  dbClient(async db => {
    const collection = await db.createCollection(createDb);
    cb(collection);
  });
};
