import { AnyAction } from 'redux';
import { customerReducer, CustomerState } from './customer.reducer';
import { customerActions } from './customer.actions';
import { Customer } from './customer.types';

describe('Customer reducer', () => {
  describe('load customers', () => {
    it('should load customers', () => {
      // arrange
      const action = customerActions.loadCustomersAction({
        customers: [customer1, customer2],
      });
      // act & assert
      expect(customerReducer(defaultState, action)).toEqual({
        byId: {
          1: customer1,
          2: customer2,
        },
      });
    });

    it('should add loaded customers to previous state', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
        },
      };
      const action = customerActions.loadCustomersAction({
        customers: [customer2],
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: customer1,
          2: customer2,
        },
      });
    });

    it('should ignore duplicated customers', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
        },
      };
      const action = customerActions.loadCustomersAction({
        customers: [customer2, customer1],
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: customer1,
          2: customer2,
        },
      });
    });
  });

  describe('load customer', () => {
    it('should load a customer', () => {
      // arrange
      const action = customerActions.loadCustomerAction({
        customer: customer1,
      });
      // act & assert
      expect(customerReducer(defaultState, action)).toEqual({
        byId: {
          1: customer1,
        },
      });
    });

    it('should add loaded customer to previous state', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
        },
      };
      const action = customerActions.loadCustomerAction({
        customer: customer2,
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: customer1,
          2: customer2,
        },
      });
    });

    it('should ignore duplicated customers', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
          2: customer2,
        },
      };
      const action = customerActions.loadCustomerAction({
        customer: customer1,
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: customer1,
          2: customer2,
        },
      });
    });
  });

  describe('save customer', () => {
    it('should save a customer', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
        },
      };
      const action = customerActions.saveCustomerAction({
        customerId: 2,
        customer: { name: 'test2', email: 'test2@test.com', address: 'test2' } as Customer,
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: customer1,
          2: { id: 2, name: 'test2', email: 'test2@test.com', address: 'test2' },
        },
      });
    });
  });

  describe('update customer', () => {
    it('should update a customer', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
        },
      };
      const action = customerActions.updateCustomerAction({
        customer: { ...customer1, name: 'test2' },
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: { id: 1, name: 'test2', email: 'test1@test.com', address: 'test1' },
        },
      });
    });
  });

  describe('delete customer', () => {
    it('should delete a customer', () => {
      // arrange
      const state = {
        byId: {
          1: customer1,
          2: customer2,
        },
      };
      const action = customerActions.deleteCustomerAction({
        customerId: 2,
      });
      // act & assert
      expect(customerReducer(state, action)).toEqual({
        byId: {
          1: customer1,
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
    expect(customerReducer(undefined, action)).toEqual(defaultState);
  });

  const defaultState: CustomerState = {
    byId: {},
  };

  const customer1 = { id: 1, name: 'test1', email: 'test1@test.com', address: 'test1' } as Customer;
  const customer2 = { id: 2, name: 'test2', email: 'test2@test.com', address: 'test2' } as Customer;
});
