import {
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FatText } from '../../components/shared';
import { PhotoTypes } from '../../shared/types';
import { Link } from 'react-router-dom';
import { useToggleLikePhotoMutation } from '../../generated/ApolloComponents';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import Comments from './Comments';

type Props = Partial<PhotoTypes>;

export default function Photo({
  id,
  user,
  file,
  caption,
  isLiked,
  likes,
  commentNumber,
  comments,
}: Props) {
  const toggleLike = useToggleLikePhotoMutation();
  const toggleLikeOptions = {
    variables: { id: id! },
    update: (cache: any) => {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            if (isLiked) return prev - 1;
            else return prev + 1;
          },
        },
      });
    },
  };
  return (
    <PhotoContainer>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar lg url={user?.avatar} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile onClick={() => toggleLike(toggleLikeOptions)} src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction>
              <FontAwesomeIcon
                onClick={() => toggleLike(toggleLikeOptions)}
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes !== 0 && `좋아요 ${likes}개`}</Likes>
        <Comments
          author={user?.username!}
          caption={caption!}
          photoId={id!}
          commentNumber={commentNumber!}
          comments={comments!}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

const PhotoContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.borderColor};
  max-width: 615px;
  margin: 20px auto 60px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
  a {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;
const PhotoFile = styled.img`
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;
