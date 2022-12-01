import "../styles.css";

import { useState } from 'react';

import Playground from './Playground';
import { IChallenge } from '../challenges';

interface ISolverProps {
  challenges: IChallenge[],
  onNext: (id: number) => void; 
}

const Solver: React.FC<ISolverProps> = ({ challenges, onNext } : ISolverProps) => {
  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(challenges[0]);
  const [isSolved, setIsSolved] = useState(false);

  function handleNextChallenge() {
    setIsSolved(false);
    const nextIndex = challenges.indexOf(activeChallenge) + 1;
    onNext(activeChallenge.id);
    if (nextIndex < challenges.length) {
      setActiveChallenge(challenges[(activeChallenge.id + 1) % challenges.length]);
    }
  }

  function handleSolved(status: boolean) {
    setIsSolved(status);
  }

  return (
    <div className="challenge-placeholder">
      <h1>Try out some challenges</h1>
      <h2>{activeChallenge.title}</h2>
      <div className="challenge"></div>
      <Playground challenge={activeChallenge} onSolved={handleSolved} />
      <div className="next-challange-placeholder">
        {/* <button>Hint</button>
        <button>Show solution</button> */}
        <button className="next-challenge" disabled={!isSolved} onClick={handleNextChallenge}>Next challenge</button>
      </div>
    </div>
  );
};

export default Solver;
