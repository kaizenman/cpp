import "../styles.css";

import { useState } from 'react';

import Playground from './Playground';
import { test } from '../challenges/foo';

const Challenge: React.FC = () => {
  const [challenge, setChallenge] = useState(test);

  return (
    <div className="challenge-placeholder">
      <div className="challenge"></div>
      <Playground challenge={challenge} />
    </div>
  );
};

export default Challenge;
