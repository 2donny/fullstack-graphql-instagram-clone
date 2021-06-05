import { isLoggedInVar, logUserOut } from '../Apollo';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';

export interface Props {}

export default function Home (props: Props) {
  return (
    <Container>
      <PageTitle title="Home"/>
      <Title>Home</Title>
      <button onClick={() => logUserOut()}>Log out</button>
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
