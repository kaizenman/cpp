import { Link } from "react-router-dom";
import Navigator from "./Navigator";
import Accordion from 'react-bootstrap/Accordion';

// import * as Logo from '../assets/images/logo.png'

import logo from '../assets/images/logo.png'
import { articles, IArticle } from "./Learn";
import { useEffect, useRef, useState } from "react";
import Image from 'react-bootstrap/Image'
import { Card, Container } from "react-bootstrap";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";



const App: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<IArticle>(articles[0]);

  // return <div className="bg-white">
  //   <div className="row d-flex">
  //     <div className="fixed bg-dark d-flex">
  //       <div className="p-2">
  //         <Image fluid={true} src={logo} alt="logo" width="32" height="32" />
  //       </div>
  //     </div>

  //     <div className="d-flex flex-row bg-light">
  //     <aside className="row d-flex pt-2 bg-light">
  //       <Accordion defaultActiveKey="0" flush>
  //         <div className="list-group list-group-flush">
  //           {articles.map(article =>
  //           <div key={article.id}>
  //           <AccordionItem eventKey={article.title} onClick={() => setActiveArticle(article)}>
  //             <AccordionHeader>
  //               <span className="text-capitalize">{article.title}</span>
  //             </AccordionHeader>
  //           </AccordionItem>
  //           </div>
  //           )}
  //         </div>
  //       </Accordion>
  //     </aside>
  //     <main className="w-100">
  //       <Container>
  //         <h1 className="text-capitalize" key={activeArticle.id}>{activeArticle.title}</h1>
  //         {activeArticle.chapters.map(chapter => 
  //           <Container key={chapter.id}>
  //             <h2 className="text-capitalize">{chapter.title}</h2>
  //             {chapter.codeSnippet && <Card><pre>{chapter.codeSnippet}</pre></Card>}
  //             {chapter.subChapters && chapter.subChapters.map(subChapter => 
  //               <div key={subChapter.id}>
  //                 <h3 className="text-capitalize">{subChapter.title}</h3>
  //                 <p className="text-break">{subChapter.content}</p>
  //                 {subChapter.codeSnippet && <code>{subChapter.codeSnippet}</code> }
  //                 <br />
  //               </div>
  //             )}
  //           </Container>)}
  //       </Container>
  //     </main>
  //     </div>
  //     <footer>
  //     </footer>
  //   </div>
  // </div>

  return <div className="row d-flex flex-row flex-no-wrap w-100">
    <nav className="col-12 navbar h-3 bg-light navbar-expand fixed-top">Test</nav>
    <div className="col-12 mt-5 container ">
      <Link to={`challenges`}>Practice</Link>
      <Navigator />
    </div>
  </div>;
};

export default App;