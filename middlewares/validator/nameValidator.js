const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../../codes/errorCodes");
/**
 * <boar의 post update 시 name에 대한 검증 로직>
 *
 * name : required, maxLength : 10
 */
function nameValidator() {
  return [
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

module.exports = { nameValidator };
