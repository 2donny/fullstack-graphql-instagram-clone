# instagram clone

## User

- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Follow User
- [x] Unfollower User
- [x] See Followers / Pagination
- [x] See Followings / Pagination
- [x] Computed Fields
- [x] Search User

## Photos

- [x] Upload Photo (Parse #)
- [x] See Photo
- [x] See Hashtags
- [x] Search Photos
- [x] Edit Photo
- [x] Like / Unlike Photo
- [x] See Photo Likes
- [x] See Feed
- [x] Is Mine(delete photo)
- [x] Comments number
- [x] See Photo Comments

## Comments

- [x] Comment on Photo
- [x] Edit Comment
- [x] Delete Comment (Is Mine)

## Refactor

- [x] Mutation Response

## Extras

- [x] S3 Image Upload

## Direct Messages

- [ ] Create Room
- [ ] Get Room
- [ ] Send Message
- [ ] Realtime Messages

## File directory

- 유지보수를 위해 모든 schema를 typeDefs, queries, mutation, 파일로 나눠서 개발한다.

- schema.js 파일에서 graphql-tools를 사용해 모든 스키마 폴더 (movies, users, comments)를 loadSync 하고 merge 한다. 그리고 얻어낸 typeDefs, resovlers를 통해 makeExecutable을 만들고 이것을 ApolloServer 클래스의 instance로 넘긴다. (new ApolloServer({ schema }))

<br />

## Command description

- npx prisma init
  - prisma > schema.prisma 파일을 생성
    - datasource db에서 provider, url을 정의한다
    - client를 통해 node_moduels > .prisma/client/index.d.ts 파일에 우리가 model로 정의한 DB 테이블의 타입이 정의된다. (prisma의 가장 큰 장점)
- npx prisma migrate dev --preview-feature
  - prisma 파일에 mapping되는 sql 파일이 생성된다. 실제로 DB 테이블이 생성된다.
  - schema.prisma의 model을 변경할 때마다 해줘야한다.
- npx prisma studio
  - DB 확인할 수 있는 브라우저가 생성됨.

<br />

## Rejecting from Apollo Server

apollo-server-express로 express와 apollo-server를 connect 할 수 있다.

(1) Installation

```javascript
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
```

<br />
(2) Setting up Apollo Server with Express.js

```javascript
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
apollo.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀Server is running! Listening on port 4000`);
});
```

<br />

(3) We can use Express middlewares free

```javascript
    ...

    app.set('PORT', 4000);
    app.use(logger('dev'))
    app.use('/static', express.static('uploads'))
    app.use(passport())

    ...
```

<br />

## Apollo-Server의 장점

1. ApolloServer 인스턴스 만들 때 context를 최초에 설정하면 모든 Resolver 함수에서 3번째 인자인 context로 접근 가능하다. (express의 미들웨어와 유사)

```javascript
    <!-- Pseudocode -->

    // ./utils.js
    import jwt from 'jsonwebtoken'

    export getUser = async (token: string) => {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({
            where: { id: verifiedToken["id"] }
        })
        return user;
    }

    // ./server.js
    import { getUser } from './utils';
    import { PrismaClient as client } from '@prisma/client';

    const apollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            return {
                loggedUser: await getUser(req.headers.token),
                client,
            };
        },
    });


    // editProfileResolver.js

    const Resolvers = {
        type Mutation {
            editProfile: (root, args, context, info) => {

                // 이처럼 context 토큰 검사를 최초 한번만 수행할 수 있다.
                if(!context.loggedUser) {
                    return {
                        ok: false
                        error: 'You need to login.'
                    }
                }

                // context.client로 PrismaClient에 접근가능
                const user = context.client.findUnique({
                    where: { id: context.client.id},
                    data: {
                        avatar,
                        followers
                    }
                })

                ...
            }
        }
    }
