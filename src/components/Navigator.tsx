
import { Link } from "react-router-dom";
import "../styles.css";
import { articles} from "./Learn";

const Navigator: React.FC = () => {
  return <div>
  <div>
    <nav>
      <div></div>
    </nav>
    <div>
      <aside>
        <nav>
          <ul>
       {articles.map(article =>
            <li key={article.id}>
              <Link to={`learn/${article.url}`}>
                <h1>{article.title}</h1>
              </Link>
            </li>
          )}
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</div>

};

export default Navigator;
