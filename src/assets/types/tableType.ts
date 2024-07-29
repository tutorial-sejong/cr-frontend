export interface TableTypes {
  [key: string]: string | null;
}

export interface TableHeadTypes {
  name: string;
  value: string;
  initialWidth?: number;
}
