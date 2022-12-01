import "../styles.css";

import { ChangeEvent, useState } from 'react';

interface ISearchProps {
  onSubmit: (query: string) => void;
}

const Search: React.FC<ISearchProps> = ({ onSubmit }: ISearchProps) => {
  const [input, setInput] = useState('');

  function handleInputChange(e: ChangeEvent<HTMLInputElement> | undefined) {
    if (e) {
      setInput(e.target.value);
    }
  }

  return (
    <>
      <div className="search-container">
        <div className="search-input-container">
          <input className="search" 
            placeholder="What do you want to learn?"
            onChange={handleInputChange}
            type="text"
            onKeyDown={ 
              (e) => { 
                if (e.key === 'Enter') onSubmit(input) 
              } 
            } />
        </div>
      </div>
    </>
  );
};

export default Search;
