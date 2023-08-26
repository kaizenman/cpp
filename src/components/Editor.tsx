import "../styles.css";

import { useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import { IChallenge, Sources } from "../challenges";

interface IEditorProps {
  challenge: IChallenge;
  onChange: (code: Sources | undefined) => void;
}

const Editor: React.FC<IEditorProps> = ({ challenge, onChange }: IEditorProps) => {
  const [fileName, setFileName] = useState<string>(challenge.main);

  // Initialize the state with the content of all files from challenge.sources
  const [filesContent, setFilesContent] = useState(() => {
    const initialContent: Sources = {};
    console.log('here')
    for (const name in challenge.sources) {
      initialContent[name] = {
        name: name,
        language: challenge.sources[name].language,
        value: challenge.sources[name].value,
      };
    }
    return initialContent;
  });

  function handleTabClick(name: string) {
    console.log('handleTabClick', name)
    setFileName(name);
  }

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      // Update the content of the active file in the state
      setFilesContent({
        ...filesContent,
        [fileName]: {
          ...filesContent[fileName],
          value: value,
        },
      });

      onChange(filesContent);
    }
  }

  return (
    <div className="min-h-35em justify-content-stretch w-half">
      <div className="tabs">
        {Object.keys(challenge.sources).map((name) => (
          <button
            key={name}
            onClick={() => handleTabClick(name)}
            className={name === fileName ? 'active-tab' : ''}
          >
            {name}
          </button>
        ))}
      </div>

      <MonacoEditor
        key={fileName} // Remount editor when file name changes
        height="500px"
        language="cpp"
        value={filesContent[fileName].value} // Use content from local state
        theme="monokai"
        onChange={handleEditorChange} // Update on editor change
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
      {/* Rest of your component */}
    </div>
  );
};


export default Editor;
