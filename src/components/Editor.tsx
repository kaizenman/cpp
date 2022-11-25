import "../styles.css";

import { useState } from "react";
import { default as MonacoEditor } from "@monaco-editor/react";
import debounce from "lodash/debounce";

interface IEditorProps {
  onChange: (code: string | undefined) => void;
}

const Editor: React.FC<IEditorProps> = ({ onChange }: IEditorProps) => {
  const [sourceCode, setSourceCode] = useState<string | undefined>("int main() {\n\n}\n");

  return (
    <div className="editor">
      <MonacoEditor
        width={`100%`}
        language="cpp"
        value={sourceCode}
        theme="monokai"
        onChange={debounce((v) => {
          setSourceCode(v);
          console.log("debounce");
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
