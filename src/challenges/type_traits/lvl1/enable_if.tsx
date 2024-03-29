export const enable_if = `#include <type_traits>
#include "traits/enable_if.h"

int main(int, char**)
{
    std::is_same_v<void, enable_if_t<true, void>>;
    std::is_same_v<int,  enable_if_t<true, int>>;

    return 0;
}
`