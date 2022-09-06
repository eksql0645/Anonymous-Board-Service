const express = require("express");
const router = express();
const boardRouter = require("./board");

router.use("/board", boardRouter);

module.exports = router;
