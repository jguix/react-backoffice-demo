import { combineReducers, Reducer } from 'redux';
import { createStore } from 'redux';
import { productReducer, ProductStore } from '../modules/product/product.reducer';
import { customerReducer, CustomerStore } from '../modules/customer/customer.reducer';
import { customerListReducer, CustomerListStore } from '../modules/customer-list/customer-list.reducer';
import { productListReducer, ProductListStore } from '../modules/product-list/product-list.reducer';
import { authReducer, AuthStore } from '../modules/auth/auth.reducer';

export type EntitiesStore = CustomerStore & ProductStore;

export type UIStore = AuthStore & CustomerListStore & ProductListStore;

export type ApplicationStore = {
  entities: EntitiesStore;
  ui: UIStore;
};

export const entitiesReducer = combineReducers({
  customers: customerReducer,
  products: productReducer,
});

export const uiReducer = combineReducers({
  auth: authReducer,
  customerList: customerListReducer,
  productList: productListReducer,
});

export const rootReducer: Reducer<ApplicationStore> = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export const store = createStore(rootReducer);
