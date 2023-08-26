export const remove_extent = `#include <type_traits>
#include "traits/remove_extent.h"

enum Enum {zero, one_};

template <class T, class U>
void test_remove_extent()
{
    std::is_same_v<U, remove_extent_t<T>>;
}

int main(int, char**)
{
    test_remove_extent<int, int> ();
    test_remove_extent<const Enum, const Enum> ();
    test_remove_extent<int[], int> ();
    test_remove_extent<const int[], const int> ();
    test_remove_extent<int[3], int> ();
    test_remove_extent<const int[3], const int> ();
    test_remove_extent<int[][3], int[3]> ();
    test_remove_extent<const int[][3], const int[3]> ();
    test_remove_extent<int[2][3], int[3]> ();
    test_remove_extent<const int[2][3], const int[3]> ();
    test_remove_extent<int[1][2][3], int[2][3]> ();
    test_remove_extent<const int[1][2][3], const int[2][3]> ();

  return 0;
}

`