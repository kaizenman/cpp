import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import { articleLoader } from "./components/Learn"

import ReactDOM from "react-dom";
import App from "./components/App";
import Learn from "./components/Learn";
import Practice from "./components/Practice";
import 'bootstrap/dist/css/bootstrap.css';


const router = createBrowserRouter([
  {
    path: "cpp",
    element: <App /> ,
    children: []
  },
  {
    path: "cpp/learn/:url",
    loader: articleLoader,
    element: <Learn />
  },
  // {
  //   path: "cpp/challenges",
  //   element: <Practice />
  // }
]);

ReactDOM.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
