import LoginPage from "./LoginPage";
import { renderWithProviders } from "../../tests/render";

describe("Test LoginPage rendering", () => {
  it("renders heading", () => {
    const { getByRole } = renderWithProviders(<LoginPage />);
    expect(getByRole("heading")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    const { getByRole } = renderWithProviders(<LoginPage />);
    expect(getByRole("button")).toBeInTheDocument();
  });
});
