export type NumberIndexed<T> = { [index: number]: T };
export type OrderType = 'asc' | 'desc';
export type Result<T> = {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: T[];
};
