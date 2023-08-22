import './App.css';
import Home from "./pages/Home/Home";
import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
