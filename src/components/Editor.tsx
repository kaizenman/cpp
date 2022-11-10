import React, { useRef, useEffect, useState } from "react";
import * as monaco from "monaco-editor";

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === "json") {
      return "./json.worker.bundle.js";
    }
    if (label === "css" || label === "scss" || label === "less") {
      return "./css.worker.bundle.js";
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return "./html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "./ts.worker.bundle.js";
    }
    return "./editor.worker.bundle.js";
  },
};

export const Editor: React.FC = () => {
  const divEl = useRef<HTMLDivElement>(null);
  let editor: monaco.editor.IStandaloneCodeEditor;

  const code = ["#include <iostream>", "", "int main()", "{", '\tstd::cout << "Hello, world";', "}"].join("\n");

  useEffect(() => {
    if (divEl.current) {
      editor = monaco.editor.create(divEl.current, {
        value: code,
        language: "cpp",
      });
    }
    return () => {
      editor.dispose();
    };
  }, []);

  return <div className="Editor" ref={divEl}></div>;
};
