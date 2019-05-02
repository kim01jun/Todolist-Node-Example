# Todolist Example
- TodoList Example

# Features
- Facebook Login
- Own TodoList

# API
GET https://todolist.kim1jun.xyz/api/{user-id} 에서 todo를 확인할 수 있습니다.
- url에는 user id
- Header에 Authorization: example-token

POST https://todolist.kim1jun.xyz/api/{user-id} 에서 todo를 추가할 수 있습니다.
- url에는 user id
- Header에 Authorization: example-token
    - Body에는 (application/json)
      - content: string
      - dueDate: Date
      - priority: number
      - labels: Array<String>
      - project: string

PATCH https://todolist.kim1jun.xyz/api/{user-id}/{todo-id} 에서 todo를 수정할 수 있습니다
- POST https://todolist.kim1jun.xyz/api/{user-id}와 동일

DELETE https://todolist.kim1jun.xyz/api/{user-id}/{todo-id} 에서 todo를 삭제할 수 있습니다
- url에는 user id
- Header에 Authorization: example-token
