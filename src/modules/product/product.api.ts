import { OrderType } from '../shared/shared.types';
import { Product } from './product.types';

const loadProducts = (page: number, limit: number, order: OrderType): Promise<Product[]> => {
  return fetch(`/products?_page=${page}&_limit=${limit}&_sort=name&_order=${order}`).then((response) =>
    response.json()
  );
};

const loadProduct = (productId: number): Promise<Product> => {
  return fetch(`/products/${productId}`).then((response) => response.json());
};

const saveProduct = (product: Product): Promise<number> => {
  return fetch('/products', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

const updateProduct = (product: Product): Promise<number> => {
  return fetch(`/products/${product.id}/`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

const deleteProduct = (productId: number): Promise<void> => {
  return fetch(`/products/${productId}`, {
    method: 'delete',
  }).then(() => undefined);
};

export const productApi = { deleteProduct, loadProduct, loadProducts, saveProduct, updateProduct };
