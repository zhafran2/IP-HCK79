## Models :

_User_
-username: string
- email : string, unique (required)
- password : string (required)


_CategoryId_
- id: serial primary key
- name : string

_Quiz_
- question : string (validation required)
- option1:string (required)
- option2 : string (required)
- option3 : string (required)
- option4: string (required)
-ans : integer (required)
-categoryIdId : integer (required)
-userId: integer(required)
Relationship Table / Model : Many to Many

List of available endpoints:
​
- `POST /add-user`
- `POST /login`

And routes below need authentication
- `GET /products`
- `POST /products`
- `PUT /product/:id`
- `DELETE /products:id`

1. add user

- body:
```json
{
  "username" : "string",
  "email": "string",
  "password": "string",
  
}
```

_Response (201 - Created)_

```json
{
   "username" : "string",
  "email": "string",
  "password": "string",
 
}
```

_Response (400 - Bad Request)_
```json
{
  "id": "integer",
  "password": "string",
  
}
```

_Response (400 - Bad Request)_


```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must unique"
}
OR
{
  "message": "Password is required"
},
{
  "message": "Password minimum 5 character"
}
```

2. Login

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
  ​

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

3. create all products
end points : POST(/quiz)
_Response_ (200 - ok)

_Response_(401 - JsonWebTokenError)
```json
{
  "message" : "Invalid Token"
}
```

 DELETE
- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "quiz success to delete"
}
```
edit /PUT Quiz (quiz:id)

params : id

_Response (200 - OK)_

```json 
{

}

_Response(404 - unauthorized)_
```json
{
   "message" : "question id is not found"
}
```

 _Response (403 - NotFound)
 ```json
{
  "message": "You're not authorized"
}
 ```


