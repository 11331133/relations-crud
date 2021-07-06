
  

# About project

  

Basic CRUD with relations, built on NestJS, Neo4j, TypeORM, JSON Schema

  

## Control flow

  

1. Authentification Guard. Parses JWT token and declines request if JWT is not valid

2. Authorization Guard. Parses metadata and determines whether user has required permission

3. Controller. Handles request and call use case method. These 3 steps must fullfill usecases's contract or decline request. (for example, DTO in first argument, User's ID in second)

4. UseCase calls DTO verification by schema and returns response to controller

5. StatusCode interceptor changes status code according to response by use case.

  
## Potentional problems

### Similar code in relation's usecases \ repositories, potential DRY principle violation.

**Possible solution**: 
1) Generic use cases\repositories, for example  HasPetRelation.create -> Relation.Create, HasPetRelationRepository -> RelationRepository
2) Object Graph Mapper (OGM) as abstraction over Cypher queries can decrease amount of repeatable code

**Why generic use cases\repositories are not implemented**: 1) Abstraction leak (For example, `HasFriendRelation.deleteOne(relation: Relation) -> Relation.DeleteOne(label?: string, from: string, to: string, direction: Direction, properties?: Record<string, any>)` 2) Generic use cases\repositories are vulnerable to any custom business logic (so maintaining of generic version can be harder than similar, but specific versions) With future addition of business logic, this problem will be potentially solved by itself (?)

Related question:  [Generic Repository or Specific Repository for each entity?](https://stackoverflow.com/questions/51771407/generic-repository-or-specific-repository-for-each-entity)



### One-string controllers\use cases. Middle man code smell
**Possible solution**
Remove middle man

**Why middle man is not removed**

 1. Possible SRP violation - controller handles http requests and implements business logic simultaneously.
 2. Injection of repository into controller seams questionable
 3. High coupling of business logic with HTTP protocol

Related article (RU): [А почему мы не пишем код в контроллерах?](https://habr.com/ru/post/505708/)



## Installation

  

Environment Variables

  

```

RELATIONAL_DB_HOST=localhost
RELATONAL_DB_PORT=5432
RELATIONAL_DB_USERNAME=
RELATIONAL_DB_PASSWORD=
RELATIONAL_DB_DATABASENAME=

GRAPH_DB_CONNECTION_URL=neo4j://localhost
GRAPH_DB_NAME=
GRAPH_DB_USERNAME=
GRAPH_DB_PASSWORD=

JWT_SECRET_KEY=
JWT_SIGN_ALGORITHM=HS256
JWT_VERIFY_ALGORITHMS=HS256

```



