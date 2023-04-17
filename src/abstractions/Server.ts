export interface Server {
  name: string;
  distance: number;
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
  NONE = "none",
}

export enum ServerHeading {
  NAME = "Name",
  DISTANCE = "Distance",
}
