export const add_const = `#include <type_traits>
#include "traits/add_const.h

int main(int, char**)
{
  static_assert(std::is_same_v<const int, add_const_t<int>>);

  return 0;
}
`;