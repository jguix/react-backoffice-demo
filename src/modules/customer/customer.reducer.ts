import { Customer } from './customer.types';
import {
  CustomerActionTypes,
  LoadCustomersAction,
  LoadCustomerAction,
  UpdateCustomerAction,
  SaveCustomerAction,
  DeleteCustomerAction,
} from './customer.actions';
import { NumberIndexed } from '../shared/shared.types';
import { AnyAction, combineReducers, Reducer } from 'redux';

export type CustomerState = {
  byId: NumberIndexed<Customer>;
};

export type CustomerStore = {
  customers: CustomerState;
};

export const customerByIdReducer = (state: NumberIndexed<Customer> = {}, action: AnyAction) => {
  switch (action.type) {
    case CustomerActionTypes.LOAD_CUSTOMERS: {
      const { payload: loadCustomersPayload } = action as LoadCustomersAction;
      const { customers: loadedCustomers } = loadCustomersPayload;
      const loadedCustomersMap = loadedCustomers.reduce(
        (map, customer) => ({ ...map, [customer.id]: customer }),
        {}
      );

      return {
        ...state,
        ...loadedCustomersMap,
      };
    }

    case CustomerActionTypes.LOAD_CUSTOMER: {
      const { payload: loadCustomerPayload } = action as LoadCustomerAction;
      const { customer: loadedCustomer } = loadCustomerPayload;

      return {
        ...state,
        [loadedCustomer.id]: loadedCustomer,
      };
    }

    case CustomerActionTypes.SAVE_CUSTOMER: {
      const { payload: saveCustomerPayload } = action as SaveCustomerAction;
      const { customerId: savedCustomerId, customer: savedCustomer } = saveCustomerPayload;

      return {
        ...state,
        [savedCustomerId]: { ...savedCustomer, id: savedCustomerId },
      };
    }

    case CustomerActionTypes.UPDATE_CUSTOMER: {
      const { payload: updateCustomerPayload } = action as UpdateCustomerAction;
      const { customer: updatedCustomer } = updateCustomerPayload;

      return {
        ...state,
        [updatedCustomer.id]: { ...updatedCustomer },
      };
    }

    case CustomerActionTypes.DELETE_CUSTOMER: {
      const { payload: deleteCustomerPayload } = action as DeleteCustomerAction;
      const { customerId } = deleteCustomerPayload;
      const mutableState = { ...state };
      delete mutableState[customerId];

      return {
        ...mutableState,
      };
    }
  }

  return state;
};

export const customerReducer: Reducer<CustomerState> = combineReducers({
  byId: customerByIdReducer,
});
