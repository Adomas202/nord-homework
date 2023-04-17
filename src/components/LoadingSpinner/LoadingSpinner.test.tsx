import { renderWithProviders } from "../../tests/render";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders LoadingSpinner", () => {
    const { getByText } = renderWithProviders(<LoadingSpinner />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});
