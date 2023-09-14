import { QuizChallenge, SourceCodeChallenge } from "../../../challenges"

export const QUIZ_13_1_1: QuizChallenge = {
  id: 0,
  kind: "quiz",
  title: "Templates",
  description: "Test quiz challenge description",
  question: "Which of the following best describes what a template can define in C++?",
  answers: [
    "A family of variables or an alias for a single type.",
    "A family of classes, functions, variables, or a concept.",
    "A singular class or function that can take multiple data types.",
    "A specific type of function that can only take predefined data types.",
    "A namespace that contains multiple classes and functions."
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 1
}

export const QUIZ_13_1_2: QuizChallenge = {
  id: 1,
  kind: "quiz",
  title: "Templates",
  description: "Test quiz challenge description",
  question: "Which of the following is NOT a valid operation that a template declaration can perform according to the C++ standard?",
  answers: [
    "Declare or define a function, class, or variable.",
    "Define a member function of a class that isn't part of a template.",
    "Define a member template of a class or class template.",
    "Act as a deduction guide.",
    "Serve as an alias declaration."
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 1
}

export const QUIZ_13_1_3: QuizChallenge = {
  id: 2,
  kind: "quiz",
  title: "Templates",
  description: "Test quiz challenge description",
  question: "Which of the following statements is true regarding templates and variable templates in C++?",
  answers: [
    "A template declaration is not a type of declaration.",
    "A declaration introduced by a template declaration of a function is called a variable template.",
    "A variable template at class scope cannot be a static data member.",
    "Variable templates can hold constant values like pi, which can then be used in function templates."
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 3
}

export const SOURCE_13_1_3: SourceCodeChallenge = {
  id: 3,
  kind: "source_code",
  title: "Variable templates",
  description: "Problem Statement: Define a variable template for the Euler number e (approximately 2.71828). Then, create a function template that computes e^x for any given x.",
  hint: "Hint: Think about how the pi variable template was defined. How can you adapt that to define the Euler number?",
  sources: {
    "euler.h": {
      name: "euler.h",
      language: "cpp",
      internal: false,
      content: ``
    }
  },
  tests: {
    sources: {
      "euler_test.h": {
        name: "euler_test.h",
        language: "cpp",
        internal: true,
        content: 
`#include "euler.h"
#include <type_traits>

// Test if 'euler' is correctly implemented as a variable template
TEST(TemplateTest, EulerIsVariableTemplate) {
    // todo: teset if it is a variable template
    // static_assert(is_template<euler>(), "'euler' is not a variable template");
    EXPECT_NEAR(euler<double>, 2.71828, 0.00001);
    EXPECT_NEAR(euler<float>, 2.71828f, 0.00001);
}

// Test if 'exponent_e' is correctly implemented as a function template
TEST(TemplateTest, ExponentFunction) {
    EXPECT_NEAR(exponent_e<double>(1.0), 2.71828, 0.00001);
    EXPECT_NEAR(exponent_e<float>(1.0f), 2.71828f, 0.00001);
} 
`
      }
    },
    test_cases: [
      {test_case: "TemplateTest.EulerIsVariableTemplate", test_suite: "TemplateTest"},
      {test_case: "TemplateTest.ExponentFunction", test_suite: "TemplateTest"}],
    static_asserts: []
  },
  solution: {
    "euler.h": {
      name: "euler.h",
      language: "cpp",
      internal: false,
      content:
`#include <cmath>
template<class T>
constexpr T euler = T(2.71828182845904523536);

template<class T>
T exponent_e(T x) {
    return pow(euler<T>, x);
}
`
    }
  }
}

export const QUIZ_13_1_4: QuizChallenge = {
  id: 4,
  kind: "quiz",
  title: "Templates",
  description: "Test quiz challenge description",
  question: "Which of the following statements is true regarding the placement and types of template declarations in C++?",
  answers: [
    "A template declaration can appear both as a local scope and a namespace scope declaration.",
    "In a function template declaration, the last component of the declarator id can be a template id.",
    "A class template declaration that uses a simple template id declares a class template partial specialization.",
    "A template declaration can be an export declaration."
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 2
}

export const SOURCE_13_1_4: SourceCodeChallenge = {
  id: 5,
  kind: "source_code",
  title: "Template declarations",
  description: "Problem Statement: Create a function template called add that adds two numbers. However, remember the rule about the last component of the declarator id in function template declarations. Also, create a class template called Box with a single type parameter, and create a partial specialization of this class for pointers.",
  hint: "Remember the note's details about what the last component of a function template declarator id can be.",
  sources: {
    "add.h": {
      name: "add.h",
      language: "cpp",
      internal: false,
      content: ``
    }
  },
  tests: {
    sources: {
      "add_test.h": {
        name: "add_test.h",
        language: "cpp",
        internal: true,
        content:
`#include "add.h"

TEST(AddFunctionTest, AddIntegers) {
  ASSERT_EQ(add(5, 3), 8);
  ASSERT_EQ(add(-5, 3), -2);
}

TEST(AddFunctionTest, AddDoubles) {
  ASSERT_DOUBLE_EQ(add(5.5, 3.5), 9.0);
  ASSERT_DOUBLE_EQ(add(-5.5, 3.5), -2.0);
}

TEST(BoxClassTest, StoreIntegers) {
  Box<int> intBox(10);
  ASSERT_EQ(intBox.getValue(), 10);
}

TEST(BoxClassTest, StoreDoubles) {
  Box<double> doubleBox(10.5);
  ASSERT_DOUBLE_EQ(doubleBox.getValue(), 10.5);
}

TEST(BoxClassSpecializationTest, StoreIntPointer) {
  int x = 10;
  Box<int*> intPtrBox(&x);
  ASSERT_EQ(*intPtrBox.getValue(), 10);
}
`
},
    },
    test_cases: [
      {test_case: "AddFunctionTest.AddIntegers", test_suite: "AddFunctionTest"},
      {test_case: "AddFunctionTest.AddDoubles", test_suite: "AddFunctionTest"},
      {test_case: "BoxClassTest.StoreIntegers", test_suite: "BoxClassTest"},
      {test_case: "BoxClassTest.StoreDoubles", test_suite: "BoxClassTest"},
      {test_case: "BoxClassSpecializationTest.StoreIntPointer", test_suite: "BoxClassSpecializationTest"}
    ],
    static_asserts: [],
  },
  solution: {
    "add.h": {
      name: "add.h",
      language: "cpp",
      internal: false,
      content:
`// Function template
template<typename T>
T add(T a, T b) {
    return a + b;
}

// Class template
template<typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T getValue() const { return value; }
};

// Partial specialization for pointers
template<typename T>
class Box<T*> {
    T* value;
public:
    Box(T* v) : value(v) {}
    T* getValue() const { return value; }
};`
    }
  }
}

export const QUIZ_13_1_5: QuizChallenge = {
  id: 6,
  kind: "quiz",
  title: "Templates",
  description: "Test quiz challenge description",
  question: "How many declarators are allowed in the init-declarator-list of a template-declaration, explicit specialization, or explicit instantiation?",
  answers: [
    "No restrictions on the number of declarators.",
    "Two declarators.",
    "One declarator.",
    "Zero declarators, especially for class templates."
  ],
  hints: ["Test hint 1", "Test hint 2", "Test hint 3"],
  correct_answer: 2
}

export const SOURCE_13_1_5: SourceCodeChallenge = {
  id: 7,
  kind: "source_code",
  title: "Template declarations",
  description: "Problem Statement: Create an explicit specialization of a template function named displayType() that prints the type of its argument. The function should handle types int and double differently than other types.",
  hint: "Remember that in explicit specialization, the init-declarator-list should contain at most one declarator.",
  sources: {
    "display_type.h": {
      name: "display_type.h",
      language: "cpp",
      internal: false,
      content: ``
    }
  },
  tests: {
    sources: {
      "display_type_test.h": {
        name: "display_type_test.h",
        language: "cpp",
        internal: true,
        content:
`
#include "display_type.h"


// TEST(DisplayTypeTest, HandlesIntType) {
//     testing::internal::CaptureStdout();
//     displayType(42);
//     std::string output = testing::internal::GetCapturedStdout();
//     ASSERT_EQ(output, "Type is int\n");
// }

// TEST(DisplayTypeTest, HandlesDoubleType) {
//     testing::internal::CaptureStdout();
//     displayType(42.0);
//     std::string output = testing::internal::GetCapturedStdout();
//     ASSERT_EQ(output, "Type is double\n");
// }

// TEST(DisplayTypeTest, HandlesGenericType) {
//     testing::internal::CaptureStdout();
//     displayType("hello");
//     std::string output = testing::internal::GetCapturedStdout();
//     ASSERT_EQ(output, "Generic type\n");
}
`
   },
  },
  test_cases: [
    {test_case: "DisplayTypeTest.HandlesIntType", test_suite: "DisplayTypeTest"},
    {test_case: "DisplayTypeTest.HandlesDoubleType", test_suite: "DisplayTypeTest"},
    {test_case: "DisplayTypeTest.HandlesGenericType", test_suite: "DisplayTypeTest"}
  ],
  static_asserts: [],
  },
  solution: {
    "display_type.h": {
      name: "display_type.h",
      language: "cpp",
      internal: false,
      content:
`#include <iostream>

template <typename T>
void displayType(T value) {
    std::cout << "Generic type" << std::endl;
}

template <>
void displayType<int>(int value) {
    std::cout << "Type is int" << std::endl;
}

template <>
void displayType<double>(double value) {
    std::cout << "Type is double" << std::endl;
}
`
   }
  }
}
