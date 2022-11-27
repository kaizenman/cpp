import { test_copyable } from './challenges/stl/concepts/concepts.object/copyable';


export interface IChallenge {
  id: number,
  title: string,
  description: string,
  test: string,
}


export const challenges = [
  {
    id: 0,
    title: 'std::copyable',
    description: 'Implement std::copyable concept',
    test: test_copyable, 
  },
  {
    id: 1,
    title: 'bar',
    description: 'Write constexpr function bar returning 5',
    test:
    `
      static_assert(bar() == 5);
    `
  }
];
