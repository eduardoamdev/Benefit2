const { MongoClient } = require("mongodb-legacy");

let dbConnection;

const database = {
  connect: (callback) => {
    MongoClient.connect("mongodb://localhost:27017/benefit")
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
