import { Sources } from "../challenges";

function formatUrl(str: string): string {
  str = str.replace(/[+]/g, '%2B');
  return str;
}

// Define interfaces for complex objects

export type Request = [input: RequestInfo | URL, init?: RequestInit | undefined];

interface CompilerOptions {
  userArguments: string;
  executeParameters: {
      args: string;
      stdin: string;
  };
  compilerOptions: {
      executorRequest: boolean;
      skipAsm: boolean;
      overrides: any[];
      cmakeArgs: string;
      customOutputFilename: string;
  };
  filters: {
      execute: boolean;
  };
  tools: any[];
  libraries: Array<{ id: string; version: string }>;
}

export interface SourceFile {
  filename: string;
  contents: string;
}

// function find_cpp_files(sources: Sources): SourceFile[] {
//   return Object.keys(sources)
//     .filter((key) => { return sources[key].language === 'c++' && key.endsWith('.cpp'); })
//     .map((key) => { return { filename: key, contents: sources[key].value, };});
// }

export function build_execute_cmake_request(sources: Sources, compilerOptions?: string[]) : Request  {

  const files: SourceFile[] = Object.keys(sources).map((key) => { return { filename: key, contents: sources[key].value, };});
  const user_arguments = '-std=c++20 -O3 -flto';
  const execute_parameters = {
    args: 'resources/hello.txt',
    stdin: ''
  };
  const cmake_args = '-DCMAKE_BUILD_TYPE=RelWithDebInfo';
  const cmake_file: SourceFile = {
    filename: 'CMakeLists.txt',
    contents: `project(shapes)
  
    cmake_minimum_required(VERSION 3.5)
    
    add_executable(the_executable
        io.cpp
        main.cpp)
    
    target_link_libraries(the_executable
        fmtd)
    `
  };

  // Define the headers
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json, text/javascript, */*; q=0.01");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("cookie", "privacy_status=dcc79570ddaf4bd8");
  myHeaders.append("x-requested-with", "XMLHttpRequest");


  // Define the request body
  const requestBody: {
    source: string;
    compiler: string;
    options: CompilerOptions;
    lang: string;
    files: SourceFile[];
    allowStoreCodeDebug: boolean;
  } = {
    source: cmake_file.contents,
    compiler: "g112",
    options: {
      userArguments: user_arguments,
      executeParameters: execute_parameters,
      compilerOptions: {
        executorRequest: true,
        skipAsm: true,
        overrides: [],
        cmakeArgs: cmake_args,
        customOutputFilename: "the_executable"
      },
      filters: {
        execute: true
      },
      tools: [],
      libraries: [
        {
          id: "fmt",
          version: "713"
        }
      ]
    },
    lang: "c++",
    files: files,
    allowStoreCodeDebug: true
  };
  
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(requestBody),
    redirect: 'follow'
  };
  
   return ['https://godbolt.org/api/compiler/g103/cmake', requestOptions];
}


export function execute_only(compilerOptions?: string[]) {
  // let result = 'http://localhost:10240/api/compiler/g11/compile'; // g++ 11.x
  
  // cmake
  let result = 'http://localhost:10240/api/compiler/g11/cmake';
  
  // let result = 'https://godbolt.org/api/compiler/gsnapshot/compile';
  if (compilerOptions) {
    // result += `?options=${compilerOptions.map(option => `-${option}&`).join()}`;
  }

  // result += 'skipAsm=true&executorRequest=true&filters=execute';
  result = formatUrl(result);
  console.log(result);
  return result;
}