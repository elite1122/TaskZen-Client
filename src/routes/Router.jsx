import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../MainLayout/Main";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
    },
  ]);