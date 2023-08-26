import '../styles.css';

import { useEffect, useState } from 'react';

import Editor from './Editor';
import Executor from './Executor';
import { IChallenge, Sources } from '../challenges';
import debounce from 'lodash/debounce';
import { build_execute_cmake_request } from '../utils/godbolt_url_builder';

interface ICompilerSettings {
  compiler: string;
  compilerOptions: string[];
  local: boolean;
}

interface IPlaygroundProps {
  challenge: IChallenge;
  onSolved: (solved: boolean) => void;
  settings: ICompilerSettings;
}

const Playground: React.FC<IPlaygroundProps> = ({ challenge, onSolved, settings}: IPlaygroundProps) => {
  const [response, setResponse] = useState<string | null>('');
  const [error, setError] = useState<string | null | unknown>(null);
  const debounceDelay = 1500;

  useEffect(() => {
    setResponse(null);
  }, [challenge]);
  
  const handleSourceCodeChange = debounce((sources: Sources | undefined) => {
    if (sources) {
      const [request, options] = build_execute_cmake_request(sources,
                                                             settings.compiler,
                                                             settings.compilerOptions,
                                                             settings.local);
      fetch(request, options)
        .then(response => response.text())
        .then((text) => {
          const parsedData = JSON.parse(text);
          onSolved(parsedData.buildsteps.every((step: any) => step.code == 0));
          setResponse(parsedData.buildsteps
            .flatMap((step: any) => step.stderr.length > 0 ? step.stderr : step.stdout)
            .map((output: any) => output.text)
            .join('\n')
            .replace(/\x1B[@-_][0-?]*[ -/]*[@-~]/g, ""));
        })
        .catch((error) => setError(error));
    }
  }, debounceDelay);

  return (
    <div className="flex flex-row">
      <Editor challenge={challenge} onChange={handleSourceCodeChange} />
      {response && <Executor output={response} />}
      {error && <div>Internal error...</div>}
    </div>
  );
};

export default Playground;
