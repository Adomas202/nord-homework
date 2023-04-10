import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";

import * as constants from "./servers.constants";
import Config from "../../Config";
import { Server } from "../../abstractions/Server";

const baseUrl = Config;

export interface FetchServersSuccess {
  type: constants.FetchServersSuccess;
  servers: Server[];
}

function fetchServersSuccess(servers: Server[]): FetchServersSuccess {
  return {
    type: constants.FETCH_SERVERS_SUCCESS,
    servers,
  };
}

export interface ServersError {
  type: constants.ServersError;
  error: Error;
}

function ServersError(error: Error): ServersError {
  return {
    type: constants.SERVERS_ERROR,
    error,
  };
}

export function getServers() {
  return async (dispatch: Dispatch<any, unknown, any>) => {
    try {
      const response = await axios.get(`${baseUrl}/servers`);

      dispatch(fetchServersSuccess(response.data));
    } catch (error) {
      dispatch(ServersError(error as any));
    }
  };
}
