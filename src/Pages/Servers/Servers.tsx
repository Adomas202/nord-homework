import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getServers } from "../../store/servers/servers.actions";
import { AppState } from "../../store";
import ServersTable from "./ServersTable/ServersTable";
import Heading from "../../components/Heading/Heading";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Navbar from "../../components/Navbar/Navbar";
import ErrorPage from "../ErrorPage/ErrorPage";

const Servers = () => {
  const dispatch = useDispatch();
  const servers = useSelector(
    (state: AppState) => state.serversReducer.servers
  );
  const error = useSelector((state: AppState) => state.serversReducer.error);
  const isLoading = useSelector(
    (state: AppState) => state.serversReducer.isLoading
  );

  useEffect(() => {
    if (!servers && !isLoading) dispatch(getServers());
  }, []);

  if (!servers || isLoading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <ErrorPage />;
  }

  return (
    <div>
      <Navbar />
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <Heading text="Servers information" className="py-5" />
          <ServersTable servers={servers} />
        </div>
      </div>
    </div>
  );
};

export default Servers;
