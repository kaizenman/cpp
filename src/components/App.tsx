import { ThemeProvider } from "../contexts/ThemeContext";
import Content from "./Content";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
};

export default App;


  // return <div className="row d-flex flex-row flex-no-wrap w-100">
  //   <nav className="col-12 navbar h-3 bg-light navbar-expand fixed-top">Test</nav>
  //   <div className="col-12 mt-5 container ">
  //     <Link to={`challenges`}>Practice</Link>
  //     <Navigator />
  //   </div>
  // </div>;
