const { Router } = require("express");
const { boardService } = require("../services");
const { boardValidator } = require("../middlewares/validator/boardValidator");
const {
  passwordValidator,
} = require("../middlewares/validator/passwordValidator");
const router = Router();

router.post("/", boardValidator(), boardService.addPost);
router.get("/:id", boardService.getPost);
router.delete("/:id", passwordValidator(), boardService.deletePost);
module.exports = router;
