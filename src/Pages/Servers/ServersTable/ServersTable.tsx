import { useState } from "react";
import {
  Server,
  ServerHeading,
  SortDirection,
} from "../../../abstractions/Server";
import { getSortIcon } from "../../../utils/getSortIcon";
import { nextSortDirection } from "../../../utils/getNextSortDirection";
import { sortByDistance } from "../../../utils/sort";
import { sortByName } from "../../../utils/sort";

interface Props {
  servers: Server[];
}

interface Column {
  header: string;
  sortDirection: SortDirection;
}

const col: Column[] = [
  {
    header: ServerHeading.NAME,
    sortDirection: SortDirection.NONE,
  },
  {
    header: ServerHeading.DISTANCE,
    sortDirection: SortDirection.NONE,
  },
];

const ServersTable = ({ servers }: Props) => {
  const [sortedServersList, setSortedServersList] = useState([...servers]);
  const [columns, setColumns] = useState(col);

  const sortServers = (prevServers: Server[], column: Column) => {
    const sortDirection = nextSortDirection(column.sortDirection);
    if (sortDirection === SortDirection.NONE) {
      return [...servers];
    }
    if (column.header === ServerHeading.DISTANCE) {
      return sortByDistance(prevServers, sortDirection);
    }
    return sortByName(prevServers, sortDirection);
  };

  const getUpdatedColumns = (columns: Column[], selectedColumn: Column) =>
    columns.map((col) => {
      if (col.header === selectedColumn.header) {
        return {
          ...col,
          sortDirection: nextSortDirection(col.sortDirection),
        };
      }
      return col;
    });

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center justify-between">
                  {column.header}
                  <button
                    onClick={() => {
                      setColumns(getUpdatedColumns(columns, column));
                      setSortedServersList((prev) => sortServers(prev, column));
                    }}
                  >
                    {getSortIcon(column.sortDirection)}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedServersList.map((server) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={`${server.name}-${server.distance}`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                data-testid="server-name"
              >
                {server.name}
              </th>
              <td className="px-6 py-4" data-testid="server-distance">
                {server.distance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServersTable;
