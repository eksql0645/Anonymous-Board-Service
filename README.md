# 🚩 Anonymous Board

익명으로 게시글을 생성하고 비밀번호를 통해 수정, 삭제가 가능한 익명 게시판입니다.

## ✔기능 설명

- 게시판을 생성, 조회, 전체조회, 수정, 삭제가 가능합니다.
- 게시판 생성 시 비밀번호를 입력해야 합니다.
- 게시판 생성 시 이모지 사용이 가능합니다.
- 게시판 수정, 삭제 시 생성할 때 만든 비밀번호를 입력해야 합니다.
- 게시판 생성 시 IP주소를 참고하여 날씨 데이터가 반영됩니다.
- 게시판 전체 조회 시 페이지 당 20개씩 최근 순으로 조회가 가능합니다.

# ✅ 요구사항 분석

## ✔ 게시판 API 구현

- express-validator를 사용하여 게시판의 제목은 20자, 본문은 200자, 작성자는 10자, 비밀번호는 6~15자로 길이 제한을 두었고, 비밀번호의 경우 보안을 위해 숫자, 대소문자, 특수문자를 포함하였습니다.
- 게시판 생성 시 보안을 위해 비밀번호를 해쉬화하였습니다.
- 각 API에 적절한 에러 처리를 하였습니다.

## ✔ 추가기능 구현 설명

- sequelize의 offset과 limit를 사용하여 한 페이지 당 20개의 게시글이 조회되도록 구현하였고, 생성날짜를 기준으로 최신순으로 정렬을 하였습니다.
- request-promise 모듈을 사용하여 외부 API에 날씨 데이터를 요청하였습니다.
    - 날씨 데이터 요청 시 한글로 데이터를 받아오고, ip주소에 따른 날씨 데이터를 받아오도록 구현하였습니다.

# 🛠 게시판 모델링

- 이모지 사용을 위해 charset을 utf8mb4로 설정했습니다.

| 설명 | 필드명 | 데이터 타입 |
| --- | --- | --- |
| id (FK) | id | int |
| 제목 | title | varchar(25) |
| 본문 | content | varchar(210) |
| 작성자 | name | varchar(15) |
| 비밀번호 | password | varchar(80) |
| 날씨 | weather | varchar(50) |

## ERD

