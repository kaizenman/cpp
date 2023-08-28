import { Link, useLoaderData } from "react-router-dom";
import { class_templates } from "../pages/class_templates/class_templates";
import { declaration_points } from "../pages/class_templates/declaration_points";
import { dependent_names } from "../pages/class_templates/dependent_names";
import { concepts } from "../pages/function_templates/concepts";
import { requirements } from "../pages/function_templates/requirements";
import { traits, traits_challenges } from "../pages/function_templates/traits";
import { IChallenge } from "../challenges";
import Practice from "./Practice";

interface SubChapter {
  id: string;
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface IChapter {
  id: number;
  title: string;
  codeSnippet?: string;
  subChapters?: SubChapter[];
}

export interface ITryChallenge {
  id: number;
  title: string;
  challenge: IChallenge;
  solution: string;
  hint?: string;
}

export type ITryChallenges = ITryChallenge[];

export interface IArticle {
  id: number;
  url: string;
  title: string;
  chapters: IChapter[];
  try_challenges?: ITryChallenges;
}

export const articles: IArticle[] = [
  { id: 0, url: 'function_templates', title: 'function templates',  chapters: [traits, requirements, concepts], try_challenges: traits_challenges },
  { id: 1, url: 'class_templates',    title: 'class templates',     chapters: [class_templates, declaration_points, dependent_names]},
  { id: 2, url: 'name_resolution_ODR', title: 'name resolution and ODR', chapters: []},
  { id: 3, url: 'modules', title: 'modules', chapters: []},
  { id: 4, url: 'SFINAE', title: 'SFNIAE', chapters: []},
  { id: 5, url: 'Classic metaprogramming', title: 'Classic metaprogramming', chapters: []},
  { id: 6, url: 'Constant expressions', title: 'Constant expressions', chapters: []},
  { id: 7, url: 'Type deduction', title: 'Type deduction', chapters: []},
  { id: 8, url: 'Variadic templates', title: 'Variadic templates', chapters: []},
  { id: 9, url: 'Lambda expressions', title: 'Lambda expressions', chapters: []}
];

export function articleLoader( { params }: any ): IArticle | undefined {
  return articles.find((article => article.url === params.url));
}

const Learn: React.FC = () => {
  const article = useLoaderData() as unknown as IArticle | undefined;

  return <main>
      {article && 
      <>
        <h1>{article.title}</h1>
        <article>
          {article.chapters.map(chapter => <div key={chapter.id}>{chapter.title}</div>)}
          {article.try_challenges && <Practice theme='dark' challenges={article.try_challenges.map((ch) => {
            return ch.challenge;
          })} />}
          <Link to={`/cpp`}>Go back</Link>
        </article>
      </>
      }
    </main>
};

export default Learn;