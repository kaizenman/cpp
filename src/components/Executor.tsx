import { wrap } from "lodash";
import "../styles.css";

import { default as MonacoEditor } from '@monaco-editor/react';
import { useEffect, useState } from "react";
interface IExecutorProps {
  theme: string;
  output: string;
}

const Executor: React.FC<IExecutorProps> = ({theme, output }: IExecutorProps) => {   
  
  const [monacoTheme, setMonacoTheme] = useState<string>('vs-dark');

  console.log('Theme: ', theme)

  useEffect(() => {
    console.log('here')
    setMonacoTheme(theme === 'light' ? 'vs-light' : 'vs-dark');
  }, [theme])

  return (
    <div>
      <MonacoEditor height="500px" value={output} theme={monacoTheme} options={{wordWrap: "on"}}></MonacoEditor>
    </div>
  );
};

export default Executor;
