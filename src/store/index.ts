import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import serversReducer from "./servers/servers.reducer";

const reducer = combineReducers({
  authReducer,
  serversReducer,
});

const store = configureStore({
  reducer,
});

export function setupStore(preloadedState?: PreloadedState<AppState>) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

export type AppState = ReturnType<typeof reducer>;

export default store;
