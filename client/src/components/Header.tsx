import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { isLoggedInVar, logUserOut } from '../graphql/Apollo';
import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import routes from '../routes';
import useUser from '../hooks/useUser';
import Avatar from './Avatar';

export default function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to="/">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Link to="/">
                <Icon>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Icon>
              </Link>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me.username}/`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
              <Icon>
                <button onClick={logUserOut}>Log out</button>
              </Icon>
            </IconContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: black;
  }
`;
const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div`
  a {
    color: black;
    &:active {
      color: lightgray;
    }
  }
`;
const Icon = styled.span`
  margin: 0 10px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;
