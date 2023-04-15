import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../tests/render";
import ErrorPage from "./ErrorPage";

describe("ErrorPage", () => {
  const pages = [
    {
      path: "/",
      errorElement: <ErrorPage />,
    },
  ];
  const router = createMemoryRouter(pages, {
    initialEntries: ["/test"],
    initialIndex: 0,
  });

  it("renders unexpected error heading", () => {
    const { getByRole } = renderWithProviders(
      <RouterProvider router={router} />
    );

    expect(getByRole("heading", { name: "Oops!" })).toBeVisible();
  });

  it("renders unexpected error text", () => {
    const { getByText } = renderWithProviders(
      <RouterProvider router={router} />
    );

    expect(
      getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
  });

  it("renders unexpected error status code", () => {
    const { getByText } = renderWithProviders(
      <RouterProvider router={router} />
    );

    expect(getByText(404)).toBeInTheDocument();
  });
});
