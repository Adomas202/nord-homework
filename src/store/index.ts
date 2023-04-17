import { AnyAction, PreloadedState, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import serversReducer from "./servers/servers.reducer";
import { UNAUTHENTICATE } from "./auth/auth.constants";

const reducer = combineReducers({
  authReducer,
  serversReducer,
});

const rootReducer = (state: any, action: any) =>
  reducer(
    action.type === UNAUTHENTICATE
      ? {
          ...reducer({} as ReturnType<typeof reducer>, {} as AnyAction),
          router: (state && state.router) || {},
        }
      : state,
    action
  );

const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: PreloadedState<AppState>) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

export type AppState = ReturnType<typeof reducer>;

export default store;
