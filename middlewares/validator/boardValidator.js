const { body } = require("express-validator");
const index = require("./index");
const errorCodes = require("../../codes/errorCodes");
/**
 * <board의 post create, update 시 title, content에 대한 검증 로직>
 *
 * title : required, maxLength : 20
 * content : required, maxLength : 200

 */
function boardValidator() {
  return [
    body("title")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ max: 20 })
      .withMessage(errorCodes.tooLongTitle),
    body("content")
      .notEmpty()
      .bail()
      .withMessage(errorCodes.required)
      .trim()
      .isLength({ max: 200 })
      .withMessage(errorCodes.tooLongContent),
    index,
  ];
}

module.exports = { boardValidator };
