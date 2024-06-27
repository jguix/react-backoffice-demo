import { productActions } from './product.actions';
import { OrderType } from '../shared/shared.types';
import { store } from '../../store/store';
import { productApi } from './product.api';
import { Product } from './product.types';

const clearProducts = (): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(productActions.clearProductsAction());
    resolve();
  });
};

const loadProducts = (
  page: number = 1,
  limit: number = 5,
  order: OrderType = 'asc',
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isPageCached(page, limit)) {
      resolve();
    } else {
      productApi.loadProducts(page, limit, order).then(
        (products) => {
          store.dispatch(
            productActions.loadProductsAction({
              products,
            })
          );
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const loadProduct = (productId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isEntityCached(productId)) {
      resolve();
    } else {
      productApi.loadProduct(productId).then(
        (product) => {
          store.dispatch(
            productActions.loadProductAction({
              product,
            })
          );
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const saveProduct = (product: Product): Promise<void> => {
  return new Promise((resolve, reject) => {
    productApi.saveProduct(product).then(
      (productId) => {
        store.dispatch(
          productActions.saveProductAction({
            productId,
            product,
          })
        );
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
};

const updateProduct = (product: Product): Promise<void> => {
  return new Promise((resolve, reject) => {
    productApi.updateProduct(product).then(
      () => {
        store.dispatch(
          productActions.updateProductAction({
            product,
          })
        );
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
};

const deleteProduct = (productId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    productApi.deleteProduct(productId).then(
      () => {
        store.dispatch(
          productActions.deleteProductAction({
            productId,
          })
        );
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
};

const isPageCached = (page: number, limit: number): boolean => {
  return store.getState().ui.productList.productIds.length >= page * limit;
};

const isEntityCached = (productId: number): boolean => {
  return !!store.getState().entities.products.byId[productId];
};

export const productCommands = {
  clearProducts,
  loadProducts,
  loadProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
};
