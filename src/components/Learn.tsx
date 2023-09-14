import { Link, useLoaderData } from "react-router-dom";
import { class_templates } from "../pages/class_templates/class_templates";
import { declaration_points } from "../pages/class_templates/declaration_points";
import { dependent_names } from "../pages/class_templates/dependent_names";
import { concepts } from "../pages/function_templates/concepts";
import { requirements } from "../pages/function_templates/requirements";
import { Challenge } from "../challenges";
import Practice from "./Practice";
import { generic_programming } from "../pages/generic_programming";

interface SubChapter {
  id: string;
  title: string;
  description?: string;
  content: string;
  codeSnippet?: string;
  challenges?: Challenge[];
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
  challenge: Challenge;
  solution: string;
  hint?: string;
}

export type ITryChallenges = ITryChallenge[];

export interface IArticle {
  id: number;
  title: string;
  chapters: IChapter[];
  try_challenges?: ITryChallenges;
}

export const articles: IArticle[] = [
  { 
    id: 0, title: 'Templates',
           chapters: [ generic_programming,]
  },
  { id: 1, title: 'Some test content',     chapters: [class_templates, declaration_points, dependent_names]},
  { id: 2, title: 'name resolution and ODR', chapters: []},
  { id: 3, title: 'modules', chapters: []},
  { id: 4, title: 'SFNIAE', chapters: []},
  { id: 5, title: 'Classic metaprogramming', chapters: []},
  { id: 6, title: 'Constant expressions', chapters: []},
  { id: 7, title: 'Type deduction', chapters: []},
  { id: 8, title: 'Variadic templates', chapters: []},
  { id: 9, title: 'Lambda expressions', chapters: []}
];

export function articleLoader( { params }: any ): IArticle | undefined {
  return articles.find((article => article.title === params.title));
}

const Learn: React.FC = () => {
  const article = useLoaderData() as unknown as IArticle | undefined;

  return <main>
      {article && 
      <div>
        <h1 className="border border-warning">{article.title}</h1>
        <article>
          {article.chapters.map(chapter => <div key={chapter.id}>{chapter.title}</div>)}
          {article.try_challenges && <Practice theme='dark' challenges={article.try_challenges.map((ch) => {
            return ch.challenge;
          })} />}
          <Link to={`/cpp`}>Go back</Link>
        </article>
      </div>
      }
    </main>
};

export default Learn;