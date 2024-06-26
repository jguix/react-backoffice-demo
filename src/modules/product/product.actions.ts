import { Product } from './product.types';

export enum ProductActionTypes {
  LOAD_PRODUCTS = 'LOAD_PRODUCTS',
  LOAD_PRODUCT = 'LOAD_PRODUCT',
  SAVE_PRODUCT = 'SAVE_PRODUCT',
  UPDATE_PRODUCT = 'UPDATE_PRODUCT',
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  CLEAR_PRODUCTS = 'CLEAR_PRODUCTS',
}

export type ClearProductsAction = {
  type: ProductActionTypes.CLEAR_PRODUCTS;
};

const clearProductsAction = (): ClearProductsAction => {
  return {
    type: ProductActionTypes.CLEAR_PRODUCTS,
  };
};

export type LoadProductsPayload = {
  products: Product[];
};

export type LoadProductsAction = {
  type: ProductActionTypes.LOAD_PRODUCTS;
  payload: LoadProductsPayload;
};

const loadProductsAction = (payload: LoadProductsPayload): LoadProductsAction => {
  return {
    payload,
    type: ProductActionTypes.LOAD_PRODUCTS,
  };
};

export type LoadProductPayload = {
  product: Product;
};

export type LoadProductAction = {
  type: ProductActionTypes.LOAD_PRODUCT;
  payload: LoadProductPayload;
};

const loadProductAction = (payload: LoadProductPayload): LoadProductAction => {
  return {
    payload,
    type: ProductActionTypes.LOAD_PRODUCT,
  };
};

export type SaveProductPayload = {
  productId: number;
  product: Product;
};

export type SaveProductAction = {
  type: ProductActionTypes.SAVE_PRODUCT;
  payload: SaveProductPayload;
};

const saveProductAction = (payload: SaveProductPayload): SaveProductAction => {
  return {
    payload,
    type: ProductActionTypes.SAVE_PRODUCT,
  };
};

export type UpdateProductPayload = {
  product: Product;
};

export type UpdateProductAction = {
  type: ProductActionTypes.UPDATE_PRODUCT;
  payload: UpdateProductPayload;
};

const updateProductAction = (payload: UpdateProductPayload): UpdateProductAction => {
  return {
    payload,
    type: ProductActionTypes.UPDATE_PRODUCT,
  };
};

export type DeleteProductPayload = {
  productId: number;
};

export type DeleteProductAction = {
  type: ProductActionTypes.DELETE_PRODUCT;
  payload: DeleteProductPayload;
};

const deleteProductAction = (payload: DeleteProductPayload): DeleteProductAction => {
  return {
    payload,
    type: ProductActionTypes.DELETE_PRODUCT,
  };
};

export const productActions = {
  clearProductsAction,
  loadProductsAction,
  loadProductAction,
  saveProductAction,
  updateProductAction,
  deleteProductAction,
};
