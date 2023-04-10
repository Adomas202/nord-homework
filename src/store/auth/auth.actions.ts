import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";

import * as constants from "./auth.constants";
import { User } from "../../abstractions/User";
import Config from "../../Config";

const baseUrl = Config;

export interface Authenticate {
  type: constants.Authenticate;
}

function authenticate(token: string): Authenticate {
  const authToken = `Bearer ${token}`;
  axios.defaults.headers.common.Authorization = authToken;
  return {
    type: constants.AUTHENTICATE,
  };
}

export interface Unauthenticate {
  type: constants.Unauthenticate;
}

function unauthenticate(): Unauthenticate {
  window.localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export interface AuthFailure {
  type: constants.AuthFailure;
  error: Error;
}

function authError(error: Error): AuthFailure {
  return {
    type: constants.AUTH_FAILURE,
    error,
  };
}

export interface ClearAuth {
  type: constants.ClearErrors;
}

function clearAuth(): ClearAuth {
  return {
    type: constants.CLEAR_ERRORS,
  };
}

export type AuthenticationAction = Authenticate | Unauthenticate | AuthFailure;

export function logIn(username: string, password: string) {
  return async (dispatch: Dispatch<AuthenticationAction, unknown, any>) => {
    try {
      //   window.localStorage.removeItem("token");
      //   delete axios.defaults.headers.common["Authorization"];
      const response = await axios.post(`${baseUrl}/tokens`, {
        username,
        password,
      });

      if (response.data.token) {
        await window.localStorage.setItem("token", response.data.token);
        dispatch(authenticate(response.data.token));
      } else {
        dispatch(unauthenticate());
      }
    } catch (error) {
      dispatch(authError(error as Error)); // TODO: Find a better way to handle this
    }
  };
}

export function logOut() {
  return async (dispatch: Dispatch<AuthenticationAction, unknown, any>) => {
    dispatch(unauthenticate());
  };
}

export function checkAuthentication() {
  return async (dispatch: Dispatch<AuthenticationAction, unknown, any>) => {
    const token: string | null = await window.localStorage.getItem("token");

    if (token) {
      dispatch(authenticate(token));
    } else dispatch(unauthenticate());
  };
}

export function clearErrors() {
  return async (dispatch: Dispatch<AuthenticationAction, unknown, any>) => {
    dispatch(clearAuth());
  };
}
