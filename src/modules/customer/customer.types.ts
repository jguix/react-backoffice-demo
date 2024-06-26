export type Customer = {
  address: string;
  email: string;
  id: number;
  name: string;
};

export type CustomerResults = {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Customer[];
};
