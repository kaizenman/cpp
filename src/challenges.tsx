import { add_const } from './challenges/type_traits/lvl1/add_const';
import { add_cv } from './challenges/type_traits/lvl1/add_cv';
import { add_volatile } from './challenges/type_traits/lvl1/add_volatile';
import { conditional } from './challenges/type_traits/lvl1/conditional';
import { dependent_type } from './challenges/type_traits/lvl1/dependent_type';
import { enable_if } from './challenges/type_traits/lvl1/enable_if';
import { integral_constant } from './challenges/type_traits/lvl1/integral_constant';
import { remove_all_extents } from './challenges/type_traits/lvl1/remove_all_extents';
import { remove_const } from './challenges/type_traits/lvl1/remove_const';
import { remove_extent } from './challenges/type_traits/lvl1/remove_extent';

export interface IChallenge {
  id: number,
  title: string,
  description: string,
  code: string,
  test: string,
}

export const challenges : IChallenge[] = [
  {
    id: 0,
    title: 'add_const, add_const_t',
    description: '',
    code: '',
    test: add_const,
  },
  {
    id: 1,
    title: 'add_cv, add_cv_t',
    description: '',
    code: '',
    test: add_cv,
  },
  {
    id: 2,
    title: 'add_volatile, add_volatile_t',
    description: '',
    code: '',
    test: add_volatile,
  },
  {
    id: 3,
    title: 'conditional, conditional_t',
    description: '',
    code: '',
    test: conditional,
  },
  {
    id: 4,
    title: 'dependent_type',
    description: '',
    code: '',
    test: dependent_type,
  },
  {
    id: 5,
    title: 'enable_if',
    description: '',
    code: '',
    test: enable_if,
  },
  {
    id: 6,
    title: 'integral_constant, true_type, false_type',
    description: '',
    code: '',
    test: integral_constant,
  },
  {
    id: 7,
    title: 'remove_all_extents',
    description: '',
    code: '',
    test: remove_all_extents,
  },
  {
    id: 8,
    title: 'remove_const',
    description: '',
    code: '',
    test: remove_const,
  },
  {
    id: 9,
    title: 'remove_extent',
    description: '',
    code: '',
    test: remove_extent,
  }
];
