import styled from 'styled-components';
import type { CommentTypes } from '../../shared/types';
import Comment from './Comment';

interface Props {
  author: string;
  caption: string;
  commentNumber: number;
  comments: CommentTypes[];
}

export default function Comments({
  author,
  caption,
  commentNumber,
  comments,
}: Props) {
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
    </CommentsContainer>
  );
}

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
