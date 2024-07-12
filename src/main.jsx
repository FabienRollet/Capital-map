import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DisplayMap from "./pages/DisplayMap";
import CardInfo from "./pages/CardInfo";
import { CapitalLoader } from "./components/CapitalLoader";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: CapitalLoader,
    children: [
      {
        path: "/displayMap",
        element: <DisplayMap />,
      },
      {
        path: "/cardInfo",
        element: <CardInfo />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
