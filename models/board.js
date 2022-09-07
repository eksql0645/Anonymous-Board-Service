const { Board } = require("../db");

// 게시글 생성
const createPost = async (postInfo) => {
  const post = await Board.create(postInfo);
  return post;
};

// 전체 게시글 조회
const findPosts = async (offset) => {
  const posts = await Board.findAll({
    attributes: ["id", "title", "content", "name", "weather"],
    order: [["createdAt", "DESC"]],
    limit: 20,
    offset: offset,
  });
  return posts;
};

// 게시글 조회
const findPost = async (id) => {
  const post = await Board.findOne({
    attributes: ["id", "title", "content", "name", "weather"],
    where: { id },
  });

  return post;
};

// 게시글 수정
const updatePost = async (id, title, content) => {
  const result = await Board.update({ title, content }, { where: { id } });
  return result;
};

// 게시글 삭제
const destroyPost = async (id) => {
  const result = await Board.destroy({ where: { id } });
  return result;
};

// 게시글 찾기
const existedPost = async (id) => {
  const post = await Board.findOne({
    where: { id },
  });

  return post;
};

module.exports = {
  createPost,
  findPost,
  findPosts,
  destroyPost,
  updatePost,
  existedPost,
};
