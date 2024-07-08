const swaggerDefinition = {
  openapi: "3.0.0", // Swagger 버전
  info: {
    title: "API 문서", // API 문서의 제목
    version: "1.0.0", // API 버전
    description: "API 문서 설명", // API 설명
  },
  servers: [
    {
      url: "http://43.203.119.73:3000", // 서버의 기본 URL
    },
  ],
};

module.exports = swaggerDefinition;
