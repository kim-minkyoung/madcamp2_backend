var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/user", require("./usersRouter"));
router.use("/game", require("./gameRouter"));
// router.use("/retrofit", require("./retrofitRouter"));
// router.use("/predict", require("./predictRouter"));

module.exports = router;
