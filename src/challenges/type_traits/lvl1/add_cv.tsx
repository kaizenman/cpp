export const add_cv = `#include <type_traits>

#include <type_traits>

int main(int, char**)
{
    static_assert(std::is_const_v<add_cv_t<int>>);
    static_assert(std::is_volatile_v<add_cv_t<int>>);

    return 0;
}

`