const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../../codes/errorCodes");
/**
 * <board의 post create, update 시 password에 대한 검증 로직>
 *
 * password : required, length : 6 ~ 15, (숫자, 대소문자, 특수문자 포함)
 */
function passwordValidator() {
  return [
    body("password")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ min: 6, max: 15 })
      .bail()
      .withMessage(errorCodes.wrongPwdFormat)
      .matches(/[A-za-z]/)
      .bail()
      .withMessage(errorCodes.wrongPwdFormat)
      .matches(/[~!@#$%^&*()_+|<>?:{}]/)
      .bail()
      .withMessage(errorCodes.wrongPwdFormat)
      .matches(/[0-9]/)
      .withMessage(errorCodes.wrongPwdFormat),
    index,
  ];
}

module.exports = { passwordValidator };
