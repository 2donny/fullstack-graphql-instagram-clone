import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import Header from '../components/Header';
import Photo from '../components/feed/Photo';
import Layout from '../components/Layout';
import { useSeeFeedQuery } from '../generated/ApolloComponents';

export default function Home() {
  const { data, error, loading } = useSeeFeedQuery({
    variables: {
      page: 1,
    },
  });

  if (!data?.seeFeed) return null;
  console.log(data?.seeFeed);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러 발생..</p>;

  return (
    <Container>
      <PageTitle title="Home" />
      <Layout>
        {data?.seeFeed.map((photo) => (
          <Photo key={photo.id} {...photo} />
        ))}
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
