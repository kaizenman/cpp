import { Link, useLoaderData } from "react-router-dom";
import { class_templates } from "../pages/class_templates/class_templates";
import { declaration_points } from "../pages/class_templates/declaration_points";
import { dependent_names } from "../pages/class_templates/dependent_names";
import { concepts } from "../pages/function_templates/concepts";
import { requirements } from "../pages/function_templates/requirements";
import { traits } from "../pages/function_templates/traits";

interface SubChapter {
  id: string;
  title: string;
  codeSnippet?: string;
}

export interface IChapter {
  id: number;
  title: string;
  codeSnippet?: string;
}

export interface ITryChallenge {
  id: number;
  title: string;
  codeSnippet: string;
  solution: string;
  hint?: string;
}

export interface ITryChallenges {
  challenges: ITryChallenge[];
}

export interface IArticle {
  id: number;
  url: string;
  title: string;
  chapters: IChapter[];
  challenges?: ITryChallenges;
}

export const articles: IArticle[] = [
  { id: 0, url: 'function_templates', title: 'function templates',  chapters: [traits, requirements, concepts] },
  { id: 1, url: 'class_templates',    title: 'class templates',     chapters: [class_templates, declaration_points, dependent_names]}
];

export function articleLoader( { params }: any ): IArticle | undefined {
  return articles.find((article => article.url === params.url));
}

const Learn: React.FC = () => {
  const article = useLoaderData() as unknown as IArticle | undefined;

  return <main>
      {article && <><h1>{article.title}</h1>
      <article>
        {article.chapters.map(chapter => <div key={chapter.id}>{chapter.title}</div>)}
        <Link to={`/`}>Go back</Link>
      </article></>
      }
    </main>
};

export default Learn;