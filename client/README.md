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