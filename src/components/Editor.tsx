import "../styles.css";

import { useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import debounce from 'lodash/debounce';
import { IChallenge } from "../challenges";

interface IEditorProps {
  challenge: string;
  onChange: (code: string | undefined) => void;
}

const compilationDelay = 1500;

const Editor: React.FC<IEditorProps> = ({challenge, onChange }: IEditorProps) => {
  const [sourceCode, setSourceCode] = useState<string | undefined>('');

  useEffect(() => {
    console.log('synchronization');
    return () => {
      console.log('cleanup');
    }
  }, [challenge])

  return (
    <div className="editor">
      <MonacoEditor
        width={`100%`}
        language="cpp"
        value={sourceCode}
        defaultValue="namespace kzm {}"
        theme="monokai"
        onChange={debounce((v) => {
          setSourceCode(v);
          onChange(v);
        }, compilationDelay)}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default Editor;
