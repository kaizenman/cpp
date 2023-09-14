import '../styles.css';

import { useEffect, useState } from 'react';

import Editor from './Editor';
import Executor from './Executor';
import { SourceCodeChallenge, Sources } from '../challenges';
import debounce from 'lodash/debounce';
import { build_execute_cmake_request } from '../utils/godbolt_url_builder';
import { Button } from 'react-bootstrap';

interface ICompilerSettings {
  compiler: string;
  compilerOptions: string[];
  local: boolean;
}

interface IProblemProps {
  theme: string;
  challenge: SourceCodeChallenge;
  onSolved: (solved: boolean) => void;
  settings: ICompilerSettings;
}

const Playground: React.FC<IProblemProps> = ({ theme, challenge, onSolved, settings }: IProblemProps) => {
  const [response, setResponse] = useState<string | null>('');
  const [error, setError] = useState<string | null | unknown>(null);
  const [fileName, setFileName] = useState<string>(challenge.sources[Object.keys(challenge.sources)[0]].name);

  const debounceDelay = 1500;

  useEffect(() => {
    setResponse(null);
  }, [challenge]);

  function handleTabClick(name: string) {
    console.log('handleTabClick', name);
    setFileName(name);
  }

  const handleSourceCodeChange = debounce((sources: Sources | undefined) => {
    if (sources) {
      console.log(sources);

      const [request, options] = build_execute_cmake_request(
        sources, // except main.cpp
        challenge.tests,
        settings.compiler,
        settings.compilerOptions,
        settings.local
      );
      fetch(request, options)
        .then((response) => response.text())
        .then((text) => {
          const parsedData = JSON.parse(text);

          if (parsedData.execResult) {
            if (parsedData.execResult.stderr.length == 0) {
              setResponse('Nice ✅');
              onSolved(parsedData.buildsteps.every((step: any) => step.code == 0));
            } else { 
              // build error (but not test error)
              setResponse(parsedData.execResult.stdout.map((output: any) => output.text).join('\n'));
            }
          } else {
            const stdout = parsedData.buildsteps.flatMap((step: any) => step.stdout);
            const stderr = parsedData.buildsteps.flatMap((step: any) => step.stderr);
            const out = stdout.concat(stderr);

            setResponse(
              out
                .map((output: any) => output.text)
                .join('\n')
                .replace(/\x1B[@-_][0-?]*[ -/]*[@-~]/g, '')
            );
          }
        })
        .catch((error) => setError(error));
    }
  }, debounceDelay);

  return (     
    <div>
      <div className="border-bottom border-1 border-secondary">
        <div className="m-1 btn-group" role="group">
          {Object.keys(challenge.sources).map((name) => (
            challenge.sources[name].internal === false &&
            <button type="button" key={name} onClick={() => handleTabClick(name)} className={name === fileName ? 'btn btn-outline-secondary active' : 'btn btn-outline-secondary'}>
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className="d-flex flex-row flex-nowrap align-items-stretch">
        <div className={response ? 'w-50' : 'w-100'}>
          <Editor theme={theme} fileName={fileName} challenge={challenge} onChange={handleSourceCodeChange} />
        </div>
        {response && (
          <div className="w-50">
            {' '}
            <Executor theme={theme} output={response} />{' '}
          </div>
        )}
        {error && <div>Internal error...</div>}
      </div>
    </div>
  );
};

export default Playground;


