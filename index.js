const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://decomin02:12341234@madcamp2cluster.jca7vne.mongodb.net/?retryWrites=true&w=majority&appName=madcamp2Cluster"; // MongoDB 서버 주소
const dbName = "myDatabase"; // 데이터베이스 이름

let client;

async function connect() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
    console.log("MongoDB에 성공적으로 연결되었습니다!");
  }
  return client.db(dbName);
}

module.exports = connect;
