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

// POST/api/posts 테스트
describe("POST/api/posts는", () => {
  describe("성공 시 ", () => {
    test("상태코드 201과 생성된 게시글 객체를 반환한다.", (done) => {
      request(app)
        .post("/api/posts")
        .send(data.successData)
        .expect(201)
        .end((err, res) => {
          res.body.should.instanceof(Object);
          done();
        });
    });
  });

  describe("실패 시 ", () => {
    test("요청데이터에 빈값이 있을 경우 400으로 응답한다.", (done) => {
      request(app)
        .post("/api/posts")
        .send(data.nullData)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("title의 길이가 20 이상일 경우 400으로 응답한다.", (done) => {
      request(app)
        .post("/api/posts")
        .send(data.titleTooLongData)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("content의 길이가 200 이상일 경우 400으로 응답한다.", (done) => {
      request(app)
        .post("/api/posts")
        .send(data.contentTooLongData)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("name의 길이가 10 이상일 경우 400으로 응답한다.", (done) => {
      request(app)
        .post("/api/posts")
        .send(data.nameTooLongData)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
    test("password의 길이가 6 ~ 15, 숫자, 대소문자, 특수문자를 포함하지 않는 경우 400으로 응답한다.", (done) => {
      request(app)
        .post("/api/posts")
        .send(data.passwordNotCorrect)
        .expect(400)
        .end((err, res) => {
          done();
        });
    });
  });
});
