import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../Apollo';

export interface Props {}

export default function Login(props: Props) {
  return (
    <div>
      <h1>login</h1>
      <button onClick={() => isLoggedInVar(true)}>Login now!</button>
    </div>
  );
}
