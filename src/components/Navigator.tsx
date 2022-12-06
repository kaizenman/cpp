
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
          <ul className="list-group list-group-vertical">
       {articles.map(article =>
            <li className="list-group-item" key={article.id}>
              <Link to={`learn/${article.url}`}>
                <span>{article.title}</span>
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
