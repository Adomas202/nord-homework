import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/Button/Button";
import { logOut } from "../../store/auth/auth.actions";
import { useEffect } from "react";
import { getServers } from "../../store/servers/servers.actions";
import { AppState } from "../../store";
import ServersTable from "./ServersTable/ServersTable";

const Servers = () => {
  const dispatch = useDispatch();
  const servers = useSelector(
    (state: AppState) => state.serversReducer.servers
  );
  const isLoading = useSelector(
    (state: AppState) => state.serversReducer.isLoading
  );

  useEffect(() => {
    if (!servers && !isLoading) dispatch(getServers() as any);
  }, []);

  if (!servers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        text="Logout"
        onClick={() => {
          dispatch(logOut() as any);
        }}
      />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Servers information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Name and distance from the server.
          </p>
          <ServersTable servers={servers} />
        </div>
      </div>
    </div>
  );
};

export default Servers;
