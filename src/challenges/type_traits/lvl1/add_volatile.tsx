export const add_volatile = `#include <type_traits>
#include <traits/add_volatile.h>

template <class T, class U>
void test_add_volatile_imp()
{
  std::is_same_v<volatile U, add_volatile_t<T>>;
}

template <class T>
void test_add_volatile()
{
    test_add_volatile_imp<T, volatile T>();
    test_add_volatile_imp<const T, const volatile T>();
    test_add_volatile_imp<volatile T, volatile T>();
    test_add_volatile_imp<const volatile T, const volatile T>();
}

int main(int, char**)
{
    test_add_volatile<void>();
    test_add_volatile<int>();
    test_add_volatile<int[3]>();
    test_add_volatile<int&>();
    test_add_volatile<const int&>();
    test_add_volatile<int*>();
    test_add_volatile<const int*>();

  return 0;
}
`;