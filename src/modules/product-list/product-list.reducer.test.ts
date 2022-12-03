import { AnyAction } from 'redux';
import { productListReducer, ProductListState } from './product-list.reducer';
import { productActions } from '../product/product.actions';
import { Product } from '../product/product.types';

describe('Product reducer', () => {
  describe('load products', () => {
    it('should store loaded product ids', () => {
      // arrange
      const action = productActions.loadProductsAction({
        products: [product1, product2],
      });
      // act & assert
      expect(productListReducer(defaultState, action)).toEqual({
        productIds: [1, 2],
      });
    });

    it('should add loaded product ids to previous state', () => {
      // arrange
      const state = {
        productIds: [1],
      };
      const action = productActions.loadProductsAction({
        products: [product2],
      });
      // act & assert
      expect(productListReducer(state, action)).toEqual({
        productIds: [1, 2],
      });
    });

    it('should ignore duplicated products', () => {
      // arrange
      const state = {
        productIds: [1],
      };
      const action = productActions.loadProductsAction({
        products: [product2, product1],
      });
      // act & assert
      expect(productListReducer(state, action)).toEqual({
        productIds: [1, 2],
      });
    });
  });

  describe('delete product', () => {
    it('should remove a deleted product id', () => {
      // arrange
      const state = {
        productIds: [1, 2],
      };
      const action = productActions.deleteProductAction({
        productId: 2,
      });
      // act & assert
      expect(productListReducer(state, action)).toEqual({
        productIds: [1],
      });
    });
  });

  describe('clear products', () => {
    it('should clear all product ids', () => {
      // arrange
      const state = {
        productIds: [1, 2],
      };
      const action = productActions.clearProductsAction();
      // act & assert
      expect(productListReducer(state, action)).toEqual({
        productIds: [],
      });
    });
  });

  it('should return the default state by default', () => {
    // arrange
    const action = {
      type: 'TEST',
    } as AnyAction;
    // act & assert
    expect(productListReducer(undefined, action)).toEqual(defaultState);
  });

  const defaultState: ProductListState = {
    productIds: [],
  };

  const product1 = { id: 1, name: 'test1', price: 10, photo: 'test1' } as Product;
  const product2 = { id: 2, name: 'test2', price: 20, photo: 'test2' } as Product;
});
