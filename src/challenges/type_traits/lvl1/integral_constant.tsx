export const integral_constant = `
#include <type_traits>
#include <cassert>
#include "traits/integral_constant.h"

int main(int, char**)
{
    typedef integral_constant<int, 5> _5;
    static_assert(_5::value == 5, "");
    static_assert((std::is_same<_5::value_type, int>::value), "");
    static_assert((std::is_same<_5::type, _5>::value), "");
    static_assert((_5() == 5), "");

    static_assert ( _5{}() == 5, "" );
    static_assert ( true_type{}(), "" );

    static_assert(false_type::value == false, "");
    static_assert((std::is_same<false_type::value_type, bool>::value), "");
    static_assert((std::is_same<false_type::type, false_type>::value), "");

    static_assert(true_type::value == true, "");
    static_assert((std::is_same<true_type::value_type, bool>::value), "");
    static_assert((std::is_same<true_type::type, true_type>::value), "");

    false_type f1;
    false_type f2 = f1;
    assert(!f2);

    true_type t1;
    true_type t2 = t1;
    assert(t2);

  return 0;
}
`;