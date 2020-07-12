'use strict';

const { MongoClient } = require('mongodb');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const mongoUrl = `mongodb://localhost/${DB_NAME}`;
let connection;

const connectDB = async() => {
  if (connection) return connection;

  let client;

  try {
    client = await MongoClient.connect(mongoUrl, {
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
