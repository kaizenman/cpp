import "../styles.css";

import { useState } from 'react';

import Navigator from "./Navigator";
import Challenge from "./Challenge";

import { challenges, IChallenge } from '../challenges';

const App: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState(challenges[0])

  function handleChallengeChanged(challenge: IChallenge) {
    setActiveChallenge(challenge);
  }

  return (
    <div className="body-placeholder">
      <Navigator onChange={handleChallengeChanged}/>
      <Challenge activeChallenge={activeChallenge} />
    </div>
  );
};

export default App;
