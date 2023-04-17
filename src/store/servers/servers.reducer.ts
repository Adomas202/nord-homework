import {
  FETCH_SERVERS_SUCCESS,
  SERVERS_ERROR,
  FETCH_SERVERS_REQUEST,
} from "./servers.constants";
import {
  FetchServersSuccess,
  ServersError,
  FetchServersRequest,
} from "./servers.actions";
import { Server } from "../../abstractions/Server";

export interface ServersReducer {
  servers: Server[] | null;
  isLoading: boolean;
  error?: Error | unknown;
}

export default function serversReducer(
  state: ServersReducer = {
    servers: null,
    isLoading: false,
    error: null,
  },
  action: FetchServersSuccess | ServersError | FetchServersRequest
): ServersReducer {
  switch (action.type) {
    case FETCH_SERVERS_REQUEST: {
      return { ...state, isLoading: true, error: undefined };
    }
    case FETCH_SERVERS_SUCCESS: {
      return {
        ...state,
        servers: action.servers,
        isLoading: false,
        error: undefined,
      };
    }
    case SERVERS_ERROR: {
      return { ...state, isLoading: false, servers: [], error: action.error };
    }
    default:
      return { ...state, isLoading: false, error: undefined };
  }
}
