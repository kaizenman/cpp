import '../styles.css';

import { useEffect, useState } from 'react';

import Editor from './Editor';
import Executor from './Executor';
import { IChallenge } from '../challenges';
import debounce from 'lodash/debounce';
import { execute_only } from '../utils/godbolt_url_builder';

interface IPlaygroundProps {
  challenge: IChallenge;
  onSolved: (solved: boolean) => void;
}

const Playground: React.FC<IPlaygroundProps> = ({ challenge, onSolved }: IPlaygroundProps) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null | unknown>(null);
  const debounceDelay = 1500;

  useEffect(() => {
    setResponse(null);
  }, [challenge]);

  const handleSourceCodeChange = debounce((code: string | undefined) => {
    if (code) {
      fetch(execute_only(['std=c++20', '-Wall']), {
        method: 'POST',
        body: `${code}\n${challenge.test}`,
      })
        .then((res) => res.text())
        .then((text) => text.replace(/\x1b\[[0-9;]*[mGKHF]/g, ''))
        .then((text) => {
          onSolved(text.includes('# Execution result with exit code 0'));
          setResponse(text.substring(text.indexOf('\n') + 1));
        })
        .catch((error) => setError(error));
    }
  }, debounceDelay);

  return (
    <div className="playground">
      <Editor challenge={challenge} onChange={handleSourceCodeChange} />
      {response && <Executor output={response} />}
      {error && <div>Internal error...</div>}
    </div>
  );
};

export default Playground;
