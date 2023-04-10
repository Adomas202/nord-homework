import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import Servers from "../Pages/Servers/Servers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const Pages = () => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.authReducer.isAuthenticated
  );
  const errorElement = { errorElement: <ErrorPage /> };

  const LoggedOutPages = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      ...errorElement,
    },
  ]);

  const LoggedInPages = createBrowserRouter([
    {
      path: "/",
      element: <Servers />,
      ...errorElement,
    },
  ]);

  if (isAuthenticated) {
    return <RouterProvider router={LoggedInPages} />;
  }

  return <RouterProvider router={LoggedOutPages} />;
};

export default Pages;
