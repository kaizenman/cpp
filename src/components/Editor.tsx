import "../styles.css";

import { useContext, useEffect, useState } from 'react';
import { default as MonacoEditor } from '@monaco-editor/react';
import { IChallenge, Sources } from "../challenges";
import { ThemeContext } from "../contexts/ThemeContext";
import { set } from "lodash";
import context from "react-bootstrap/esm/AccordionContext";

interface IEditorProps {
  theme: string;
  challenge: IChallenge;
  onChange: (code: Sources | undefined) => void;
}

const Editor: React.FC<IEditorProps> = ({theme, challenge, onChange }: IEditorProps) => {
  const [fileName, setFileName] = useState<string>(challenge.main);
  const [monacoTheme, setMonacoTheme] = useState<string>('vs-dark');

  console.log('Theme: ', theme)

  useEffect(() => {
    console.log('here')
    setMonacoTheme(theme === 'light' ? 'vs-light' : 'vs-dark');
  }, [theme])

  // function setEditorTheme(monaco: any) {
  //   console.log('setEditorTheme')

  //   monaco.editor.setTheme('vs-dark')

  //   // monaco.editor.defineTheme('onedark', {
  //     // base: 'vs-dark',
  //     // inherit: true,
  //     // rules: [
  //     //   {
  //     //     token: 'comment',
  //     //     foreground: '#5d7988',
  //     //     fontStyle: 'italic'
  //     //   },
  //     //   { token: 'constant', foreground: '#e06c75' }
  //     // ],
  //     // colors: {
  //     //   'editor.background': '#21252b'
  //     // }
  //   // });
  // }  



  // useEffect(() => {
  //   setMonacoTheme(theme === 'light' ? 'vs-light' : 'vs-dark');
  // }, [theme])

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
    <div className="w-100">

      <div>
        <MonacoEditor
            // beforeMount={setEditorTheme}
            key={fileName} // Remount editor when file name changes
            height="500px"
            language="cpp"
            value={filesContent[fileName].value} // Use content from local state
            theme={monacoTheme}
            onChange={handleEditorChange} // Update on editor change
            options={{
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
            }}
          />
      </div>

      <div className="h-20">
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
      
      {/* Rest of your component */}
    </div>
  );
};


export default Editor;
