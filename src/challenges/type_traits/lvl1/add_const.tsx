export const add_const = `#include <type_traits>

int main(int, char**)
{
  static_assert(std::is_same_v<const int, add_const_t<int>>);

  return 0;
}
`;