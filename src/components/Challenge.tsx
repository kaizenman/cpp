import "../styles.css";

import { useState } from 'react';

import Playground from './Playground';
import { challenges, IChallenge } from '../challenges';

const Challenge: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(challenges[0]);

  function handleNextChallenge() {
    setActiveChallenge(challenges[(activeChallenge.id + 1) % challenges.length]);
  }

  return (
    <div className="challenge-placeholder">
      <h1>Try out some challenges</h1>
      <h2>{activeChallenge.title}</h2>
      <div className="challenge"></div>
      <Playground challenge={activeChallenge} />
      <div className="next-challange-placeholder">
        {/* <button>Hint</button>
        <button>Show solution</button> */}
        <button className="next-challenge" onClick={handleNextChallenge}>Next challenge</button>
      </div>
    </div>
  );
};

export default Challenge;
