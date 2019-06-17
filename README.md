# Todolist Example
- TodoList Example

# Features
- Facebook Login
- Own TodoList

# Run Locally
- src/util/config.ts에 있는 변수들을 모두 설정해주어야 합니다
```s
$ export MONGODB_URI=VALUE
$ export CLIENT_ID=VALUE
$ export CLIENT_SECRET=VALUE
$ export CSRF_TOKEN=VALUE
$ export JWT_SALT=VALUE
$ export SERVICE_URL=VALUE
$ npm start
```

# API
## GET https://todolist.kim1jun.xyz/api/{user-id}
### Description
- todo를 확인할 수 있습니다.

### Parameter
- **Path Parameter**
  - `user-id`
    - Description: 확인하고자 하는 user의 id
- **Header**
  - `Authorization`
    - Description: 인증에 필요한 JWT
    - Example: example.token.example

## POST https://todolist.kim1jun.xyz/api/{user-id}
### Description
- todo를 추가할 수 있습니다.

### Parameter
- **Path Parameter**
  - `user-id`
    - Description: 추가하고자 하는 user의 id
- **Header**
  - `Authorization`
    - Description: 인증에 필요한 JWT
    - Example: example.token.example
- **Body (application/json)**
  - `title`
    - Type: string
    - Description: 제목
  - `description`
    - Type: string
    - Description: 내용
  - `priority`
    - Type: number
    - Description: 우선순위
  - `dueDate`
    - Type: Date
    - Description: 기한 (선택)

## PATCH https://todolist.kim1jun.xyz/api/{user-id}/{todo-id}
### Description
- todo를 수정할 수 있습니다.

### Parameter
- **Path Parameter**
  - `user-id`
    - Description: 수정하고자 하는 user의 id
  - `todo-id`
    - Description: 수정하고자 하는 todo의 id
- **Header**
  - `Authorization`
    - Description: 인증에 필요한 JWT
    - Example: example.token.example
- **Body (application/json)**
  - `title`
    - Type: string
    - Description: 제목 (선택)
  - `description`
    - Type: string
    - Description: 내용 (선택)
  - `priority`
    - Type: number
    - Description: 우선순위 (선택)
  - `dueDate`
    - Type: Date
    - Description: 기한 (선택)
  - `done`
    - Type: boolean
    - Description: 완료 여부 (선택)

## DELETE https://todolist.kim1jun.xyz/api/{user-id}/{todo-id}
### Description
- todo를 삭제할 수 있습니다.

### Parameter
- **Path Parameter**
  - `user-id`
    - Description: 삭제하고자 하는 user의 id
  - `todo-id`
    - Description: 삭제하고자 하는 todo의 id
- **Header**
  - `Authorization`
    - Description: 인증에 필요한 JWT
    - example: example.token.example
