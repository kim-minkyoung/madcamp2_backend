// db/config.js
const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;
const dbName = "myDatabase";

let client;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;
