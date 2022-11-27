import "../styles.css";

import { useEffect, useState } from "react";

import Editor from "./Editor";
import Executor from "./Executor";
import { IChallenge } from "../challenges";

const url =
  'https://godbolt.org/api/compiler/gsnapshot/compile?options=-std=c%2B%2B20&-Wall&skipAsm=true&executorRequest=true&filters=execute';
const compile_assembly_url = 'https://gotbolt.org/api/compiler/gsnapshot/compile';

interface IPlaygroundProps {
  challenge: IChallenge;
}

const Playground: React.FC<IPlaygroundProps> = ({ challenge }: IPlaygroundProps) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null | unknown>(null);

  function handleSourceCodeChange(code: string | undefined) {
    if (code) {
      // code += 'int main() {\n\n}\n';
      code += challenge.test;

      console.log(code);

      // console.log('fetch');

      const fetchData = async () => {
        try {
          const res = await fetch(url, {
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
            },
            method: 'POST',
            body: code,
          });

          let text = await res.text();
          text = text.replace(/\x1b\[[0-9;]*[mGKHF]/g, '');
          setResponse(text.substring(text.indexOf('\n') + 1));
        } catch (error) {}
      };
      url && fetchData();
    }
  }

  return (
    <div className="playground">
      <Editor challenge={challenge.test} onChange={handleSourceCodeChange} />
      {response && <Executor output={response} /> }
    </div>
  );
};

export default Playground;
