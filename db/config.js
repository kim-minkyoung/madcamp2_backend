// db/config.js
const { MongoClient } = require("mongodb");

const mongoose = require("mongoose");

const url =
  "mongodb+srv://decomin02:12341234@madcamp2cluster.jca7vne.mongodb.net/?retryWrites=true&w=majority&appName=madcamp2Cluster";
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
