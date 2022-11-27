import "../styles.css";

import { useState } from "react";

import Editor from "./Editor";
import Executor from "./Executor";

const url =
  'https://godbolt.org/api/compiler/gsnapshot/compile?options=-Wall&skipAsm=true&executorRequest=true&filters=execute';
const compile_assembly_url = 'https://gotbolt.org/api/compiler/gsnapshot/compile';

interface IPlaygroundProps {
  challenge: string;
}

function encode_utf8(s: any) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s: any) {
  return decodeURIComponent(escape(s));
}

var regex = /[^\u0000-\u00ff]/; // Small performance gain from pre-compiling the regex
function containsDoubleByte(str: string) {
  if (!str.length) return false;
  if (str.charCodeAt(0) > 255) return true;
  return regex.test(str);
}

const Playground: React.FC<IPlaygroundProps> = ({ challenge }: IPlaygroundProps) => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null | unknown>(null);

  function handleSourceCodeChange(code: string | undefined) {
    if (code) {
      code += 'int main() {\n\n}\n';
      code += challenge;

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
      <Editor onChange={handleSourceCodeChange} />
      <Executor output={response!} />
    </div>
  );
};

export default Playground;
