import "../styles.css";

import { useState } from 'react';

import Playground from './Playground';
import { IChallenge } from '../challenges';
import { Link } from "react-router-dom";

interface ISolverProps {
  theme: string;
  challenges: IChallenge[],
  onNext: (id: number) => void; 
}

const Solver: React.FC<ISolverProps> = ({theme, challenges, onNext } : ISolverProps) => {
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
    <div className="mt-5">
      <h2 className="mt-2">Try out some challenges</h2>
      {activeChallenge.title}
      <Playground theme={theme} challenge={activeChallenge} onSolved={handleSolved} settings={
        {
          compiler: 'g103',
          compilerOptions: ['-std=c++20', '-O3', '-flto', '-pthread'],
          local: false,
        }}/>
      {/* <div className="mt-5">
        <button>Hint</button>
        <button>Show solution</button>
        <button disabled={!isSolved} onClick={handleNextChallenge}>Next challenge</button>
      </div> */}
      <div className="mt-2">
        <Link to="/cpp">Go to main page</Link>
      </div>
    </div>
  );
};

export default Solver;
