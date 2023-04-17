import { renderWithProviders } from "../../tests/render";
import Heading from "./Heading";

describe("Heading", () => {
  it("renders Heading text", () => {
    const { getByText } = renderWithProviders(<Heading text="test" />);
    expect(getByText("test")).toBeInTheDocument();
  });
});
