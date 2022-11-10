import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from './components/Editor';
import { Console } from "./components/Console";

ReactDOM.render(
  <React.StrictMode>
    <div className="Container">
      <Editor />
      <Console />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
