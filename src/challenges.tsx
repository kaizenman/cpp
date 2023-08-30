import { add_const } from './challenges/type_traits/lvl1/add_const';
import { add_cv } from './challenges/type_traits/lvl1/add_cv';
import { add_volatile } from './challenges/type_traits/lvl1/add_volatile';
import { conditional } from './challenges/type_traits/lvl1/conditional';
import { dependent_type } from './challenges/type_traits/lvl1/dependent_type';
import { enable_if } from './challenges/type_traits/lvl1/enable_if';
import { integral_constant } from './challenges/type_traits/lvl1/integral_constant';
import { remove_all_extents } from './challenges/type_traits/lvl1/remove_all_extents';
import { remove_const } from './challenges/type_traits/lvl1/remove_const';
import { remove_extent } from './challenges/type_traits/lvl1/remove_extent';

export interface SourceFile {
  name: string;
  language: string;
  content: string;
  internal: boolean;
};

export interface TestCase {
  test_suite: string;
  test_case: string;
};

export type Tests = {
  sources: Sources;
  test_cases: TestCase[];
  static_asserts: string[];
};

export type Sources = {
  [key: string]: SourceFile;
};

export interface IChallenge {
  id: number,
  title: string,
  description: string,
  sources: Sources,
  tests: Tests,
}

export function create_main_cpp(sources : Sources, tests: Tests): string {
  const has_runtime_tests = tests.test_cases.length > 0;
  const has_compiletime_tests = tests.static_asserts.length > 0;
  const header_files = Object.keys(sources).filter((key) => {
    return sources[key].language === 'c++' && (key.endsWith('.h') || key.endsWith('.hpp'));
  });
  const runtime_tests = Object.keys(tests.sources).map((name) => tests.sources[name].content).join('\n');

  let include_gtest_section = '';
  let include_headers_section = '';
  let runtime_tests_section = '';
  let static_asserts_section = '';
  let int_main_section = '';

  if (has_compiletime_tests) {
    static_asserts_section = tests.static_asserts.join('\n');
  }

  if (header_files.length > 0) {
    include_headers_section = header_files.map((header) => `#include "${header}"`).join('\n');
  }


  if (has_runtime_tests) {
    include_gtest_section = `#include "gtest/gtest.h"`;

    runtime_tests_section = runtime_tests;

    int_main_section = 
`int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);

  ${static_asserts_section}

  return RUN_ALL_TESTS();
}`;
  } else {
    int_main_section = 
`int main() {
  ${static_asserts_section}

  return 0;
}`;
  }

  return `${include_gtest_section}

${include_headers_section}

${runtime_tests_section}

${int_main_section}

`
}


//   `



// #include "gtest/gtest.h"

// #include "foo.h"

// TEST(FakeTest, FakeTest1) {
//   EXPECT_EQ(foo(), 1);
// }

// TEST(FakeTest, FakeTest2) {
//   EXPECT_EQ(bar(), 2);
// }

// int main(int argc, char **argv) {
//   ::testing::InitGoogleTest(&argc, argv);
//   return RUN_ALL_TESTS();
// }

//   `
// }



// challenges for stl from scratch
export const challenges : IChallenge[] = [
];
