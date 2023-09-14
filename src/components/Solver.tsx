import "../styles.css";

import { useEffect, useState } from 'react';

import Playground from './Playground';
import { Challenge, QuizChallenge } from '../challenges';
import { Link } from "react-router-dom";
import { Quiz } from "./Quiz";
import Problem from "./Problem";
import { Button } from "react-bootstrap";

interface ISolverProps {
  theme: string;
  activeChallenge: Challenge;
  challenges: Challenge[],
  onNext: (id: number) => void; 
}

const Solver: React.FC<ISolverProps> = ({theme, activeChallenge, onNext } : ISolverProps) => {
  const [isSolved, setIsSolved] = useState(false);

  const nextBtnVariant = isSolved ? "outline-success" : "secondary";

  function handleNextChallenge() {
    onNext(activeChallenge.id);
    setIsSolved(false);
  }

  function handleSolved(status: boolean) {
    setIsSolved(status);
  }

  return (
    <div className="mt-5">
      <h2 className="mt-2">Try out some challenges</h2>
      <div>{activeChallenge.title}</div>
      <div>{activeChallenge.description}</div>
      <div className="mt-3 border border-secondary rounded-1 border-1">
        { activeChallenge.kind === "quiz" && <Quiz theme={theme} challenge={activeChallenge as QuizChallenge} onSolved={handleSolved} /> }
        { activeChallenge.kind === "source_code" && <Problem theme={theme} challenge={activeChallenge} onSolved={handleSolved} settings={
          {
            compiler: 'g103',
            compilerOptions: ['-std=c++20', '-O3', '-flto', '-pthread'],
            local: false,
          }}/> }
        <div className="mt-5">
          <Button variant="outline-success">Hint</Button>
          <Button variant="outline-success">Show solution</Button>
          <Button variant={nextBtnVariant} disabled={!isSolved} onClick={handleNextChallenge}>Next challenge</Button>
        </div>
        <div className="mt-2">
          <Link to="/cpp">Go to main page</Link>
        </div>

      </div>


    </div>
  );
};

export default Solver;
