import {
  Authenticate,
  Unauthenticate,
  ClearAuth,
  AuthFailure,
  RequestAuth,
} from "./auth.actions";
import {
  AUTHENTICATE,
  UNAUTHENTICATE,
  CLEAR_ERRORS,
  AUTH_FAILURE,
  REQUEST_AUTH,
} from "./auth.constants";

export interface Auth {
  authChecked: boolean;
  isAuthenticated: boolean;
  error?: Error | unknown;
  isLoading?: boolean;
}

export default function authReducer(
  state: Auth = {
    authChecked: false,
    isLoading: false,
    isAuthenticated: false,
  },
  action: Authenticate | Unauthenticate | AuthFailure | ClearAuth | RequestAuth
): Auth {
  switch (action.type) {
    case REQUEST_AUTH:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHENTICATE:
      return {
        ...state,
        authChecked: true,
        isAuthenticated: true,
        error: undefined,
        isLoading: false,
      };
    case UNAUTHENTICATE:
      return {
        authChecked: true,
        error: undefined,
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTH_FAILURE: {
      return {
        ...state,
        authChecked: true,
        error: action.error,
        isLoading: false,
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: undefined,
        authChecked: true,
        isLoading: false,
      };
    default:
      return { ...state };
  }
}
