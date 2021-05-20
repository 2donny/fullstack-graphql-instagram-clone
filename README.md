# instagram clone 

## User
- [x] Create Account
- [x] See Profile
- [ ] Login
- [ ] Edit Profile
- [ ] Follow User
- [ ] Unfollower User
- [ ] Change Avatar (Image Upload)


## file directory

* 유지보수를 위해 모든 schema를 typeDefs, queries, mutation, 파일로 나눠서 개발한다.

* schema.js 파일에서 graphql-tools를 사용해 모든 스키마 폴더 (movies, users, comments)를 loadSync 하고 merge 한다. 그리고 얻어낸 typeDefs, resovlers를 통해 makeExecutable을 만들고 이것을 ApolloServer 클래스의 instance로 넘긴다. (new ApolloServer({ schema })) 

## Command description

* npx prisma init 
    * prisma > schema.prisma 파일을 생성
        * datasource db에서 provider, url을 정의한다
        * client를 통해 node_moduels > .prisma/client/index.d.ts 파일에 우리가 model로 정의한 DB 테이블의 타입이 정의된다. (prisma의 가장 큰 장점)
* npx prisma migrate dev --preview-feature
    * prisma 파일에 mapping되는 sql 파일이 생성된다. 실제로 DB 테이블이 생성된다.
    * schema.prisma의 model을 변경할 때마다 해줘야한다.
* npx prisma studio
    * DB 확인할 수 있는 브라우저가 생성됨.


## User