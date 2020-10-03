import { AnyAction, combineReducers, Reducer } from 'redux';
import { ProductActionTypes, DeleteProductAction, LoadProductsAction } from '../product/product.actions';
import { arrayDistinct } from '../shared/shared.domain';

export type ProductListState = {
  productIds: number[];
};

export type ProductListStore = {
  productList: ProductListState;
};

export const productIdsReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case ProductActionTypes.LOAD_PRODUCTS:
      const { payload: loadProductsPayload } = action as LoadProductsAction;
      const { products } = loadProductsPayload;
      const productIds = products.map((product) => product.id);
      return arrayDistinct([...state, ...productIds]);

    case ProductActionTypes.DELETE_PRODUCT:
      const { payload: deleteProductPayload } = action as DeleteProductAction;
      const { productId } = deleteProductPayload;
      return [...state.filter((id) => id !== productId)];

    case ProductActionTypes.CLEAR_PRODUCTS:
      return [];
  }

  return state;
};

export const productListReducer: Reducer<ProductListState> = combineReducers({
  productIds: productIdsReducer,
});
