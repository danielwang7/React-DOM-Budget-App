// React imports
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// routes
import Dashboard, { dashBoardAction, dashBoardLoader } from "./pages/Dashboard";
import ExpensesPage, { expensesLoader, expensesAction } from "./pages/ExpensesPage";
import Error from "./pages/Error";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

// layouts
import Main from "./layouts/Main";

// actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter(
  [
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
          action: dashBoardAction,
          errorElement: <Error />,
        },
        {
          path: "expenses",
          element: <ExpensesPage />,
          action: expensesAction,
          loader: expensesLoader,
          errorElement: <Error />,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          action: budgetAction,
          loader: budgetLoader,
          errorElement: <Error />,
          children: [
            {
              path: "delete",
              action: deleteBudget,
            },
          ],
        },
        {
          path: "logout",
          action: logoutAction,
          element: <h1>Logging out...</h1>,
        },
      ],
    },
  ],
  {
    basename: "/React-DOM-Budget-App", // NEW BASENAME
  }
);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
