import { IChallenge, Sources, Tests, create_main_cpp } from "../challenges";
import { IChapter } from "../components/Learn";

const compose_challenges_n = (n: number, f: (id: number) => IChallenge) => Array.from({ length: n + 1 }, (_, id) => f(id));

const foo_bar_sources: Sources = {
  'foo.h': {
    name: 'foo.h',
    language: 'c++',
    internal: false,
    content: ``
  },
}

const foo_bar_runtime_tests: Tests = {
  sources: {
    'foo_test.h': {
      name: 'foo_test.h',
      language: 'c++',
      internal: false,
      content: `TEST(FakeTest, FakeTest1) {
  EXPECT_EQ(foo(), 1);
}`
    },
    'bar_test.h': {
      name: 'bar_test.h',
      language: 'c++',
      internal: false,
      content: `TEST(FakeTest, FakeTest2) {
  EXPECT_EQ(bar(), 2);
}`
    }
  },
  test_cases: [{test_case: 'FakeTest.FakeTest1', test_suite: 'FakeTest'}, 
               {test_case: 'FakeTest.FakeTest2', test_suite: 'FakeTest'}],
  static_asserts: []
}

const foo_bar_compiletime_tests: Tests = {
  sources: {},
  test_cases: [],
  static_asserts: [
    `static_assert(foo() == 1);`,
    `static_assert(bar() == 2);`
  ]
}


const foo_bar_runtime = compose_challenges_n(1, (id) => ({ 
  id,
  title: 'Write a function foo returning 1 and a function bar returning 2.',
  description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
  content: 'This is a fake content for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. And do not read it. It is not worth it. Really. ',
  sources: foo_bar_sources,
  tests: foo_bar_runtime_tests,
}));

const foo_bar_compiletime = compose_challenges_n(1, (id) => ({ 
  id,
  title: 'Write a function foo returning 1 and a function bar returning 2.',
  description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
  content: 'This is a fake content for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. And do not read it. It is not worth it. Really. ',
  sources: foo_bar_sources,
  tests: foo_bar_compiletime_tests,
}));


export const generic_programming: IChapter = {
  id: 0,
  title: 'Templates',
  subChapters: [
    { 
      id: '0',
      title: 'Fake chapter. Will be removed.',
      description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
      content: 'This is a fake content for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. And do not read it. It is not worth it. Really. ',
      challenges: foo_bar_runtime,
    },
    {
      id: '1',
      title: 'Fake chapter 2. Will be removed.',
      description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
      content: 'This is a fake content for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. And do not read it. It is not worth it. Really. ',
      challenges: foo_bar_compiletime,
    }
  ]
}
   