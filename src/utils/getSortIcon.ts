import { SortDirection } from "../abstractions/Server";
import { SortDownIcon, SortIcon, SortUpIcon } from "../components/Icons/Icons";

export const getSortIcon = (sortDirection: SortDirection) => {
  switch (sortDirection) {
    case SortDirection.ASC:
      return SortUpIcon;
    case SortDirection.DESC:
      return SortDownIcon;
    case SortDirection.NONE:
      return SortIcon;
  }
};
