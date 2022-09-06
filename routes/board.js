const { Router } = require("express");
const { boardService } = require("../services");
const { boardValidator } = require("../middlewares/validator/boardValidator");
const {
  passwordValidator,
} = require("../middlewares/validator/passwordValidator");
const { nameValidator } = require("../middlewares/validator/nameValidator");
const router = Router();

router.post(
  "/",
  boardValidator(),
  nameValidator(),
  passwordValidator(),
  boardService.addPost
);
router.get("/", boardService.getPosts);
router.get("/:id", boardService.getPost);
router.patch(
  "/:id",
  boardValidator(),
  passwordValidator(),
  boardService.setPost
);
router.delete("/:id", passwordValidator(), boardService.deletePost);

/**
 * @swagger
 * paths:
 *   /posts:
 *    post:
 *      summary:  "익명게시판 게시글 생성"
 *      description: "게시글 생성 시 6자리 이상의 대소문자, 숫자, 영문을 포함한 비밀번호를 받아 암호 설정이 가능하며, 서울을 기준으로 날씨 데이터를 생성합니다."
 *      tags: [Anonymous Board]
 *      parameters :
 *         - in : body
 *           name : data
 *           required : true
 *           description : 생성할 데이터
 *           schema :
 *              type : object
 *              example :
 *                {title : 생성할 제목, content : 생성할 내용, name: 작성자, password: 게시글 비밀번호}
 *      responses:
 *        "201":
 *          description: "게시글 생성에 성공하면 id, 제목, 내용, 작성자, 날씨 데이터가 담긴 게시글 객체를 넘깁니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                          {
 *                              "id": 50,
 *                              "title": "test2",
 *                              "content": "test3",
 *                              "name": "annoy",
 *                              "weather": "화창함",
 *                          }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  {
 *                    error: [
 *                        {
 *                           message: error.message,
 *                           field: error.name
 *                        }
 *                     ]
 *                  }
 *
 */

/**
 * @swagger
 * paths:
 *   /posts/?page:
 *    get:
 *      summary:  "익명게시판 게시글 전체 조회"
 *      description: "익명게시판의 전체 게시글을 조회합니다."
 *      tags: [Anonymous Board]
 *      parameters :
 *        - in : query
 *          name : page
 *          required : true
 *          description : 익명게시판의 페이지 번호
 *          schema :
 *             type : int
 *      responses:
 *        "200":
 *          description: "익명게시판의 전체 게시글이 20개씩 최근 생성일 순으로 조회됩니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type : object
 *                  example:
 *                        [
 *                            {
 *                                "id": 50,
 *                                "title": "test2",
 *                                "content": "test3",
 *                                "name": "annoy",
 *                                "weather": "화창함",
 *                            },
 *                            {
 *                                "id": 49,
 *                                "title": "test2",
 *                                "content": "test3",
 *                                "name": "annoy",
 *                                "weather": "화창함",
 *                            },
 *                            {
 *                                "id": 48,
 *                                "title": "test2",
 *                                "content": "test3",
 *                                "name": "annoy",
 *                                "weather": "화창함",
 *                            },
 *                          ]
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  { error: {
 *                     message: error.message,
 *                     field: error.name
 *                           } }
 *
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *    get:
 *      summary:  "익명게시판 특정 게시글 조회"
 *      description: "익명게시판의 특정 게시글을 조회합니다."
 *      tags: [Anonymous Board]
 *      parameters :
 *        - in : path
 *          name : id
 *          required : true
 *          description : 익명게시판의 특정 게시글 id
 *          schema :
 *             type : int
 *      responses:
 *        "200":
 *          description: "익명게시판의 해당 id를 가진 게시글 객체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                items:
 *                  type : object
 *                  example:
 *                          {
 *                              "id": 50,
 *                              "title": "test2",
 *                              "content": "test3",
 *                              "name": "annoy",
 *                              "weather": "화창함",
 *                          }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  { error: {
 *                     message: error.message,
 *                     field: error.name
 *                           } }
 *
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *    patch:
 *      summary:  "익명게시판 특정 게시글 수정"
 *      description: "익명게시판의 특정 게시글을 수정할 때 게시글 생성 시 입력한 비밀번호를 입력해야 수정이 가능합니다."
 *      tags: [Anonymous Board]
 *      parameters :
 *         - in : path
 *           name : id
 *           required : true
 *           description : 익명게시판의 특정 게시글 id
 *           schema :
 *           type : int
 *         - in : body
 *           name : data
 *           required : true
 *           description : 수정할 데이터
 *           schema :
 *              type : object
 *              example :
 *                {title : 수정할 제목, content : 수정할 내용, password: 게시판 생성 시 설정한 비밀번호}
 *      responses:
 *        "200":
 *          description: "익명게시판의 해당 id를 가진 수정된 게시글 객체를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                items:
 *                  type : object
 *                  example:
 *                          {
 *                              "id": 50,
 *                              "title": "test2",
 *                              "content": "test3",
 *                              "name": "annoy",
 *                              "weather": "화창함",
 *                          }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  { error: {
 *                     message: error.message,
 *                     field: error.name
 *                           } }
 *
 */

/**
 * @swagger
 * paths:
 *   /posts/{id}:
 *    delete:
 *      summary:  "익명게시판 특정 게시글 삭제"
 *      description: "익명게시판의 특정 게시글을 삭제할 때 게시글 생성 시 입력한 비밀번호를 입력해야 삭제가 가능합니다."
 *      tags: [Anonymous Board]
 *      parameters :
 *         - in : path
 *           name : id
 *           required : true
 *           description : 익명게시판의 특정 게시글 id
 *           schema :
 *           type : int
 *         - in : body
 *           name : data
 *           required : true
 *           description : 게시판 생성 시 입력한 비밀번호
 *           schema :
 *              type : object
 *              example :
 *                {password: 게시판 비밀번호}
 *      responses:
 *        "200":
 *          description: "익명게시판의 해당 id를 가진 게시글을 삭제하고 삭제 메세지를 반환합니다."
 *          content:
 *            application/json:
 *              schema:
 *                  type : object
 *                  example:
 *                            { message: "게시글이 삭제되었습니다." }
 *        "400":
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example :
 *                  { error: {
 *                     message: error.message,
 *                     field: error.name
 *                           } }
 *
 */

module.exports = router;
