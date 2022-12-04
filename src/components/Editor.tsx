import "../styles.css";

import { useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import { IChallenge } from "../challenges";

interface IEditorProps {
  challenge: IChallenge;
  onChange: (code: string | undefined) => void;
}


const Editor: React.FC<IEditorProps> = ({challenge, onChange }: IEditorProps) => {
  const [code, setCode] = useState(challenge.code);

  useEffect(() => {
    console.log('next challenge');
    setCode(challenge.code);
  }, [challenge]);

  function handleChange(src: string | undefined) {
    if (src) {
      setCode(src);
    }

    onChange(src);
  }

  return (
    <div className="min-h-35em justify-content-stretch w-half">
      <MonacoEditor
        width={`100%`}
        language="cpp"
        value={code}
        defaultValue=""
        theme="monokai"
        onChange={handleChange}
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
