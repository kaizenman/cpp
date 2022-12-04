import { Link } from "react-router-dom";
import Navigator from "./Navigator";

const App: React.FC = () => {
  return <div>
    <Link to={`challenges`}>Practice</Link>
    <div>
      <Navigator />
    </div>
    
  </div>;
};

export default App;