import React from 'react';
import styled from 'styled-components';
import Header from './Header';

interface Props {
  children: React.ReactChild[];
}

const Content = styled.div`
  margin: 45px auto 0;
  max-width: 930px;
  width: 100%;
`;

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}
