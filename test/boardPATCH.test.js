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

// PATCH/api/posts/:id 테스트
describe("PATCH/api/posts/:id는", () => {
  describe("성공 시 ", () => {
    test("상태코드 200과 해당 id를 가진 수정된 게시글 객체를 반환한다.", (done) => {
      request(app)
        .patch("/api/posts/95")
        .send(data.updateData)
        .expect(200)
        .end((err, res) => {
          res.body.should.instanceof(Object);
          res.body.should.have.property("id", 95);
          res.body.should.have.property("title", "테스트 수정");
          res.body.should.have.property("content", "수정 테스트");
          done();
        });
    });
  });

  describe("실패 시 ", () => {
    test("id가 정수가 아닌 경우 400으로 응답한다.", (done) => {
      request(app)
        .patch("/api/posts/zero")
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("해당 id를 가진 게시글이 없을 경우 400으로 응답한다.", (done) => {
      request(app)
        .patch("/api/posts/600")
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("입력한 비밀번호가 일치하지 않을 경우 400으로 응답한다.", (done) => {
      request(app)
        .patch("/api/posts/95")
        .send(data.wrongPasswordData)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
  });
});
