import { SortDirection } from "../abstractions/Server";

export const nextSortDirection = (sortDirection: SortDirection) => {
  switch (sortDirection) {
    case SortDirection.ASC:
      return SortDirection.DESC;
    case SortDirection.DESC:
      return SortDirection.NONE;
    case SortDirection.NONE:
      return SortDirection.ASC;
  }
};
