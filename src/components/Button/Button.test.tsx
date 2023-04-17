import { renderWithProviders } from "../../tests/render";
import Button from "./Button";

describe("Button", () => {
  it("renders button text", () => {
    const { getByRole } = renderWithProviders(<Button text="test" />);
    expect(getByRole("button", { name: "test" })).toBeInTheDocument();
  });
});
