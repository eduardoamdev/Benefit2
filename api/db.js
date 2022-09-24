const { MongoClient } = require("mongodb-legacy");

let dbConnection;

const database = {
  connect: (callback) => {
    MongoClient.connect(process.env.MONGO_DB)
      .then((client) => {
        dbConnection = client.db();
        return callback();
      })
      .catch((error) => {
        return callback(error);
      });
  },
  get: () => {
    return dbConnection;
  },
};

module.exports = database;
