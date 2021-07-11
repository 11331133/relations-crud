## Control flow

1. **Authentification Guard**. Parses JWT token and declines request if JWT is not valid

2. **Authorization Guard.** Parses metadata set by `@Role()` decorator and determines whether user has required permission

3. **Controller**. Handles request and call use case method. These 3 steps must fullfill usecases's contract or decline request. (for example, DTO in first argument, User's ID in second)

4. **UseCase** calls DTO verification by schema and returns response to controller

5. **StatusCode interceptor** changes status code according to response by use case.

 ## Installation
 ```
 git clone https://github.com/11331133/relations-crud.git
 cd relations-crud
 docker-compose up -d
 ```
 
 ## Documentation
 If you run Docker containers on your machine, available methods and description of API are available at `localhost:3000/apidocs`