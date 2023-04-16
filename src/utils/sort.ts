import { Server, SortDirection } from "../abstractions/Server";

export const sortByDistance = (servers: Server[], sortDirection: SortDirection) => {
  return servers.sort((a, b) => {
    if (sortDirection === SortDirection.ASC) {
      return a.distance - b.distance;
    } else {
      return b.distance - a.distance;
    }
  });
};

export const sortByName = (servers: Server[], sortDirection: SortDirection) => {
  return servers.sort((a, b) => {
    if (sortDirection === SortDirection.ASC) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
};
