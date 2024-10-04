import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Paths } from "./paths";
import { Loader } from "./components/Loader/Loader";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import { ConfigProvider, theme } from "antd";
import { Auth } from "./features/auth/auth";
import { EmployeesPage } from "./pages/employeesPage";
import { AddEmployeePage } from "./pages/addEmployee";
import { StatusPage } from "./pages/statusPage";
import { EmployeePage } from "./pages/employeePage";
import { EditEmployeePage } from "./pages/editEmployeePage";
import { LoaderPage } from "./pages/loaderPage";

const router = createBrowserRouter([
  { path: Paths.home, element: <EmployeesPage /> },
  { path: Paths.login, element: <LoginPage /> },
  { path: Paths.register, element: <RegisterPage /> },
  { path: Paths.addEmployee, element: <AddEmployeePage /> },
  { path: `${Paths.status}/:status`, element: <StatusPage /> },
  { path: `${Paths.employee}/:id`, element: <EmployeePage /> },
  { path: `${Paths.editEmployee}/:id`, element: <EditEmployeePage /> },
  { path: `/loader`, element: <LoaderPage /> },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <RouterProvider
            router={router}
            // fallbackElement={<Loader />}
            future={{ v7_startTransition: true }}
          />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
