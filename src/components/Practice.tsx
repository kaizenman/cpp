import "../styles.css";

import { useEffect, useState } from 'react';
import Solver from "./Solver";
// import Search from "./Search";
import { Challenge } from "../challenges";

interface IPracticeProps {
  theme: string;
  challenges: Challenge[];
}

const Practice: React.FC<IPracticeProps> = ({theme, challenges}) => {
  // const [chs, setChs] = useState<Challenge[]>([]);
  const [chs, setChs] = useState<Challenge[]>(challenges);
  const [activeChallenge, setActiveChallenge] = useState<Challenge>(challenges[0]);


  // const [searchInput, setSearchInput] = useState<string>('');

  // useEffect(() => {
  //   if (searchInput) {
  //     setChs(all_challenges.filter(challenge => challenge.title.includes(searchInput)));
  //   }
  // }, [searchInput]);

  // function handleSubmit(query: string) {
  //   if (query.length > 0)
  //     setSearchInput(query);
  // }

  function removeChallenge(id: number) {
    const newChs = chs.filter(challenge => challenge.id !== id);
    setChs(newChs);
    setActiveChallenge(newChs[0]);
  }

  return (
    <div>
      {/* { chs.length === 0 && <Search onSubmit={handleSubmit} />} */}
      { chs.length > 0 && <Solver theme={theme} activeChallenge={activeChallenge} challenges={chs} onNext={removeChallenge} /> }
    </div>
  );
};

export default Practice;
