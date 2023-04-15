import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "../store/auth/auth.reducer";
import serversReducer from "../store/servers/servers.reducer";

export function renderWithProviders(
  ui: ReactElement,
  {
    // preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { authReducer, serversReducer },
      // preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: NonNullable<React.ReactNode> }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
