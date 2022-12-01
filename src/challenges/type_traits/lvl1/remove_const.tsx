export const remove_const = `
#include <type_traits>
template <class T, class U>
void test_remove_const_imp()
{
    std::is_same_v<U, remove_const_t<T>>;
}

template <class T>
void test_remove_const()
{
    test_remove_const_imp<T, T>();
    test_remove_const_imp<const T, T>();
    test_remove_const_imp<volatile T, volatile T>();
    test_remove_const_imp<const volatile T, volatile T>();
}

int main(int, char**)
{
    test_remove_const<void>();
    test_remove_const<int>();
    test_remove_const<int[3]>();
    test_remove_const<int&>();
    test_remove_const<const int&>();
    test_remove_const<int*>();
    test_remove_const<const int*>();

  return 0;
}
`;