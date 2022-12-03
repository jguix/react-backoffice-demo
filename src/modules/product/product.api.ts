import axios from 'axios';
import { OrderType } from '../shared/shared.types';
import { Product } from './product.types';

const loadProducts = (page: number, limit: number, order: OrderType): Promise<Product[]> =>
  axios.get<Product[]>(`/products?_page=${page}&_limit=${limit}&_sort=name&_order=${order}`).then(({ data }) => data);

const loadProduct = (productId: number): Promise<Product> =>
  axios.get(`/products/${productId}`).then(({ data }) => data);

const saveProduct = (product: Product): Promise<number> => axios.post('/products', product).then(({ data }) => data);

const updateProduct = (product: Product): Promise<number> =>
  axios.put(`/products/${product.id}/`, product).then(({ data }) => data);

const deleteProduct = (productId: number): Promise<void> =>
  axios.delete(`/products/${productId}`).then(() => undefined);

export const productApi = { deleteProduct, loadProduct, loadProducts, saveProduct, updateProduct };
