const { boardModel } = require("../models");
const bcrypt = require("bcrypt");
const weatherAPI = require("./weather");
const errorCodes = require("../codes/errorCodes");

// 게시글 생성
const addPost = async (req, res, next) => {
  try {
    const { title, content, name, password } = req.body;
    const weather = await weatherAPI();
    const postInfo = {
      title,
      content,
      name,
      password: await bcrypt.hash(password, 12),
      weather,
    };
    const post = await boardModel.createPost(postInfo);

    // 객체를 변수에 할당해서 보내려 했으나 테스트 시 상태코드가 다르게 나와 객체 자체를 보냄
    res.status(201).json({
      id: post.id,
      title: post.title,
      name: post.name,
      content: post.content,
      weather: post.weather,
    });
  } catch (err) {
    next(err);
  }
};

// 게시글 전체 조회
const getPosts = async (req, res, next) => {
  try {
    const { page } = req.query;
    let offset = 0;
    if (page > 1) {
      offset = 20 * (page - 1);
    }
    const posts = await boardModel.findPosts(offset);

    // 게시글이 없는 경우
    if (posts.length === 0) {
      res.status(200).json({ message: errorCodes.notBePost });
      return;
    }

    res.status(200).json(posts);
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
      res.status(200).json({ message: errorCodes.notBePost });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// 게시글 수정
const setPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, password } = req.body;

    // 해당 게시글이 있는지 확인
    let post = await boardModel.existedPost(id);
    if (!post) {
      throw new Error(errorCodes.notBePost);
    }
    const isPasswordCorrect = await bcrypt.compare(password, post.password);
    if (!isPasswordCorrect) {
      throw new Error(errorCodes.notEqualPassword);
    }

    const result = await boardModel.updatePost(id, title, content, password);

    // 수정되지 않은 경우
    if (result[0] === 0) {
      throw new Error(errorCodes.serverError);
    }

    // 프론트가 있다는 가정 하에 수정된 post 객체를 보냄
    post = await boardModel.findPost(id);

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

// 게시글 삭제
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // 해당 게시글이 있는지 확인
    const post = await boardModel.findPost(id);
    if (!post) {
      throw new Error(errorCodes.notBePost);
    }

    const isPasswordCorrect = await bcrypt.compare(password, post.password);
    if (!isPasswordCorrect) {
      throw new Error(errorCodes.notEqualPassword);
    }

    const result = await boardModel.destroyPost(id);

    if (result[0] === 0) {
      throw new Error(errorCodes.serverError);
    }

    res.status(200).json({ message: "게시글이 삭제되었습니다." });
  } catch (err) {
    next(err);
  }
};

module.exports = { addPost, getPost, getPosts, deletePost, setPost };
