import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/Button/Button";
import { logOut } from "../../store/auth/auth.actions";
import { useEffect } from "react";
import { getServers } from "../../store/servers/servers.actions";
import { AppState } from "../../store";

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
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {servers.map((server) => (
              <div key={server.name + server.distance}>
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p
                        data-testid="server-name"
                        className="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        {server.name}
                      </p>
                    </div>
                    <div
                      data-testid="server-distance"
                      className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                    >
                      {server.distance}
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Servers;
