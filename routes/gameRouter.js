// routes/gameRouter.js

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/globalWord", gameController.getGlobalWord);

module.exports = router;
