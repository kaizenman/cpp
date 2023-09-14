import '../styles.css';

import { useEffect, useState } from 'react';

import Editor from './Editor';
import Executor from './Executor';
import { Challenge, QuizChallenge, SourceCodeChallenge, Sources } from '../challenges';
import debounce from 'lodash/debounce';
import { build_execute_cmake_request } from '../utils/godbolt_url_builder';
import Problem from './Problem';
import { Quiz } from './Quiz';

interface ICompilerSettings {
  compiler: string;
  compilerOptions: string[];
  local: boolean;
}

interface IPlaygroundProps {
  theme: string;
  challenge: Challenge;
  onSolved: (solved: boolean) => void;
  settings: ICompilerSettings;
}

const Playground: React.FC<IPlaygroundProps> = ({ theme, challenge, onSolved, settings }: IPlaygroundProps) => {
  return (
    <div>
      <Problem theme={theme} challenge={challenge as SourceCodeChallenge} onSolved={onSolved} settings={settings} />
    </div>
  )
};

export default Playground;
