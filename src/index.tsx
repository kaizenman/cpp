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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    children: []
  },
  {
    path: "learn/:url",
    loader: articleLoader,
    element: <Learn />
  },
  {
    path: "challenges",
    element: <Practice />
  }
]);

ReactDOM.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
