import axios from 'axios';
import { OrderType } from '../shared/shared.types';
import { Product, ProductResults } from './product.types';

const loadProducts = (page: number, limit: number, order: OrderType): Promise<Product[]> =>
  axios.get<ProductResults>(`/api/products?_page=${page}&_per_page=${limit}&_sort=name&_order=${order}`).then(({ data }) => data.data);

const loadProduct = (productId: number): Promise<Product> =>
  axios.get(`/api/products/${productId}`).then(({ data }) => data);

const saveProduct = (product: Product): Promise<number> => axios.post('/api/products', product).then(({ data }) => data);

const updateProduct = (product: Product): Promise<number> =>
  axios.put(`/api/products/${product.id}/`, product).then(({ data }) => data);

const deleteProduct = (productId: number): Promise<void> =>
  axios.delete(`/api/products/${productId}`).then(() => undefined);

export const productApi = { deleteProduct, loadProduct, loadProducts, saveProduct, updateProduct };
