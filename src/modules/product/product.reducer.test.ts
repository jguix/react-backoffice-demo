import { AnyAction } from 'redux';
import { productReducer, ProductState } from './product.reducer';
import { productActions } from './product.actions';
import { Product } from './product.types';

describe('Product reducer', () => {
  describe('load products', () => {
    it('should load products', () => {
      // arrange
      const action = productActions.loadProductsAction({
        products: [product1, product2],
      });
      // act & assert
      expect(productReducer(defaultState, action)).toEqual({
        byId: {
          1: product1,
          2: product2,
        },
      });
    });

    it('should add loaded products to previous state', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
        },
      };
      const action = productActions.loadProductsAction({
        products: [product2],
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: product1,
          2: product2,
        },
      });
    });

    it('should ignore duplicated products', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
        },
      };
      const action = productActions.loadProductsAction({
        products: [product2, product1],
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: product1,
          2: product2,
        },
      });
    });
  });

  describe('load product', () => {
    it('should load a product', () => {
      // arrange
      const action = productActions.loadProductAction({
        product: product1,
      });
      // act & assert
      expect(productReducer(defaultState, action)).toEqual({
        byId: {
          1: product1,
        },
      });
    });

    it('should add loaded product to previous state', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
        },
      };
      const action = productActions.loadProductAction({
        product: product2,
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: product1,
          2: product2,
        },
      });
    });

    it('should ignore duplicated products', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
          2: product2,
        },
      };
      const action = productActions.loadProductAction({
        product: product1,
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: product1,
          2: product2,
        },
      });
    });
  });

  describe('save product', () => {
    it('should save a product', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
        },
      };
      const action = productActions.saveProductAction({
        productId: 2,
        product: { name: 'test2', price: 20, photo: 'test2' } as Product,
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: product1,
          2: { id: 2, name: 'test2', price: 20, photo: 'test2' },
        },
      });
    });
  });

  describe('update product', () => {
    it('should update a product', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
        },
      };
      const action = productActions.updateProductAction({
        product: { ...product1, name: 'test2' },
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: { id: 1, name: 'test2', price: 10, photo: 'test1' },
        },
      });
    });
  });

  describe('delete product', () => {
    it('should delete a product', () => {
      // arrange
      const state = {
        byId: {
          1: product1,
          2: product2,
        },
      };
      const action = productActions.deleteProductAction({
        productId: 2,
      });
      // act & assert
      expect(productReducer(state, action)).toEqual({
        byId: {
          1: product1,
        },
      });
    });
  });

  it('should return the default state by default', () => {
    // arrange
    const action = {
      type: 'TEST',
    } as AnyAction;
    // act & assert
    expect(productReducer(undefined, action)).toEqual(defaultState);
  });

  const defaultState: ProductState = {
    byId: {},
  };

  const product1 = { id: 1, name: 'test1', price: 10, photo: 'test1' } as Product;
  const product2 = { id: 2, name: 'test2', price: 20, photo: 'test2' } as Product;
});
