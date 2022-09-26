import pkg from "mongodb-legacy";

const { MongoClient } = pkg;

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

export default database;
