import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';
import { FatText } from '../shared';

interface Props {
  username: string;
  payload: string;
}

export default function Comment({ username, payload }: Props) {
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[ㄱ-ㅎㅏ-ㅣ가-힣]+/g, '<mark>$&</mark>'), {
        allowedTags: ['mark']
    }
  );

  return (
    <CommentContainer>
      <FatText>{username}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
}

export const CommentContainer = styled.div`
  margin: 8px 0;
`;
const CommentCaption = styled.span`
  margin-left: 5px;
  mark {
    color: ${(props) => props.theme.accent};
    background-color: inherit;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
