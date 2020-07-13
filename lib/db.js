'use strict';

const { MongoClient } = require('mongodb');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let MONGO_URI;

if (process.env.NODE_ENV === 'production') {
  MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
} else {
  MONGO_URI = `mongodb://${DB_HOST}/${DB_NAME}`;
}

let connection;

const connectDB = async() => {
  if (connection) return connection;

  let client;

  try {
    client = await MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db(DB_NAME);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
