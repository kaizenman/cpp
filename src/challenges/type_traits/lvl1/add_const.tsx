export const add_const = `#include <type_traits>

template <class T, class U>
void test_add_const_imp()
{
    std::is_same_v<const U, add_const_t<T>>;
}

template <class T>
void test_add_const()
{
    test_add_const_imp<T, const T>();
    test_add_const_imp<const T, const T>();
    test_add_const_imp<volatile T, volatile const T>();
    test_add_const_imp<const volatile T, const volatile T>();
}

int main(int, char**)
{
    test_add_const<void>();
    test_add_const<int>();
    test_add_const<int[3]>();
    test_add_const<int&>();
    test_add_const<const int&>();
    test_add_const<int*>();
    test_add_const<const int*>();

  return 0;
}
`;