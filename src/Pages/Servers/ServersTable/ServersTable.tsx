import { useState } from "react";
import { Server, SortDirection } from "../../../abstractions/Server";
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
    header: "Name",
    sortDirection: SortDirection.NONE,
  },
  {
    header: "Distance",
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
    if (column.header === "Distance") {
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
    <table>
      <thead>
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
            key={`${server.name}-${server.distance}`}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <td>{server.name}</td>
            <td>{server.distance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServersTable;
