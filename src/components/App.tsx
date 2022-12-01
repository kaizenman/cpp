import "../styles.css";

import { useEffect, useState } from 'react';
import { challenges as all_challenges, IChallenge } from "../challenges";
import Solver from "./Solver";
import Search from "./Search";

const App: React.FC = () => {
  const [chs, setChs] = useState<IChallenge[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    if (searchInput) {
      setChs(all_challenges.filter(challenge => challenge.title.includes(searchInput)));
    }
  }, [searchInput]);

  function handleSubmit(query: string) {
    if (query.length > 0)
      setSearchInput(query);
  }

  function removeChallenge(id: number) {
    setChs(chs.filter(challenge => challenge.id !== id));
  }

  return (
    <div className="body-placeholder">
      { chs.length === 0 && <Search onSubmit={handleSubmit} />}
      { chs.length > 0 && <Solver challenges={chs} onNext={removeChallenge} /> }
    </div>
  );
};

export default App;
