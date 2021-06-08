import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';

interface Props {
  username: string;
  payload: string;
}

const hashtagsRegex = /#[ㄱ-ㅎㅏ-ㅣ가-힣]+/g;

export default function Comment({ username, payload }: Props) {
  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaption>
        {payload.split(' ').map((word, index) =>
          hashtagsRegex.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          ),
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export const CommentContainer = styled.div`
  margin: 8px 0;
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
