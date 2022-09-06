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

// 게시글 조회
const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await boardModel.findPost(id);

    // 게시글이 없는 경우
    if (!post) {
      res.status(200).json({ msg: "조회할 게시글이 없습니다." });
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { addPost, getPost };
