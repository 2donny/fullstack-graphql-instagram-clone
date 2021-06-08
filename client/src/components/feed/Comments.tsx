import styled from 'styled-components';
import Comment from './Comment';
import { useForm } from 'react-hook-form';
import { useCreateCommentMutation } from '../../generated/ApolloComponents';
import { CommentTypes } from '../../shared/types';
import useUser from '../../hooks/useUser';
import { gql } from '@apollo/client';

interface Props {
  author: string;
  caption: string;
  photoId: number;
  commentNumber: number;
  comments: CommentTypes[];
}

export default function Comments({
  author,
  caption,
  photoId,
  commentNumber,
  comments,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const { data: userData } = useUser();
  const { createComment, loading } = useCreateCommentMutation();

  const onSubmitValid = (data: { payload: string }) => {
    if (loading) return null;
    createComment({
      variables: {
        photoId,
        payload: data.payload,
      },
      update: (cache, result) => {
        const { payload } = getValues();
        setValue('payload', '');
        const { ok, id } = result.data?.createComment!;
        if (ok && userData?.me) {
          const newComment = {
            __typename: 'Comment',
            id,
            payload,
            isMine: true,
            createdAt: new Date() + '',
            user: {
              ...userData?.me,
            },
          };
          const newCacheComment = cache.writeFragment({
            fragment: gql`
              fragment BSName on Photo {
                id
                payload
                isMine
                createdAt
                user {
                  id
                  username
                  avatar
                }
              }
            `,
            data: newComment,
          });
          console.log(newCacheComment);
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              comments(prev) {
                return [...prev, newCacheComment];
              },
            },
          });
          // const id = result.data?.createComment.id;
          // cache.modify({
          //   id: `Comment:${id}`,
          //   fields: {

          //   }
          // })
        }
      },
    });
  };

  return (
    <CommentsContainer>
      <Comment username={author} payload={caption} />
      <CommentCount>
        {commentNumber !== 0 ? `댓글 ${commentNumber}개 모두 보기` : null}
      </CommentCount>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          username={comment.user?.username!}
          payload={comment.payload!}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <PostCommentInput
            {...register('payload', {
              required: true,
            })}
            type="text"
            placeholder="댓글 달기.."
          />
          {loading && <p>게시중..</p>}
          <PostCommentButton disabled={!isValid} type="submit">
            게시
          </PostCommentButton>
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 5px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const PostCommentButton = styled.button`
  background-color: #fff;
  border: none;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  &:disabled {
    opacity: 0.3;
  }
`;

const PostCommentInput = styled.input`
  width: 90%;
  height: 18px;
  ::placeholder {
    font-size: 14px;
  }
`;

const CommentsContainer = styled.div`
  margin-top: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const CommentCount = styled.span`
  color: #8e8e8e;
  margin-bottom: 4px;
  display: block;
  font-size: 14px;
  cursor: pointer;
`;
