import React from "react";
import ReactDOM from "react-dom/client";
import { 
  RouterProvider, 
  createBrowserRouter, 
  Routes,
  Route
} from "react-router-dom";
import "./index.css";

// import Root from "./routes/root";
import Root from "./root";

const router = createBrowserRouter([
  { path: "*", Component: Root },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
