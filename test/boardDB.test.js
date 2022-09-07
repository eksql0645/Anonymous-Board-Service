/* eslint-disable no-undef */
const Sequelize = require("sequelize");
const Board = require("../db/models/board");
const config = require("../config/config")["test"];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

describe("board DB 모델 테스트", () => {
  test("static init 메서드 호출", () => {
    expect(Board.init(sequelize)).toBe(Board);
  });
});
