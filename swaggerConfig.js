const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Documentation",
    description: "API 문서 설명",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; // 상대 경로
const endpointsFiles = ["./routes/*.js"]; // 라우터 파일 경로

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log("Swagger documentation generated successfully.");
  })
  .catch((err) => {
    console.error("Error generating Swagger documentation:", err);
  });
