// React imports
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// routes
import Dashboard, { dashBoardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

// layouts
import Main from "./layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: dashBoardLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashBoardLoader,
        errorElement: <Error />
      },
    ]
  },
  {
    path: "/about",
    element: <h1>about</h1>,
  },
]);


function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
