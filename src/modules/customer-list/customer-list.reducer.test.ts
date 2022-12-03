import { AnyAction } from 'redux';
import { customerListReducer, CustomerListState } from './customer-list.reducer';
import { customerActions } from '../customer/customer.actions';
import { Customer } from '../customer/customer.types';

describe('Customer reducer', () => {
  describe('load customers', () => {
    it('should store loaded customer ids', () => {
      // arrange
      const action = customerActions.loadCustomersAction({
        customers: [customer1, customer2],
      });
      // act & assert
      expect(customerListReducer(defaultState, action)).toEqual({
        customerIds: [1, 2],
      });
    });

    it('should add loaded customer ids to previous state', () => {
      // arrange
      const state = {
        customerIds: [1],
      };
      const action = customerActions.loadCustomersAction({
        customers: [customer2],
      });
      // act & assert
      expect(customerListReducer(state, action)).toEqual({
        customerIds: [1, 2],
      });
    });

    it('should ignore duplicated customers', () => {
      // arrange
      const state = {
        customerIds: [1],
      };
      const action = customerActions.loadCustomersAction({
        customers: [customer2, customer1],
      });
      // act & assert
      expect(customerListReducer(state, action)).toEqual({
        customerIds: [1, 2],
      });
    });
  });

  describe('delete customer', () => {
    it('should remove a deleted customer id', () => {
      // arrange
      const state = {
        customerIds: [1, 2],
      };
      const action = customerActions.deleteCustomerAction({
        customerId: 2,
      });
      // act & assert
      expect(customerListReducer(state, action)).toEqual({
        customerIds: [1],
      });
    });
  });

  describe('clear customers', () => {
    it('should clear all customer ids', () => {
      // arrange
      const state = {
        customerIds: [1, 2],
      };
      const action = customerActions.clearCustomersAction();
      // act & assert
      expect(customerListReducer(state, action)).toEqual({
        customerIds: [],
      });
    });
  });

  it('should return the default state by default', () => {
    // arrange
    const action = {
      type: 'TEST',
    } as AnyAction;
    // act & assert
    expect(customerListReducer(undefined, action)).toEqual(defaultState);
  });

  const defaultState: CustomerListState = {
    customerIds: [],
  };

  const customer1 = { id: 1, name: 'test1', email: 'test1@test.com', address: 'test1' } as Customer;
  const customer2 = { id: 2, name: 'test2', email: 'test2@test.com', address: 'test2' } as Customer;
});
