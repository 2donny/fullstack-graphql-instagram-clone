import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import Header from '../components/Header';
import Photo from '../components/feed/Photo';
import { gql, useQuery } from '@apollo/client';
import type { PhotoTypes } from '../shared/types';

export const FEED_QUERY = gql`
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      createdAt
      isMine
      isLiked
      comments {
        id
        user {
          username
          avatar
          isMe
          createdAt
        }
        payload
        isMine
        createdAt
      }
    }
  }
`;

export default function Home() {
  const { data } = useQuery<{ seeFeed: [PhotoTypes] }, { page: number }>(FEED_QUERY, {
    variables: {
      page: 1
    },
  });

  if (!data?.seeFeed) return null;

  console.log(data?.seeFeed);

  return (
    <Container>
      <PageTitle title="Home" />
      <Header />
      {data?.seeFeed.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
