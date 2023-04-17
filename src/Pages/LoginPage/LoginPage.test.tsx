import LoginPage from "./LoginPage";
import { renderWithProviders } from "../../tests/render";
import axios from "axios";
import { setupStore } from "../../store";
import { logIn } from "../../store/auth/auth.actions";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

axios.post = vi.fn();

describe("Test LoginPage rendering", () => {
  it("renders heading", () => {
    const { getByRole } = renderWithProviders(<LoginPage />);
    expect(getByRole("heading")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    const { getByRole } = renderWithProviders(<LoginPage />);
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("Changes isAuthenticated store variable after successful login", async () => {
    const mockedAxios = axios.post as jest.Mock;
    const store = setupStore();
    mockedAxios.mockResolvedValue({ data: { token: "test" }, status: 200 });

    const { getByText } = renderWithProviders(<LoginPage />, { store });

    expect(store.getState().authReducer.isAuthenticated).toBe(false);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    fireEvent.click(getByText("Sign in"));

    await waitFor(async () => {
      expect(store.getState().authReducer.isAuthenticated).toBe(true);
    });
  });

  it("renders error on bad credentials", async () => {
    const mockedAxios = axios.post as jest.Mock;
    const store = setupStore();
    mockedAxios.mockRejectedValue(new Error());

    store.dispatch(logIn("test", "test") as any);

    const { getByText } = renderWithProviders(<LoginPage />, { store });

    await waitFor(() => {
      expect(getByText("Invalid")).toBeInTheDocument();
      expect(getByText("username or password!")).toBeInTheDocument();
    });
  });
});
