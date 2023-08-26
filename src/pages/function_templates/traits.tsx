import { challenges } from '../../challenges'
import { IChapter, ITryChallenge, ITryChallenges } from '../../components/Learn'

export const traits: IChapter = {
  id: 0,
  title: 'Traits',
  codeSnippet: `#include <iostream>
  int main() {
    return 0;
  }`,
  subChapters: [
    { id: '0', title: 'abcd1', content: 'vvvvvv'},
    { id: '1', title: 'abcd2', content: 'adsf'},
    { id: '2', title: 'abcd3', content: `aaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`},
  ]
}

export const traits_challenges: ITryChallenges = [
  {
    id: 0,
    title: 'add_const, add_const_t',
    challenge: challenges[0],
    solution: '',
    hint: '',
  },
]

