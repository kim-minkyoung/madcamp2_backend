const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    const UserInfo = require("../models/UserInfo");

    // 모든 사용자 정보 출력
    const users = await UserInfo.find({});
    console.log("모든 사용자 정보:");
    console.log(users);

    return mongoose.connection; // mongoose.connection을 반환
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;
