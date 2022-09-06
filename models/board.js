const { Board } = require("../db");

// 게시글 생성
const createPost = async (postInfo) => {
  const post = await Board.create(postInfo);
  return post;
};

// 게시글 조회
const findPost = async (id) => {
  const post = await Board.findOne({ where: { id } });
  return post;
};

module.exports = {
  createPost,
  findPost,
};
