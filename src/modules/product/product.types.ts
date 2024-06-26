export type Product = {
  id: number;
  name: string;
  photo: string;
  price: number;
};

export type ProductResults = {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Product[];
};