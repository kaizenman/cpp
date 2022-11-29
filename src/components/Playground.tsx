import "../styles.css";

import { useEffect, useState } from "react";

import Editor from "./Editor";
import Executor from "./Executor";
import { IChallenge } from "../challenges";
import debounce from "lodash/debounce";

const url =
  'https://godbolt.org/api/compiler/gsnapshot/compile?options=-std=c%2B%2B20&-Wall&skipAsm=true&executorRequest=true&filters=execute';

interface IPlaygroundProps {
  challenge: IChallenge;
}

const Playground: React.FC<IPlaygroundProps> = ({ challenge }: IPlaygroundProps) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null | unknown>(null);

  const handleSourceCodeChange = debounce((code: string | undefined) => {
    if (code) {
      const src = code + `
      `
      + challenge.test;
      const fetchData = async () => {
        try {
          // console.log('fetch');
          const res = await fetch(url, {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
            },
            method: 'POST',
            body: src,
          });

          let text = await res.text();
          text = text.replace(/\x1b\[[0-9;]*[mGKHF]/g, '');
          setResponse(text.substring(text.indexOf('\n') + 1));
        } catch (error) {}
      };
      url && fetchData();
    }
  }, 1500);

  return (
    <div className="playground">
      <Editor challenge={challenge} onChange={handleSourceCodeChange} />
      {response && <Executor output={response} /> }
      {/* {compiling && <div>Compiling...</div> } */}
    </div>
  );
};

export default Playground;
