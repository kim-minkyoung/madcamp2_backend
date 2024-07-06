const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB_URL;
const dbName = "myDatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    // 사용자 모델 가져오기 (실제 경로에 따라 수정 필요)
    const User = require("../models/User");

    // 모든 사용자 정보 출력
    const users = await User.find({});
    console.log("모든 사용자 정보:");
    console.log(users);

    return mongoose.connection; // mongoose.connection을 반환
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;
