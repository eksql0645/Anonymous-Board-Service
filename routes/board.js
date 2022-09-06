const { Router } = require("express");
const { boardService } = require("../services");
const { boardValidator } = require("../middlewares/validator/boardValidator");
const {
  passwordValidator,
} = require("../middlewares/validator/passwordValidator");
const { nameValidator } = require("../middlewares/validator/nameValidator");
const router = Router();

router.post(
  "/",
  boardValidator(),
  nameValidator(),
  passwordValidator(),
  boardService.addPost
);
router.get("/", boardService.getPosts);
router.get("/:id", boardService.getPost);
router.patch(
  "/:id",
  boardValidator(),
  passwordValidator(),
  boardService.setPost
);
router.delete("/:id", passwordValidator(), boardService.deletePost);
module.exports = router;
