import * as React from 'react';
import { isLoggedInVar } from '../Apollo';

export interface Props {
}

export default function Home (props: Props) {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </div>
  );
}
