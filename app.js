var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectMongoDB = require("./db/config");

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

var indexRouter = require("./routes/indexRouter");

var app = express();
const PORT = 3000;

// YAML 파일을 읽어 Swagger 정의 로드
const swaggerFilePath = path.join(__dirname, "swagger", "swagger.yaml");
const swaggerDocument = YAML.parse(fs.readFileSync(swaggerFilePath, "utf8"));

// MongoDB 연결 설정
connectMongoDB()
  .then((db) => {
    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // Swagger UI 설정
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, { explorer: true })
    );

    app.use("/", indexRouter);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });

    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 http://43.203.119.73:${PORT} 에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패:", err);
    process.exit(1); // MongoDB 연결 실패 시 프로세스 종료
  });

module.exports = app;
