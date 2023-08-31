import "./App.css";
import Home from "./pages/Home/Home";
import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Local from "./pages/Local/Create/Create";
import Login from "./pages/Local/Login/Login";
import Platform from "./pages/Platform/Platform";
import { ListenForNewTokenPairs } from "./web3/NewTokens";
import UnicryptListener from "./web3/LiquidityLocked";

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
  {
    path: "/platform/home",
    element: <Platform />,
  },
]);

function App() {
  useEffect(() => {
    ListenForNewTokenPairs();
    UnicryptListener();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </Provider>
      </header>
    </div>
  );
}
export default App;
