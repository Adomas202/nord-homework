import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "../store/auth/auth.reducer";
import serversReducer from "../store/servers/servers.reducer";

export function renderWithProviders(
  ui: ReactElement,
  {
    store = configureStore({
      reducer: { authReducer, serversReducer },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: NonNullable<React.ReactNode> }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
