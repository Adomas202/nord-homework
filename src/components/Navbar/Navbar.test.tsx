import { renderWithProviders } from "../../tests/render";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders Navbar text", () => {
    const { getByRole, getByText } = renderWithProviders(<Navbar />);
    expect(getByRole("button", { name: "Logout" })).toBeInTheDocument();
    expect(getByText("Servers App")).toBeInTheDocument();
  });
});
