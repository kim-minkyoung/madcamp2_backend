// routes/predict.js
var express = require("express");
var router = express.Router();
const predictController = require("../controllers/predictController");

router.post("/", predictController.handlePrediction);

module.exports = router;
