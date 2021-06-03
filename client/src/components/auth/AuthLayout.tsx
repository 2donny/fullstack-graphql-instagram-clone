import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}
