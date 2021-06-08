# Instaclone Web

## Todo list

- [x] Router
- [x] Authentication
- [x] Architecture
- [x] Dark mode
- [x] Styles
- [ ] Login / Sign up

## TIL

06/03 - styled-components의 Theme 사용시 타입 추론은 다음과 같이 한다.

```typescript
// src/styles/styled.d.ts

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: string;
    bgColor: string;
  }
}
```

위의 `styled.d.ts` 파일 내에서 `node_modules/@types/styled-components/index.d.ts` 에 정의된 인터페이스를 확장한다.

<br />

```typescript
// src/components/home.ts

import styled from 'styled-components'

export default function Home(props: Props) {
  return (
      ...
  )
}

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.color};
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
```

컴포넌트에서 `styled-components`를 임포트하면 `DefaultTheme` 타입 추론이 된다.

<br />

06/07 - Modify in cache : Apollo cache를 업데이트할 때, `readFragment`, `writeFragment`로 캐시 읽기/쓰기가 가능하지만 Apollo v3에 두 API를 같이 쓸 수 있는 멋진 함수가 나왔다.

> cache.modify

```javascript
  const fragmentId = `Photo:${id}`;
  const fragment = gql`
    fragment anyName on Photo {
      isLiked
      likes
    }
  `;
  cache.writeFragment({
    id: fragmentId,
    fragment: fragment,
    data: {
      isLiked: !isLiked,
      likes: isLiked ? likes! - 1 : likes! + 1,
    },
  });
```

<br />

`Apollo v2`에서의 `cache.writeFragment`는 cache field 값을 update 한다. 문제는 캐시를 `생성할 때`인데 예를들어 댓글을 생성할 때를 생각해보자. 
캐싱되었던 레코드를 `cache.readFragment()`로 읽고, 새로운 값을 임의로 만든후에 `cache.writeFragment()`로 써야한다. 
이는 v3에 추가된 `cache.modify()` `API`로 한꺼번에 처리가능하다.

아래의 `Apollo v3` `cache.modify`예시를 살펴보자.

```javascript
  const onSubmitValid = (data) => {
    ...

    createComment({
      variables: {
        id,
        payload
      },
      update: (cache, result) => {
        const { ok, id } = result?.data.createComment!;
        if(ok) {
          const newComment = {
            __typename: 'Comment',
            id,
            payload,
            isMine: true,
            createdAt: new Date(),
            user: {
              ...userData
            }
          };
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              comments(prev) {
                return [...prev, newComment]
              }
            }
          })
        }
      }
    })
  }
```
`cache.modify`API의`field`를 통해 `modifier functions`을 받는다. 이 함수는 인자로서 `previous cache data`를 받는다.