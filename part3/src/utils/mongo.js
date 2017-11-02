const Mongo = require('mongodb');

const mongoClient = new Mongo.MongoClient();
module.exports = function(cb) {
  mongoClient
    .connect(process.env.MONGO_URL) // connect to mongo
    .then(cb) // run the provided calback
    .catch(e => {
      console.error('Error connecting to MongoDB', e);
      process.exit(1);
    });
};
