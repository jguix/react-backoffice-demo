import { Product } from './product.types';
import {
  ProductActionTypes,
  LoadProductsAction,
  LoadProductAction,
  UpdateProductAction,
  SaveProductAction,
  DeleteProductAction,
} from './product.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';

export type ProductState = {
  byId: NumberIndexed<Product>;
};

export type ProductStore = {
  products: ProductState;
};

export const productByIdReducer = (state: NumberIndexed<Product> = {}, action: AnyAction) => {
  switch (action.type) {
    case ProductActionTypes.LOAD_PRODUCTS:
      const { payload: loadProductsPayload } = action as LoadProductsAction;
      const { products: loadedProducts } = loadProductsPayload;
      const loadedProductsMap = loadedProducts.reduce((map, product) => ({ ...map, [product.id]: product }), {});

      return {
        ...state,
        ...loadedProductsMap,
      };

    case ProductActionTypes.LOAD_PRODUCT:
      const { payload: loadProductPayload } = action as LoadProductAction;
      const { product: loadedProduct } = loadProductPayload;

      return {
        ...state,
        [loadedProduct.id]: loadedProduct,
      };

    case ProductActionTypes.SAVE_PRODUCT:
      const { payload: saveProductPayload } = action as SaveProductAction;
      const { productId: savedProductId, product: savedProduct } = saveProductPayload;

      return {
        ...state,
        [savedProductId]: { ...savedProduct, id: savedProductId },
      };

    case ProductActionTypes.UPDATE_PRODUCT:
      const { payload: updateProductPayload } = action as UpdateProductAction;
      const { product: updatedProduct } = updateProductPayload;

      return {
        ...state,
        [updatedProduct.id]: { ...updatedProduct },
      };

    case ProductActionTypes.DELETE_PRODUCT:
      const { payload: deleteProductPayload } = action as DeleteProductAction;
      const { productId } = deleteProductPayload;
      const mutableState = { ...state };
      delete mutableState[productId];

      return {
        ...mutableState,
      };
  }

  return state;
};

export const productReducer: Reducer<ProductState> = combineReducers({
  byId: productByIdReducer,
});
