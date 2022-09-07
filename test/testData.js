const data = {
  successData: {
    title: "테스트",
    content: "슈퍼테스트",
    name: "작성자",
    password: "KK11!!22",
  },
  updateData: {
    title: "테스트 수정",
    content: "수정 테스트",
    password: "KK11!!22",
  },
  deleteData: {
    password: "KK11!!22",
  },
  deleteWrongPasswordData: {
    title: "테스트 수정",
    content: "수정 테스트",
    password: "KKK11!!22",
  },
  wrongPasswordData: {
    title: "테스트 수정",
    content: "수정 테스트",
    password: "KKK11!!22",
  },
  returnData: {
    title: "테스트 수정",
    content: "수정 테스트",
    name: "작성자",
    password: "KK11!!22",
  },
  nullData: {
    content: "슈퍼테스트",
    name: "작성자",
    password: "KK11!!22",
  },
  contentTooLongData: {
    title:
      "슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트",
    content:
      "슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트",
    name: "작성자",
    password: "KK11!!22",
  },
  titleTooLongData: {
    title:
      "슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트슈퍼테스트",
    content: "슈퍼테스트",
    name: "작성자",
    password: "KK11!!22",
  },
  nameTooLongData: {
    content: "슈퍼테스트",
    name: "작성자작성자작성자작성자작성자작성자",
    password: "KK11!!22",
  },
  passwordNotCorrect: {
    content: "슈퍼테스트",
    name: "작성자작성자작성자작성자작성자작성자",
    password: "KK1",
  },
};

module.exports = { data };