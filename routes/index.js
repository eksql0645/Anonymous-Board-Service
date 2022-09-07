const express = require("express");
const router = express();
const boardRouter = require("./board");

router.use("/posts", boardRouter);

module.exports = router;
