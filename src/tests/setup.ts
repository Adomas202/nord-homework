import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/auth.reducer";
import serversReducer from "../store/servers/servers.reducer";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

export const createStore = () => {
  const store = configureStore({
    reducer: combineReducers({
      authReducer,
      serversReducer,
    }),
  });

  return store;
};
