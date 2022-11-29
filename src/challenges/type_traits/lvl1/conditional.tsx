export const conditional = `
#include <type_traits>

int main(int, char**)
{
    static_assert(std::is_same_v<char, conditional_t<true, char, int>>);
    static_assert(std::is_same_v<int,  conditional_t<false, char, int>>);

  return 0;
}
`;