![image](https://user-images.githubusercontent.com/80232260/188899851-13ae7990-098a-49f4-823e-d49e99c0ae52.png)

- 테이블 생성 쿼리

```jsx
CREATE TABLE `anonymousboard`.`boards` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(25) NOT NULL,
  `content` VARCHAR(210) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `weather` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `updated_at` DATETIME NOT NULL DEFAULT now(),
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '익명 게시판';
```

# 📑 API 문서
npm start 후 http://localhost:8080/api-docs

Swagger PDF 문서 

| 요청 | HTTP method | url | req | res | res.status |
| --- | --- | --- | --- | --- | --- |
| 게시글 작성 | post | api/posts/ | req.body = title, content, name, password, weather | { id,title,content,name,weather } | 201 |
| 게시글 전체 조회 | get | api/posts/?page | req.query = page | [{ id, title, content, name, weather}, …] | 200 |
| 게시글 조회 | get | api/posts/:id | req.params = id | { id, title, content, name, weather } | 200 |
| 게시글 수정 | patch | api/posts/id | req.params = id <br> req.body = title, content, password | { id, title, content, name, weather } | 200 |
| 게시글 삭제 | delete | api/posts/:id | req.params = id <br> req.body = password | { message: “게시글이 삭제되었습니다.” } | 200 |

# 📜 테스트 케이스

- unitTest는 jest / 통합 테스트는 superTest로 진행하였습니다.

![image](https://user-images.githubusercontent.com/80232260/188899659-4d1c07b1-6f4a-4dc4-851f-d9d4017b3f8b.png)
![image](https://user-images.githubusercontent.com/80232260/188899676-87434b28-2fb8-4669-9549-d02e9d25961f.png)

# 💡 컨벤션

### ✔ camelCase / PascalCase

- **파일, 생성자, 변수, 메서드명**은 **camelCase**를 사용합니다.
- **클래스명**은 **PascalCase**를 사용합니다.

### ✔ Lint 규칙

| 들여쓰기 2칸 | 탭 사용 x |
| --- | --- |
| double quote 사용. | commonJS 사용 |
| 마지막 콤마 사용 | 한줄 최대 글자수: 80 |
| var는 사용하지 않습니다. | 세미 콜론 사용을 허용합니다. |

## branch명

- 대문자 금지 / 언더바 금지
- ‘-’ 사용
- 초기 설정은 master 브랜치에 설정
    - 초기설정에는 패키지 설치 / DB 설정 / 폴더구조까지 포함한다.
- 브랜치 나누기 전에 이슈 생성하기
- 구현할 기능별/ 문서 / 테스트 별로 브랜치 나누기

| 기능 | 브랜치명 |
| --- | --- |
| 게시글 생성  | feature/board-create-post |
| 게시글 전체 조회 | feature/board-get-posts |
| 게시글 조회 | feature/board-get-post |
| 게시글 수정 | feature/board-patch-post |
| 게시글 삭제 | feature/board-delete-post |
| 게시글 날씨 정보 추가 | feature/board-add-weather-api |
| 게시글 전체 조회 제한 추가 | feature/board-limit-get-posts |
| 게시판 테스트 | feature/board-test |
| 게시판 swagger | feature/board-swagger |
| 게시판 refactoring | feature/board-refactoring |

### Issue 형식

(브랜치명) | (이슈 간략 설명) / feature/board | create post API

```text
### Issue 타입(하나 이상의 Issue 타입을 선택해주세요)
-[] 기능 추가
-[] 기능 삭제
-[] 버그 수정
-[] 의존성, 환경 변수, 빌드 관련 코드 업데이트
-[] 테스트 추가
-[] 리팩토링

### 상세 내용
ex) Github 소셜 로그인 기능이 필요합니다.

### 참고 사항
```

### ✔ Git commit

![image](https://user-images.githubusercontent.com/80232260/188366205-84d8a796-3c51-4eb0-bb29-3a61c96bb047.png)

[깃 커밋 컨벤션 참고 사이트](https://overcome-the-limits.tistory.com/entry/협업-협업을-위한-기본적인-git-커밋컨벤션-설정하기)

# 🗂 폴더 구조

![image](https://user-images.githubusercontent.com/80232260/188899630-7df2b30f-36a9-4a0e-bfbc-b1ac09576950.png)

# ⚙ 패키지

```json
{
  "name": "anonnymousboard",
  "version": "1.0.0",
  "description": "익명게시판",
  "main": "server.js",
  "scripts": {
    "test": "jest",
    "start": "nodemon server.js",
    "coverage": "jest --coverage"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/eksql0645/Anonymous-Board-Service.git"
  },
  "author": "jks",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/eksql0645/Anonymous-Board-Service/issues"
  },
  "homepage": "https://github.com/eksql0645/Anonymous-Board-Service#readme",
  "dependencies": {
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3",
    "request-promise": "^4.2.6",
    "sequelize": "^6.21.4"
  },
  "devDependencies": {
    "@babel/eslint-parser": "^7.18.9",
    "dotenv": "^16.0.2",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jest": "^29.0.2",
    "node-mocks-http": "^1.11.0",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "sequelize-cli": "^6.4.1",
    "should": "^13.2.3",
    "supertest": "^6.2.4",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.5.0"
  }
}
```

# ⚡ 기술 스택
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-FCC624?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Sequelize-007396?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/Swagger-61DAFB?style=for-the-badge&logo=Swagger&logoColor=white"> <img src="https://img.shields.io/badge/Jest-F8DC75?style=for-the-badge&logo=Jest&logoColor=white">

# ✋ 트러블 슈팅
- unit test를 할 때 jest를 배워보고 싶어 사용하였는데 처음 사용하다보니 많이 헤맸습니다.
  - mocking함수를 만들고 예상 결과로 사용하였는데 계속 테스트에 실패했고 알고보니 요청을 보낸 데이터가 잘못되었기 때문이었습니다.
  - 코드를 차근차근 하나씩 뜯어보면서 풀어갔습니다.
  - 이외에도 더 자세한 테스트 코드를 작성하려했으나 원하는 메서드를 찾지 못했기 때문에 구체적인 유닛 테스트를 하지 못한 것이 아쉬웠습니다.
- 외부 API에 요청을 통해 날씨 데이터를 보내는데 request 모듈이란 것이 있다는 것을 알고 사용하였습니다.
  - 처음에 request 모듈을 사용하여 promise로 값을 리턴하였는데 계속 에러가 났고 구글링을 통해 request-promise가 있다는 것을 알게 되어 사용하면서 해결되었습니다.
- 각 API에 따라 상태코드를 어떻게 보내야 할지 고민하였습니다.
  - 게시글 조회시와 수정, 삭제 시 게시글이 없다면 400번 에러코드를 보내야 할 지 200번 정상 코드를 보내야 할 지가 가장 고민이 되었는데, 게시글 조회의 경우는 클라이언트 쪽에서 정상적으로 요청을 보냈기 때문에 200번 코드를 보내는게 맞다고 생각하였고, 게시글 수정, 삭제 시에는 존재하지 않는 게시글에 대해 사용자가 요청을 보냈기 때문에 클라이언트 쪽 요청이 잘못되었다고 판단하여 400번 에러를 보내기로 결정하였습니다. 
