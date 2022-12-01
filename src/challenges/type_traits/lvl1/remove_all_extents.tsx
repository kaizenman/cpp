export const remove_all_extents = `
#include <type_traits>

enum Enum {zero, one_};

template <class T, class U>
void test_remove_all_extents()
{
    std::is_same_v<U, remove_all_extents_t<T>>;
}

int main(int, char**)
{
    test_remove_all_extents<int, int> ();
    test_remove_all_extents<const Enum, const Enum> ();
    test_remove_all_extents<int[], int> ();
    test_remove_all_extents<const int[], const int> ();
    test_remove_all_extents<int[3], int> ();
    test_remove_all_extents<const int[3], const int> ();
    test_remove_all_extents<int[][3], int> ();
    test_remove_all_extents<const int[][3], const int> ();
    test_remove_all_extents<int[2][3], int> ();
    test_remove_all_extents<const int[2][3], const int> ();
    test_remove_all_extents<int[1][2][3], int> ();
    test_remove_all_extents<const int[1][2][3], const int> ();

  return 0;
}
`

