export const test_copyable = `
//===----------------------------------------------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

// UNSUPPORTED: c++03, c++11, c++14, c++17

// template<class T>
// concept copyable = see below;

#include <concepts>

#include <deque>
#include <forward_list>
#include <list>
#include <map>
#include <memory>
#include <optional>
#include <unordered_map>
#include <vector>

struct has_const_member {
    int const x;
  };
  
  struct has_volatile_member {
    int volatile x;
  };
  
  struct has_cv_member {
    int const volatile x;
  };
  
  struct has_lvalue_reference_member {
    int& x;
  };
  
  struct has_rvalue_reference_member {
    int&& x;
  };
  
  struct has_array_member {
    int x[5];
  };
  
  struct has_function_ref_member {
    int (&f)();
  };
  
  struct cpp03_friendly {
    cpp03_friendly(cpp03_friendly const&);
    cpp03_friendly& operator=(cpp03_friendly const&);
  };
  
  struct const_move_ctor {
    const_move_ctor(const_move_ctor const&&);
    const_move_ctor& operator=(const_move_ctor&&);
  };
  
  struct volatile_move_ctor {
    volatile_move_ctor(volatile_move_ctor volatile&&);
    volatile_move_ctor& operator=(volatile_move_ctor&&);
  };
  
  struct cv_move_ctor {
    cv_move_ctor(cv_move_ctor const volatile&&);
    cv_move_ctor& operator=(cv_move_ctor&&);
  };
  
  struct multi_param_move_ctor {
    multi_param_move_ctor(multi_param_move_ctor&&, int = 0);
    multi_param_move_ctor& operator=(multi_param_move_ctor&&);
  };
  
  struct not_quite_multi_param_move_ctor {
    not_quite_multi_param_move_ctor(not_quite_multi_param_move_ctor&&, int);
    not_quite_multi_param_move_ctor& operator=(not_quite_multi_param_move_ctor&&);
  };
  
  struct copy_with_mutable_parameter {
    copy_with_mutable_parameter(copy_with_mutable_parameter&);
    copy_with_mutable_parameter&
    operator=(copy_with_mutable_parameter&);
  };
  
  struct const_move_assignment {
    const_move_assignment& operator=(const_move_assignment&&) const;
  };
  
  struct volatile_move_assignment {
    const_move_assignment& operator=(const_move_assignment&&) volatile;
  };
  
  struct cv_move_assignment {
    cv_move_assignment& operator=(cv_move_assignment&&) const volatile;
  };
  
  struct const_move_assign_and_traditional_move_assign {
    const_move_assign_and_traditional_move_assign&
    operator=(const_move_assign_and_traditional_move_assign&&);
    const_move_assign_and_traditional_move_assign&
    operator=(const_move_assign_and_traditional_move_assign&&) const;
  };
  
  struct volatile_move_assign_and_traditional_move_assign {
    volatile_move_assign_and_traditional_move_assign&
    operator=(volatile_move_assign_and_traditional_move_assign&&);
    volatile_move_assign_and_traditional_move_assign&
    operator=(volatile_move_assign_and_traditional_move_assign&&) volatile;
  };
  
  struct cv_move_assign_and_traditional_move_assign {
    cv_move_assign_and_traditional_move_assign&
    operator=(cv_move_assign_and_traditional_move_assign&&);
    cv_move_assign_and_traditional_move_assign&
    operator=(cv_move_assign_and_traditional_move_assign&&) const volatile;
  };
  
  struct const_move_assign_and_default_ops {
    const_move_assign_and_default_ops(const_move_assign_and_default_ops const&) =
        default;
    const_move_assign_and_default_ops(const_move_assign_and_default_ops&&) =
        default;
    const_move_assign_and_default_ops&
    operator=(const_move_assign_and_default_ops const&) = default;
    const_move_assign_and_default_ops&
    operator=(const_move_assign_and_default_ops&&) = default;
    const_move_assign_and_default_ops&
    operator=(const_move_assign_and_default_ops&&) const;
  };
  
  struct volatile_move_assign_and_default_ops {
    volatile_move_assign_and_default_ops(
        volatile_move_assign_and_default_ops const&) = default;
    volatile_move_assign_and_default_ops(volatile_move_assign_and_default_ops&&) =
        default;
    volatile_move_assign_and_default_ops&
    operator=(volatile_move_assign_and_default_ops const&) = default;
    volatile_move_assign_and_default_ops&
    operator=(volatile_move_assign_and_default_ops&&) = default;
    volatile_move_assign_and_default_ops&
    operator=(volatile_move_assign_and_default_ops&&) volatile;
  };
  
  struct cv_move_assign_and_default_ops {
    cv_move_assign_and_default_ops(cv_move_assign_and_default_ops const&) =
        default;
    cv_move_assign_and_default_ops(cv_move_assign_and_default_ops&&) = default;
    cv_move_assign_and_default_ops&
    operator=(cv_move_assign_and_default_ops const&) = default;
    cv_move_assign_and_default_ops&
    operator=(cv_move_assign_and_default_ops&&) = default;
    cv_move_assign_and_default_ops&
    operator=(cv_move_assign_and_default_ops&&) const volatile;
  };
  
  struct deleted_assignment_from_const_rvalue {
    deleted_assignment_from_const_rvalue(
        deleted_assignment_from_const_rvalue const&);
    deleted_assignment_from_const_rvalue(deleted_assignment_from_const_rvalue&&);
    deleted_assignment_from_const_rvalue&
    operator=(const deleted_assignment_from_const_rvalue&);
    deleted_assignment_from_const_rvalue&
    operator=(deleted_assignment_from_const_rvalue&&);
    deleted_assignment_from_const_rvalue&
    operator=(const deleted_assignment_from_const_rvalue&&) = delete;
  };


struct no_copy_constructor {
    no_copy_constructor() = default;
  
    no_copy_constructor(no_copy_constructor const&) = delete;
    no_copy_constructor(no_copy_constructor&&) = default;
  };
  
  struct no_copy_assignment {
    no_copy_assignment() = default;
  
    no_copy_assignment& operator=(no_copy_assignment const&) = delete;
    no_copy_assignment& operator=(no_copy_assignment&&) = default;
  };
  
  struct no_copy_assignment_mutable {
    no_copy_assignment_mutable() = default;
  
    no_copy_assignment_mutable&
    operator=(no_copy_assignment_mutable const&) = default;
    no_copy_assignment_mutable& operator=(no_copy_assignment_mutable&) = delete;
    no_copy_assignment_mutable& operator=(no_copy_assignment_mutable&&) = default;
  };
  
  struct derived_from_noncopyable : std::unique_ptr<int> {};
  
  struct has_noncopyable {
    std::unique_ptr<int> x;
  };
  
  struct const_copy_assignment {
    const_copy_assignment() = default;
  
    const_copy_assignment(const_copy_assignment const&);
    const_copy_assignment(const_copy_assignment&&);
  
    const_copy_assignment& operator=(const_copy_assignment&&);
    const_copy_assignment const& operator=(const_copy_assignment const&) const;
  };
  
  struct volatile_copy_assignment {
    volatile_copy_assignment() = default;
  
    volatile_copy_assignment(volatile_copy_assignment volatile&);
    volatile_copy_assignment(volatile_copy_assignment volatile&&);
  
    volatile_copy_assignment& operator=(volatile_copy_assignment&&);
    volatile_copy_assignment volatile&
    operator=(volatile_copy_assignment const&) volatile;
  };
  
  struct cv_copy_assignment {
    cv_copy_assignment() = default;
  
    cv_copy_assignment(cv_copy_assignment const volatile&);
    cv_copy_assignment(cv_copy_assignment const volatile&&);
  
    cv_copy_assignment const volatile&
    operator=(cv_copy_assignment const volatile&) const volatile;
    cv_copy_assignment const volatile&
    operator=(cv_copy_assignment const volatile&&) const volatile;
  };






static_assert(copyable<int>);
static_assert(copyable<int volatile>);
static_assert(copyable<int*>);
static_assert(copyable<int const*>);
static_assert(copyable<int volatile*>);
static_assert(copyable<int volatile const*>);
static_assert(copyable<int (*)()>);

struct S {};
static_assert(copyable<S>);
static_assert(copyable<int S::*>);
static_assert(copyable<int (S::*)()>);
static_assert(copyable<int (S::*)() noexcept>);
static_assert(copyable<int (S::*)() &>);
static_assert(copyable<int (S::*)() & noexcept>);
static_assert(copyable<int (S::*)() &&>);
static_assert(copyable<int (S::*)() && noexcept>);
static_assert(copyable<int (S::*)() const>);
static_assert(copyable<int (S::*)() const noexcept>);
static_assert(copyable<int (S::*)() const&>);
static_assert(copyable<int (S::*)() const & noexcept>);
static_assert(copyable<int (S::*)() const&&>);
static_assert(copyable<int (S::*)() const && noexcept>);
static_assert(copyable<int (S::*)() volatile>);
static_assert(copyable<int (S::*)() volatile noexcept>);
static_assert(copyable<int (S::*)() volatile&>);
static_assert(copyable<int (S::*)() volatile & noexcept>);
static_assert(copyable<int (S::*)() volatile&&>);
static_assert(copyable<int (S::*)() volatile && noexcept>);
static_assert(copyable<int (S::*)() const volatile>);
static_assert(copyable<int (S::*)() const volatile noexcept>);
static_assert(copyable<int (S::*)() const volatile&>);
static_assert(copyable<int (S::*)() const volatile & noexcept>);
static_assert(copyable<int (S::*)() const volatile&&>);
static_assert(copyable<int (S::*)() const volatile && noexcept>);

static_assert(copyable<std::vector<int> >);
static_assert(copyable<std::deque<int> >);
static_assert(copyable<std::forward_list<int> >);
static_assert(copyable<std::list<int> >);
static_assert(copyable<std::shared_ptr<std::unique_ptr<int> > >);
static_assert(copyable<std::optional<std::vector<int> > >);
static_assert(copyable<std::vector<int> >);
static_assert(copyable<std::vector<std::unique_ptr<int> > >);

static_assert(copyable<has_volatile_member>);
static_assert(copyable<has_array_member>);

// Not objects
static_assert(!copyable<void>);
static_assert(!copyable<int&>);
static_assert(!copyable<int const&>);
static_assert(!copyable<int volatile&>);
static_assert(!copyable<int const volatile&>);
static_assert(!copyable<int&&>);
static_assert(!copyable<int const&&>);
static_assert(!copyable<int volatile&&>);
static_assert(!copyable<int const volatile&&>);
static_assert(!copyable<int()>);
static_assert(!copyable<int (&)()>);
static_assert(!copyable<int[5]>);

// Not copy constructible or copy assignable
static_assert(!copyable<std::unique_ptr<int> >);

// Not assignable
static_assert(!copyable<int const>);
static_assert(!copyable<int const volatile>);
static_assert(copyable<const_copy_assignment const>);
static_assert(!copyable<volatile_copy_assignment volatile>);
static_assert(copyable<cv_copy_assignment const volatile>);

static_assert(!copyable<no_copy_constructor>);
static_assert(!copyable<no_copy_assignment>);

static_assert(std::is_copy_assignable_v<no_copy_assignment_mutable>);
static_assert(!copyable<no_copy_assignment_mutable>);
static_assert(!copyable<derived_from_noncopyable>);
static_assert(!copyable<has_noncopyable>);
static_assert(!copyable<has_const_member>);
static_assert(!copyable<has_cv_member>);
static_assert(!copyable<has_lvalue_reference_member>);
static_assert(!copyable<has_rvalue_reference_member>);
static_assert(!copyable<has_function_ref_member>);

static_assert(
    !std::assignable_from<deleted_assignment_from_const_rvalue&,
                          deleted_assignment_from_const_rvalue const>);
static_assert(!copyable<deleted_assignment_from_const_rvalue>);

int main(int, char**) { return 0; }
`;