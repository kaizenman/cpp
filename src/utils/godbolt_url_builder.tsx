import { Sources, Tests, create_main_cpp } from '../challenges';

function formatUrl(str: string): string {
  str = str.replace(/[+]/g, '%2B');
  return str;
}

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

export function build_cmakelists_file(sources: Sources, tests: Tests): string {
  // Extract C++ filenames from the sources
  const test_names = tests.test_cases.map((test) => test.test_suite);
  const unique_test_suite_names = Array.from(new Set(tests.test_cases.map((test) => test.test_suite)));

  const cpp_file_names = Object.keys(sources)
    .filter((src: any) => sources[src].language === 'c++' && (src.endsWith('.cpp') || src.endsWith('.h')))
    .map((src: any) => sources[src].name)
    .join('\n');

  const cpp_test_files_names = Object.keys(tests.sources)
    .filter((src: any) => tests.sources[src].language === 'c++' && (src.endsWith('.cpp') || src.endsWith('.h')))
    .map((src: any) => tests.sources[src].name)
    .join('\n');

  const all_files = 'main.cpp\n' + cpp_file_names + '\n' + cpp_test_files_names;

  let testing_section = '';
  let linking_section = '';

  if (unique_test_suite_names.length > 0) {
    testing_section = `
enable_testing()

${unique_test_suite_names.map((testName) => `add_test(NAME ${testName} COMMAND the_executable)`).join('\n')}

add_custom_target(run_tests ALL)

add_custom_command(TARGET run_tests
  POST_BUILD
  COMMAND ./the_executable
  WORKING_DIRECTORY \${CMAKE_BINARY_DIR})
`;

    linking_section += `
  gtest gtest_main`;
  }

  return `
cmake_minimum_required(VERSION 3.5)
project(shapes)

add_executable(the_executable
  ${all_files})

${testing_section}

target_link_libraries(the_executable ${linking_section})

`;
}


export function build_execute_cmake_request(
  sources: Sources,
  tests: Tests,
  compiler: string,
  compilerOptions?: string[],
  local?: boolean
): Request {
  let files: SourceFile[] = Object.keys(sources).map((key) => {
    return { filename: key, contents: sources[key].content };
  });

  let test_files : SourceFile[] = Object.keys(tests.sources).map((key) => {
    return { filename: key, contents: tests.sources[key].content };
  });

  files.push({
    filename: 'main.cpp',
    contents: create_main_cpp(sources, tests),
  });

  files = files.concat(test_files);
  
  // const cpp_file_names = cmake_sources(sources);

  const user_arguments = compilerOptions ? compilerOptions.join(' ') : '';
  const execute_parameters = {
    args: '',
    stdin: '',
  };

  const cmake_args = '-DCMAKE_BUILD_TYPE=RelWithDebInfo';



  // Define the headers
  const myHeaders = new Headers();
  myHeaders.append('content-type', 'application/json');

  // Define the request body
  const requestBody: {
    source: string;
    compiler: string;
    options: CompilerOptions;
    lang: string;
    files: SourceFile[];
    allowStoreCodeDebug: boolean;
  } = {
    source: build_cmakelists_file(sources, tests),
    compiler: compiler,
    options: {
      userArguments: user_arguments,
      executeParameters: execute_parameters,
      compilerOptions: {
        executorRequest: true,
        skipAsm: true,
        overrides: [],
        cmakeArgs: cmake_args,
        customOutputFilename: 'the_executable',
      },
      filters: {
        execute: true,
      },
      tools: [],
      libraries: [
        {
          id: 'googletest',
          version: 'trunk',
        },
      ],
    },
    lang: 'c++',
    files: files,
    allowStoreCodeDebug: true,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(requestBody),
    redirect: 'follow',
  };

  if (local) {
    return ['http://localhost:10240/api/compiler/' + compiler + '/cmake', requestOptions];
  }

  return ['https://godbolt.org/api/compiler/' + compiler + '/cmake', requestOptions];
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
