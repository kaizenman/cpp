import "../styles.css";

import { useEffect, useState } from 'react';
import Solver from "./Solver";
// import Search from "./Search";
import { IChallenge } from "../challenges";

interface IPracticeProps {
  theme: string;
  challenges: IChallenge[];
}

const Practice: React.FC<IPracticeProps> = ({theme, challenges}) => {
  // const [chs, setChs] = useState<IChallenge[]>([]);
  const [chs, setChs] = useState<IChallenge[]>(challenges);
  
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
    setChs(chs.filter(challenge => challenge.id !== id));
  }

  return (
    <div className="border border-warning">
      {/* { chs.length === 0 && <Search onSubmit={handleSubmit} />} */}
      { chs.length > 0 && <Solver theme={theme} challenges={chs} onNext={removeChallenge} /> }
    </div>
  );
};

export default Practice;
