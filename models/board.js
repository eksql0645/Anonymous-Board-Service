const { Board } = require("../db");

// 게시글 생성
const createPost = async (postInfo) => {
  const post = await Board.create(postInfo);
  return post;
};

module.exports = {
  createPost,
};
