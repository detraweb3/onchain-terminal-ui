import "./App.css";
import Home from "./pages/Home/Home";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Local from "./pages/Local/Create/Create";
import Login from "./pages/Local/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/local/create",
    element: <Local />,
  },
  {
    path: "/local/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </header>
    </div>
  );
}
export default App;
