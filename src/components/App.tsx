import { Link } from "react-router-dom";
import Navigator from "./Navigator";

const App: React.FC = () => {
  return <div className="row d-flex flex-row flex-no-wrap w-100">
    <nav className="col-12 navbar h-3 bg-dark navbar-expand fixed-top">Test</nav>
    <div className="col-12 mt-5 container ">
      <Link to={`challenges`}>Practice</Link>
      <Navigator />
    </div>
  </div>;
};

export default App;