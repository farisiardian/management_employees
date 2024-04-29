import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeesTable from "./EmployeesTable.jsx";
import EmployeeForm from "./EmployeesForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/EmployeeTable",
    element: <EmployeesTable />,
  },
  {
    path: "/EmployeeForm",
    element: <EmployeeForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
