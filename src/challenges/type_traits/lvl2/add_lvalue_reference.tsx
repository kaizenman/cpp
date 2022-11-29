export const add_lvalue_reference = `#include <type_traits>

template <class T, class U>
void test_add_lvalue_reference()
{
    std::is_same_v<U, add_lvalue_reference_t<T>>;
}

template <class F>
void test_function0()
{
    std::is_same_v<F&, add_lvalue_reference_t<F>>;
}

template <class F>
void test_function1()
{
    std::is_same_v<F, add_lvalue_reference_t<F>>;
}

struct Foo {};

int main(int, char**)
{
    test_add_lvalue_reference<void, void>();
    test_add_lvalue_reference<int, int&>();
    test_add_lvalue_reference<int[3], int(&)[3]>();
    test_add_lvalue_reference<int&, int&>();
    test_add_lvalue_reference<const int&, const int&>();
    test_add_lvalue_reference<int*, int*&>();
    test_add_lvalue_reference<const int*, const int*&>();
    test_add_lvalue_reference<Foo, Foo&>();

    test_function0<void()>();
    test_function1<void() const>();
    test_function1<void() &>();
    test_function1<void() &&>();
    test_function1<void() const &>();
    test_function1<void() const &&>();

    test_function0<void (Foo::*)()>();
    test_function0<void (Foo::*)() const>();
    test_function0<void (Foo::*)() &>();
    test_function0<void (Foo::*)() &&>();
    test_function0<void (Foo::*)() const &>();
    test_function0<void (Foo::*)() const &&>();

  return 0;
}
`