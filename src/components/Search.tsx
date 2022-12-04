import "../styles.css";

import { ChangeEvent, useState } from 'react';
import { Link } from "react-router-dom";

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
      <div className="flex flex-column w-full">
        <div className="flex flex-row m-top-3em h-2em align-items-stretch justify-content-space-around w-full ">
          <input className="w-30em" 
            placeholder="What do you want to practice?"
            onChange={handleInputChange}
            type="text"
            onKeyDown={ 
              (e) => { 
                if (e.key === 'Enter') onSubmit(input) 
              } 
            } />
        </div>
        <Link to="/">Go to main page</Link>
      </div>
    </>
  );
};

export default Search;
