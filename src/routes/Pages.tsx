import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import Servers from "../Pages/ServersPage/ServersPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const Pages = () => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.authReducer.isAuthenticated
  );
  const errorElement = { errorElement: <ErrorPage /> };

  const LoggedOutPages = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      ...errorElement,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ]);

  const LoggedInPages = createBrowserRouter([
    {
      path: "/",
      element: <Servers />,
      ...errorElement,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  if (isAuthenticated) {
    return <RouterProvider router={LoggedInPages} />;
  }

  return <RouterProvider router={LoggedOutPages} />;
};

export default Pages;
