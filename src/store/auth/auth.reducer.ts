import {
  Authenticate,
  Unauthenticate,
  ClearAuth,
  AuthFailure,
} from "./auth.actions";
import {
  AUTHENTICATE,
  UNAUTHENTICATE,
  CLEAR_ERRORS,
  AUTH_FAILURE,
} from "./auth.constants";

export interface Auth {
  authChecked: boolean;
  isAuthenticated: boolean;
  error?: Error | unknown;
  loading?: boolean;
}

export default function authReducer(
  state: Auth = {
    authChecked: false,
    loading: false,
    isAuthenticated: false,
  },
  action: Authenticate | Unauthenticate | AuthFailure | ClearAuth
): Auth {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authChecked: true,
        isAuthenticated: true,
        error: undefined,
      };
    case UNAUTHENTICATE:
      return {
        authChecked: true,
        error: undefined,
        isAuthenticated: false,
      };
    case AUTH_FAILURE: {
      return {
        ...state,
        authChecked: true,
        error: action.error,
      };
    }
    case CLEAR_ERRORS:
      return { ...state, error: undefined, authChecked: true };
    default:
      return { ...state };
  }
}