```

<br />

2. 기본적으로 제공해주는 typeDefs가 있다. 가령 파일객체 타입인 scalar Upload가 있다.(Playground의 Schema에서 확인 가능.)

<br />

3. Functional programming 하기가 용이하다.

```javascript
    // ./utils.js
    export const protectedResolver = (ourResolver: Resolver) => (
        root: any,
        args: any,
        context: any,
        info: any,
    ) => {
        if (!context.loggedUser) {
            return {
                ok: false,
                error: 'You need to login.',
            };
        }
        return ourResolver(root, args, context, info);
    };

    // ./profileResolver.ts
    const resolverFn = async (_, { username, password }, { loggedUser, client}) => {
        ...

        <!-- 비즈니스 로직 작성 -->

        ...
    }

    // Resolver에서 HOF 작성 가능. 함수형 프로그래밍의 장점이 있다.
    export default {
        Mutation: {
            editProfile:  protectedResolver(resolverFn),
        }
    }
```

<br />

4. 전적 Typescript 지원. Schema, Resolver, Context의 타입을 선언하면 타입 자동완성이 되기 때문에 타입스크립트로 개발하기 알맞다.

```typescript
//  ./types.d.ts
import { User, PrismaClient } from '@prisma/client';

type Context = {
  loggedUser: User;
  client: PrismaClient;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any,
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
```

## Trouble shooting

## TIL

5/27 - Prisma data model

```javascript
    model User {
        photos Photo[]
    }

    model Photo {
        user User    @relation(fields: [userId], references: [id])
        userId Imt
        hashtags Hashtag[]
    }

    model Hashtag {

        photos Photo[]
        hashtags String @unique
    }

```

```javascript
// uploadPhoto.resolver.ts
await client.photo.create({
  data: {
    file,
    caption,
    user: {
      connect: {
        id: loogedInUser.id,
      },
    },
  },
});
```

1. Prisma model에서 field가 relation attribute일 때는 "connect" API로 두 model을 연결한다. connect는 존재하는 related record를 unique한 필드(id, username)을 가지고 연결한다.

2. many to many relation에서는 "connectOrCreate" API를 사용하여 한 record가 관련된 여러개의 record와 연결될 수 있기에 [] 배열 사용이 가능하다.

```javascript
await client.photo.create({
  data: {
    file,
    caption,
  },
  hashtags: {
    connectOrCreate: [
      {
        where: { hashtag: '#hi' },
        create: { hashtag: '#hi' },
      },
      {
        where: { hashtag: '#developers' },
        create: { hashtag: '#developers' },
      },
    ],
  },
});
```

<br />

5/31 - On delete cascade

- Prisma는 아직 related field에 대한 Cascade deletion 기능을 개발중이다. Prisma 팀이 권장하는 [해결책](https://www.prisma.io/docs/guides/database/advanced-database-tasks/cascading-deletes/postgresql)은 다음과 같다.

  - SQL문으로 DB table을 만들 때 foreign key의 Constraint를 직접 설정한다.
  - [@paljs/plugin](https://paljs.com/plugins/delete) 에서 제공하는 PrismaDelete 클래스의 onDelete 함수를 사용하여 Cascade deletion을 할 수 있다.
  - 직접 related model의 field 값들을 transaction으로 삭제한다. 예시는 다음과 같다.

  ```javascript
  const deleteComments = client.comment.deleteMany({
    where: {
      photoId,
    },
  });

  const deletePhoto = client.photo.delete({
    where: {
      id: photoId,
    },
  });

  const transaction = await client.$transaction([
    deleteComments,
    deletePhoto,
  ]);
  ```
나는 위의 3가지 방법 중에 3번을 택했는데 그 이유는 먼저 paljs를 쓰지 않은 이유는 prisma팀이 작성한 코드가 아니기 때문이다. DB의 삭제를 담당하는 ORM의 신뢰도는 매우 중요하기 때문에 transaction 기능을 사용해서 귀찮더라도 관련된 모든 field들을 먼저 삭제하고 해당 model도 삭제하는 방법을 택했다. 물론 이 방법은 DB Schema의 복잡도가 커질수록 일일이 삭제하는 것은 생산성과 최적화를 방해하기 때문에 추후에는 직접 DB 테이블을 설정하는 것이 좋아보인다.