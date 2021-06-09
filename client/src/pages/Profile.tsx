import { useParams } from 'react-router-dom';
import {
  useFollowUserMutation,
  useSeeProfileQuery,
  useUnfollowUserMutation,
} from '../generated/ApolloComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FatText } from '../components/shared';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Button from '../components/auth/Button';
import PageTitle from '../components/PageTitle';

export default function Profile() {
  const { username: usernameParams } = useParams<{ username: string }>();
  const { data, loading } = useSeeProfileQuery({
    variables: {
      username: usernameParams,
      page: 1,
    },
  });
  const followUser = useFollowUserMutation({
    variables: {
      username: usernameParams,
    },
  });
  const unfollowUser = useUnfollowUserMutation({
    variables: {
      username: usernameParams,
    },
  });

  if (loading) return <p>로딩중...</p>;
  if (!data?.seeProfile) return <p>존재하지 않는 계정입니다.</p>;

  const { id, name, username, isMe, isFollowing } = data.seeProfile;

  const getButton = () => {
    if (isMe) return <ProfileBtn>프로필 편집</ProfileBtn>;
    else {
      if (isFollowing)
        return (
          <ProfileBtn
            onClick={() =>
              unfollowUser({
                update: (cache, result) => {
                  const ok = result.data?.unfollowUser.ok;
                  if (ok) {
                    cache.modify({
                      id: `User:${id}`,
                      fields: {
                        isFollowing() {
                          return false;
                        },
                        totalFollowers(prev) {
                          return prev - 1;
                        },
                      },
                    });
                  }
                },
              })
            }
          >
            팔로우 취소
          </ProfileBtn>
        );
      else {
        return (
          <ProfileBtn
            onClick={() =>
              followUser({
                update: (cache, result) => {
                  const ok = result.data?.followUser.ok;
                  if (ok) {
                    cache.modify({
                      id: `User:${id}`,
                      fields: {
                        isFollowing() {
                          return true;
                        },
                        totalFollowers(prev) {
                          return prev + 1;
                        },
                      },
                    });
                  }
                },
              })
            }
          >
            팔로잉
          </ProfileBtn>
        );
      }
    }
  };

  return (
    <Layout>
      <PageTitle title={`${name}(@${username}) • Instaclone 사진 및 동영상`} />
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  팔로워 <Value>{data?.seeProfile?.totalFollowers}</Value>
                </span>
              </Item>
              <Item>
                <span>
                  팔로잉 <Value>{data?.seeProfile?.totalFollowings}</Value>
                </span>
              </Item>
              <Item>{getButton()}</Item>
            </List>
          </Row>
          <Row>
            <Name>{data?.seeProfile.name}</Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo) => (
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </Layout>
  );
}

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg: string }>`
  flex: 1 0;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: 'span',
})`
  margin-left: 10px;
  padding: 5px 10px;
`;
