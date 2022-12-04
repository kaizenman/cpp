import "../styles.css";

import { default as MonacoEditor } from '@monaco-editor/react';
interface IExecutorProps {
  output: string;
}

const Executor: React.FC<IExecutorProps> = ({ output }: IExecutorProps) => {
  return (
    <div className="w-half whitespace-pre-wrap">
      <MonacoEditor value={output}></MonacoEditor>
    </div>
  );
};

export default Executor;
