/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { boardService } = require("../services");
const Board = require("../db/models/board");
const httpMocks = require("node-mocks-http");
const testBoards = require("./testBoards.json");

// create 메서드 mock 함수
Board.create = jest.fn();
Board.findOne = jest.fn();
Board.findAll = jest.fn();

// req, res, next mock 생성
let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("addPost", () => {
  beforeEach(() => {
    req.body = testBoards;
  });
  // 임시 데이터 req.body에 넣기

  test("게시글이 생성되면 상태코드 201을 반환한다.", async () => {
    //boardService.addPost가 호출되면
    await boardService.addPost(req, res, next);
    // Board.create가 호출될 것이고
    expect(Board.create).toBeCalled();
    // 성공 시 상태코드 201을 반환한다.
    expect(res.statusCode).toBe(201);
  });

  test("전체 게시글 조회에 성공하면 상태코드 200을 반환한다.", async () => {
    //boardService.getPosts가 호출되면
    await boardService.getPosts(req, res, next);
    // Board.findAll이 호출될 것이고
    expect(Board.findAll).toBeCalled();
    // 성공 시 상태코드 200을 반환한다.
    expect(res.statusCode).toBe(200);
  });

  test("게시글 조회에 성공하면 상태코드 200을 반환한다.", async () => {
    // 게시판 id 설정
    req.params.id = 64;
    const query = {
      attributes: ["id", "title", "content", "name", "weather"],
      where: { id: 64 },
    };
    // Board.findOne 성공시 가상의 리턴 결과 설정
    Board.findOne.mockReturnValue(testBoards);
    // boardService.getPost 호출 시
    await boardService.getPost(req, res, next);
    // Board.findOne이 호출될 것이고
    expect(Board.findOne).toBeCalled();
    // 모델 객체에 쿼리가 잘 전달되었는지 확인
    expect(Board.findOne).toHaveBeenCalledWith(query);
    // 반환 객체가 일치하는지 확인
    expect(res._getJSONData()).toStrictEqual(testBoards);

    // 성공 시 상태코드 200을 반환한다.
    expect(res.statusCode).toBe(200);
  });
  test("게시글 수정에 성공하면 상태코드 200을 반환한다.", async () => {
    await boardService.setPost(req, res, next);

    // 성공 시 상태코드 200을 반환한다.
    expect(res.statusCode).toBe(200);
  });
  test("게시글 삭제에 성공하면 상태코드 200을 반환한다.", async () => {
    await boardService.deletePost(req, res, next);
    // 성공 시 상태코드 200을 반환한다.
    expect(res.statusCode).toBe(200);
  });
  test("게시글 삭제에 성공하면 상태코드 200을 반환한다.", async () => {
    await boardService.deletePost(req, res, next);
    // 성공 시 상태코드 200을 반환한다.
    expect(res.statusCode).toBe(200);
  });
});
