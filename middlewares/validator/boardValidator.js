const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../../codes/errorCodes");
/**
 * <board create, update 시 delete title, content, name, password에 대한 검증 로직>
 *
 * title : required, maxLength : 20
 * content : required, maxLength : 200
 * name : required, maxLength : 10
 * password : required, length : 6 ~ 15, (숫자, 대소문자, 특수문자 포함)
 */
function boardValidator() {
  return [
    body("title")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ max: 20 })
      .withMessage(errorCodes.wrongFormat),
    body("content")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ max: 200 })
      .withMessage(errorCodes.wrongFormat),
    body("name")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ max: 10 })
      .withMessage(errorCodes.wrongFormat),
    index,
  ];
}

module.exports = { boardValidator };
