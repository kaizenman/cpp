import "../styles.css";

import { useState } from "react";

import Editor from "./Editor";
import Executor from "./Executor";

const url = "https://godbolt.org/api/compiler/gsnapshot/compile?options=-Wall";

const Playground: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null | unknown>(null);
  const [fetchCount, setFetchCount] = useState(0);

  function handleSourceCodeChange(code: string | undefined) {
    if (!code) return;
    const fetchData = async () => {
      setFetchCount((c) => c + 1);
      try {
        const res = await fetch(url, { method: "POST", body: code });
        const text = await res.text();
        setResponse(text.substring(text.indexOf("\n") + 1));
      } catch (error) {
        // setError(error);
      }
    };
    url && fetchData();
  }

  return (
    <div className="playground">
      <Editor onChange={handleSourceCodeChange} />
      {response && <Executor output={response} />}
      {/* <h1>{fetchCount}</h1> */}
    </div>
  );
};

export default Playground;
