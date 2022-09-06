const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../../codes/errorCodes");
/**
 * <board의 post create, update 시 password에 대한 검증 로직>
 *
 * password : required, length : 6 ~ 15
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
      .withMessage(errorCodes.wrongFormat),
    index,
  ];
}

module.exports = { passwordValidator };
