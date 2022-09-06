const { Router } = require("express");
const { boardService } = require("../services");
const { validator } = require("../middlewares/validator/validator");
const router = Router();

router.post("/", validator(), boardService.addPost);

module.exports = router;
