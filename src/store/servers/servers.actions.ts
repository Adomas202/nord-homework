import { ThunkDispatch as Dispatch } from "redux-thunk";
import axios from "axios";

import * as constants from "./servers.constants";
import Config from "../../Config";
import { Server } from "../../abstractions/Server";

const baseUrl = Config;

export interface FetchServersRequest {
  type: constants.FetchServersRequest;
}

function fetchServersRequest(): FetchServersRequest {
  return {
    type: constants.FETCH_SERVERS_REQUEST,
  };
}

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
  error: Error | unknown;
}

function ServersError(error: Error | unknown): ServersError {
  return {
    type: constants.SERVERS_ERROR,
    error,
  };
}

export type ServersAction =
  | FetchServersRequest
  | FetchServersSuccess
  | ServersError;

export function getServers() {
  return async (dispatch: Dispatch<ServersAction, unknown, any>) => {
    dispatch(fetchServersRequest());
    try {
      const response = await axios.get(`${baseUrl}/servers`);

      dispatch(fetchServersSuccess(response.data));
    } catch (error) {
      dispatch(ServersError(error));
    }
  };
}
