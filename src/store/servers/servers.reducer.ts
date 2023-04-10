import { FETCH_SERVERS_SUCCESS, SERVERS_ERROR } from "./servers.constants";
import { FetchServersSuccess, ServersError } from "./servers.actions";
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
  action: FetchServersSuccess | ServersError
): ServersReducer {
  switch (action.type) {
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
