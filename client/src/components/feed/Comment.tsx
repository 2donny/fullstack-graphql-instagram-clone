import React from 'react';
import styled, { css } from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import { useDeleteCommentMutation } from '../../generated/ApolloComponents';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  commentId?: number;
  photoId?: number;
  isMine?: boolean;
  username: string;
  payload: string;
}

export default function Comment({
  isMine,
  commentId,
  photoId,
  username,
  payload,
}: Props) {
  const { deleteComment } = useDeleteCommentMutation();

  const onDeleteClick = () => {
    const deleteConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!deleteConfirmed) return;

    deleteComment({
      variables: {
        commentId: commentId!,
      },
      update: (cache, result) => {
        const ok = result.data?.deleteComment.ok;
        if (ok) {
          cache.evict({
            id: `Comment:${commentId}`,
          });
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              commentNumber(prev) {
                return prev - 1;
              },
            },
          });
        }
      },
    });
  };

  return (
    <CommentContainer isMine={isMine}>
      <CommentData>
        <Link to={`/users/${username}`}>
          <CommentAuthor>{username}</CommentAuthor>
        </Link>
        <CommentCaption>
          {payload.split(' ').map((word, index) =>
            /#[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word}</React.Fragment>
            ),
          )}
        </CommentCaption>
      </CommentData>
      <CommentAction onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
      </CommentAction>
    </CommentContainer>
  );
}

const CommentAction = styled.div`
  cursor: pointer;
  svg {
    display: none;
    color: #dee2e6;
    &:hover {
      color: #ff6b6b;
    }
  }
`;
export const CommentContainer = styled.div<{ isMine?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  ${(props) =>
    props.isMine &&
    css`
      &:hover {
        ${CommentAction} {
          svg {
            display: inline;
          }
        }
      }
    `}
`;

const CommentData = styled.div`
  width: 100%;
  a {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CommentAuthor = styled(FatText)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentCaption = styled.span`
  margin-left: 5px;
  a {
    color: ${(props) => props.theme.accent};
    background-color: inherit;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
