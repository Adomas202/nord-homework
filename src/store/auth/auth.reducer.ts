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
import { User } from "../../abstractions/User";

export interface Auth {
  authChecked: boolean;
  isAuthenticated: boolean;
  error?: Error;
  loading?: boolean;
  child?: User;
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
      //   alertError({
      //     message: "Klaida!",
      //     description: "Neteisingai įvestas vartotojo vardas arba slaptažodis",
      //     duration: 3,
      //   });

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
