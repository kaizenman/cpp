import "../styles.css";

import { useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import { IChallenge, Sources } from "../challenges";

interface IEditorProps {
  challenge: IChallenge;
  onChange: (code: string | undefined) => void;
}


const Editor: React.FC<IEditorProps> = ({ challenge, onChange }: IEditorProps) => {
  const [fileName, setFileName] = useState('main.cpp');
  const file = challenge.sources[fileName];

  const [code, setCode] = useState(file?.value || '');

  useEffect(() => {
    if (file) {
      setCode(file.value);
    }
  }, [file]);

  function handleChange(src: string | undefined) {
    if (src) {
      setCode(src);
      onChange(src);
    }
  }

  return (
    <div className="min-h-35em justify-content-stretch w-half">
      <div className="tabs">
        {Object.keys(challenge.sources).map((name) => (
          <button
            key={name}
            onClick={() => setFileName(name)}
            className={name === fileName ? 'active-tab' : ''}
          >
            {name}
          </button>
        ))}
      </div>

      <MonacoEditor        
        height="500px"
        language="cpp"
        value={code}
        theme="monokai"
        onChange={handleChange}
        options={{
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
          wordWrap: 'off',
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
          }
        }}
      />
      {/* Rest of your component */}
    </div>
  );
};


export default Editor;
