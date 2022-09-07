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

// GET/api/posts?page 테스트
describe("GET/api/posts?page는", () => {
  describe("성공 시 ", () => {
    test("상태코드 200과 전체 게시글이 담긴 배열을 반환한다.", (done) => {
      request(app)
        .get("/api/posts?page=1")
        .expect(200)
        .end((err, res) => {
          res.body.should.instanceof(Array);
          done();
        });
    });
    test("한 페이지에 20개씩 반환한다.", (done) => {
      request(app)
        .get("/api/posts?page=1")
        .end((err, res) => {
          res.body.should.have.lengthOf(20);
          done();
        });
    });
  });

  describe("실패 시 ", () => {
    test("page가 정수가 아닌 경우 400으로 응답한다.", (done) => {
      request(app)
        .get("/api/posts?page=zero")
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("게시글이 없는 경우 200으로 응답한다.", (done) => {
      request(app)
        .get("/api/posts?page=200")
        .expect(200)
        .end((err, res) => {
          done();
        });
    });
  });
});

// GET/api/posts/:id 테스트
describe("GET/api/posts/:id는", () => {
  describe("성공 시 ", () => {
    test("상태코드 200과 해당 id를 가진 게시글 객체를 반환한다.", (done) => {
      request(app)
        .get("/api/posts/95")
        .expect(200)
        .end((err, res) => {
          res.body.should.instanceof(Object);
          res.body.should.have.property("id", 95);
          done();
        });
    });
  });

  describe("실패 시 ", () => {
    test("id가 정수가 아닌 경우 400으로 응답한다.", (done) => {
      request(app)
        .get("/api/posts/zero")
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("해당 id를 가진 게시글이 없을 경우 200으로 응답한다.", (done) => {
      request(app)
        .get("/api/posts/600")
        .expect(200)
        .end((err, res) => {
          done();
        });
    });
  });
});
