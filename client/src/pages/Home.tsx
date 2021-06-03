import { isLoggedInVar } from '../Apollo';
import styled from 'styled-components';

export interface Props {
}

export default function Home (props: Props) {
  return (
    <Container>
      <Title>Home</Title>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </Container>
  );
}


const Title = styled.h1`
  font-size: 20px;
  color: ${props => props.theme.color};
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
