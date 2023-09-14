import { Challenge, QuizChallenge, SourceCodeChallenge, Sources, Tests, create_main_cpp } from "../challenges";
import { QUIZ_13_1_1, QUIZ_13_1_2, QUIZ_13_1_3, QUIZ_13_1_4, QUIZ_13_1_5, SOURCE_13_1_3, SOURCE_13_1_4, SOURCE_13_1_5 } from "../challenges/13 - templates/13.1 - Preamble/1";
import { IChapter } from "../components/Learn";

const compose_challenges_n = (n: number, f: (id: number) => Challenge) => Array.from({ length: n + 1 }, (_, id) => f(id));


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

const testQuizChallenge: QuizChallenge = {
  id: 0,
  kind: "quiz",
  title: "DFDSFSDFSDFe",
  description: "Test quiz challenge description",
  question: "Test question 1",
  answers: [
    "Test answer 1",
    "Test answer 2",
    "Test answer 3",
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 0
}

const testQuizChallenge2: QuizChallenge = {
  id: 1,
  kind: "quiz",
  title: "TVVVVVVVge",
  description: "Test quiz challenge description",
  question: "Test question 2",
  answers: [
    "Test answer 34",
    "Test answer 2",
    "Test anssdfsdfwer 3",
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 2
}

const testQuizChallenge3: QuizChallenge = {
  id: 2,
  kind: "quiz",
  title: "TDFDSFSDFSDFSDFenge",
  description: "Test quiz challenge description",
  question: "Test question 3",
  answers: [
    "Test ansczcvzvwer 34",
    "Test anadfafaswer 2",
    "Test anssdfsdfwer 3",
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 1
}

const testSourceCodeChallenge1: SourceCodeChallenge = {
  id: 3,
  kind: "source_code",
  title: 'Write a function foo returning 1 and a function bar returning 2.',
  description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
  sources: foo_bar_sources,
  tests: foo_bar_runtime_tests,
}

export const generic_programming: IChapter = {
  id: 0,
  title: 'Templates',
  subChapters: [
    { 
      id: '0',
      title: 'Fake chapter. Will be removed.',
      description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
      content: 'This is a fake content for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. And do not read it. It is not worth it. Really. ',
      challenges: [
        QUIZ_13_1_1,
        QUIZ_13_1_2,
        QUIZ_13_1_3,
        SOURCE_13_1_3,
        QUIZ_13_1_4,
        // SOURCE_13_1_5, - TODO : capture stdout and stdin
      ],
    },
    // {
    //   id: '1',
    //   title: 'Fake chapter 2. Will be removed.',
    //   description: 'This is a fake description for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. ',
    //   content: 'This is a fake content for a fake chapter. It will be removed in the future. So, please, do not pay attention to it. And do not read it. It is not worth it. Really. ',
    //   challenges: foo_bar_compiletime,
    // }
  ]
}
   