import "../styles.css";

import { useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import debounce from 'lodash/debounce';

interface IEditorProps {
  onChange: (code: string | undefined) => void;
}

const Editor: React.FC<IEditorProps> = ({ onChange }: IEditorProps) => {
  const [sourceCode, setSourceCode] = useState<string | undefined>('');

  useEffect(() => {
    onChange(sourceCode);
  }, []);

  return (
    <div className="editor">
      <MonacoEditor
        width={`100%`}
        language="cpp"
        value={sourceCode}
        theme="monokai"
        onChange={debounce((v) => {
          setSourceCode(v);
          onChange(v);
        }, 2000)}
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
