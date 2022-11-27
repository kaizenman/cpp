import "../styles.css";

import { useState } from 'react';

import Playground from './Playground';
import { IChallenge } from '../challenges';

interface IChallengeProps {
  activeChallenge: IChallenge;
}

const Challenge: React.FC<IChallengeProps> = ({activeChallenge}: IChallengeProps) => {
  return (
    <div className="challenge-placeholder">
      <h1>{activeChallenge.title}</h1>
      <h2>{activeChallenge.description}</h2>
      <div className="challenge"></div>
      <Playground challenge={activeChallenge} />
    </div>
  );
};

export default Challenge;
