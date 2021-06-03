import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const SInput = styled.input`
  background-color: rgb(250, 250, 250);
  padding: 7px 10px;
  border-radius: 3px;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  width: 100%;
  box-sizing: border-box;
  &::placeholder {
      font-size: 12px;
  }
  & + & {
      margin-top: 10px;
  } 
`;

export default function Input(props: Props) {
  return <SInput {...props} />;
}
