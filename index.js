// index.js
const connectDB = require("./db/config");
const command = require("./command"); // 예시로 command 파일을 가져오는 것으로 가정

const startServer = async () => {
  try {
    const mongoose = await connectDB();
    console.log("Connected to MongoDB!");

    // MongoDB 연결이 설정되었으므로 command 실행 가능
    await command.execute(client, message, args); // 예시로 command.execute()를 호출하는 것으로 가정

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // 연결 실패 시 프로세스 종료
  }
};

startServer();
