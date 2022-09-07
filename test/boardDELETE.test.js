/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require("supertest");
const { sequelize } = require("../db");
const should = require("should");
const { data } = require("./testData");
const app = require("../app");
beforeAll(async () => {
  await sequelize.sync();
});

// DELETE/api/posts/:id 테스트
describe("DELETE/api/posts/:id는", () => {
  describe("성공 시 ", () => {
    test("상태코드 200과 삭제 메세지를 반환한다.", (done) => {
      request(app)
        .delete("/api/posts/55")
        .send(data.deleteData)
        .expect(200)
        .end((err, res) => {
          res.body.should.have.property("message", "게시글이 삭제되었습니다.");
          done();
        });
    });
  });

  describe("실패 시 ", () => {
    test("id가 정수가 아닌 경우 400으로 응답한다.", (done) => {
      request(app)
        .delete("/api/posts/two")
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("해당 id를 가진 게시글이 없을 경우 400으로 응답한다.", (done) => {
      request(app)
        .delete("/api/posts/600")
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("입력한 비밀번호가 일치하지 않을 경우 400으로 응답한다.", (done) => {
      request(app)
        .delete("/api/posts/43")
        .send(data.deleteWrongPasswordData)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
  });
});
