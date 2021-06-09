import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { darkModeVar, enableDarkMode, disableDarkMode } from '../../graphql/Apollo';
import { useReactiveVar } from '@apollo/client';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon color={darkMode ? "white" : "dark"} icon={darkMode ? faSun : faMoon} size="2x"/>
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}
