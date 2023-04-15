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
}

export default function serversReducer(
  state: ServersReducer = {
    servers: null,
    isLoading: false,
  },
  action: FetchServersSuccess | ServersError | FetchServersRequest
): ServersReducer {
  switch (action.type) {
    case FETCH_SERVERS_REQUEST: {
      return { ...state, isLoading: true };
    }
    case FETCH_SERVERS_SUCCESS: {
      const servers = action.servers;
      servers.sort((a, b) => {
        if (a.distance === b.distance) {
          return a.name.localeCompare(b.name);
        }
        return a.distance - b.distance;
      });

      return {
        ...state,
        servers: action.servers,
        isLoading: false,
      };
    }
    case SERVERS_ERROR: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state, isLoading: false };
  }
}
