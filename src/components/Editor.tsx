import "../styles.css";

import { useContext, useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import { IChallenge, Sources } from "../challenges";
import { ThemeContext } from "../contexts/ThemeContext";
import { set } from "lodash";
import context from "react-bootstrap/esm/AccordionContext";

interface IEditorProps {
  theme: string;
  fileName: string;
  challenge: IChallenge;
  onChange: (code: Sources | undefined) => void;
}

const Editor: React.FC<IEditorProps> = ({theme, fileName, challenge, onChange }: IEditorProps) => {
  const [monacoTheme, setMonacoTheme] = useState<string>('vs-dark');

  console.log('Theme: ', theme)

  useEffect(() => {
    console.log('here')
    setMonacoTheme(theme === 'light' ? 'vs-light' : 'vs-dark');
  }, [theme])

  // Initialize the state with the content of all files from challenge.sources
  const [filesContent, setFilesContent] = useState(() => {
    const initialContent: Sources = {};
    console.log('here')
    for (const name in challenge.sources) {
      initialContent[name] = {
        name: name,
        language: challenge.sources[name].language,
        content: challenge.sources[name].content,
        internal: challenge.sources[name].internal,
      };
    }
    return initialContent;
  });



  function handleEditorChange(content: string | undefined) {
    if (content !== undefined) {
      // Update the content of the active file in the state
      const newFilesContent = {
        ...filesContent,
        [fileName]: {
          ...filesContent[fileName],
          content: content,
        },
      };

      setFilesContent(newFilesContent);
      onChange(newFilesContent);
    }
  }

  return (
    <div className="w-100">
      <div>
        <MonacoEditor
            // beforeMount={setEditorTheme}
            key={fileName} // Remount editor when file name changes
            height="500px"
            language="cpp"
            value={filesContent[fileName].content} // Use content from local state
            theme={monacoTheme}
            onChange={handleEditorChange} // Update on editor change
            options={{
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
              roundedSelection: true,
              scrollbar: {
                vertical: 'hidden',
              }
            }}
          />
      </div>


      
      {/* Rest of your component */}
    </div>
  );
};


export default Editor;
