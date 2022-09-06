const { boardModel } = require("../models");
const bcrypt = require("bcrypt");

// 게시글 생성
const addPost = async (req, res, next) => {
  try {
    const { title, content, name, password, weather } = req.body;

    const postInfo = {
      title,
      content,
      name,
      password: await bcrypt.hash(password, 12),
      weather,
    };
    const post = await boardModel.createPost(postInfo);

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { addPost };
