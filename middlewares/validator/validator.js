const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../../codes/errorCodes");
/**
 * <board create, update 시 delete title, content, name, password에 대한 검증 로직>
 *
 * title : required, maxLength : 20
 * content : required, maxLength : 200
 * name : required, maxLength : 10
 * password : required, length : 8 ~ 15, (숫자, 대소문자, 특수문자 포함)
 */
function validator() {
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
      .withMessage(errorCodes.wrongFormat)
      .matches(/[A-za-z]/)
      .bail()
      .withMessage(errorCodes.wrongPwdFormat)
      .matches(/[~!@#$%^&*()_+|<>?:{}]/)
      .bail()
      .withMessage(errorCodes.wrongPwdFormat)
      .matches(/[0-9]/)
      .withMessage(errorCodes.wrongPwdFormat),
    body("password")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ min: 6, max: 15 })
      .withMessage(errorCodes.wrongFormat),
    index,
  ];
}

module.exports = { validator };
