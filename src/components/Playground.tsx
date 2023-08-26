import '../styles.css';

import { useEffect, useState } from 'react';

import Editor from './Editor';
import Executor from './Executor';
import { IChallenge, Sources } from '../challenges';
import debounce from 'lodash/debounce';
import { build_execute_cmake_request } from '../utils/godbolt_url_builder';

interface IPlaygroundProps {
  challenge: IChallenge;
  onSolved: (solved: boolean) => void;
}

const Playground: React.FC<IPlaygroundProps> = ({ challenge, onSolved }: IPlaygroundProps) => {
  const [response, setResponse] = useState<string | null>('');
  const [error, setError] = useState<string | null | unknown>(null);
  const debounceDelay = 1500;

  useEffect(() => {
    setResponse(null);
  }, [challenge]);
  
  const handleSourceCodeChange = debounce((sources: Sources | undefined) => {
    if (sources) {
      const [request, options] = build_execute_cmake_request(sources, 'g103', ['-std=c++20', '-O3', '-flto'], false);
      fetch(request, options)
        .then(response => response.text())
        .then((text) => text.replace(/\x1b\[[0-9;]*[mGKHF]/g, ''))
        .then((text) => {
          const parsedData = JSON.parse(text);
          console.log(parsedData);

          const hasNonZeroCode = parsedData.buildsteps.some((step: any) => step.code !== 0);

          if (hasNonZeroCode) {
              console.log("There is a step with a nonzero code value.");
          } else {
              console.log("All steps have a code value of zero.");
          }

          // Extract and concatenate the "text" contents
          const concatenatedText = parsedData.buildsteps
            .flatMap((step: any) => step.stderr.length > 0 ? step.stderr : step.stdout)
            .map((output: any) => output.text)
            .join('\n');

          function removeAnsiEscapeCodes(text: string) {
            return text.replace(/\x1B[@-_][0-?]*[ -/]*[@-~]/g, "");
          }
          
          const cleanedText = removeAnsiEscapeCodes(concatenatedText);

          onSolved(!hasNonZeroCode);
          setResponse(cleanedText);
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
