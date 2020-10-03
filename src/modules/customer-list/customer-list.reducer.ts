import { AnyAction, combineReducers, Reducer } from 'redux';
import { CustomerActionTypes, DeleteCustomerAction, LoadCustomersAction } from '../customer/customer.actions';
import { arrayDistinct } from '../shared/shared.domain';

export type CustomerListState = {
  customerIds: number[];
};

export type CustomerListStore = {
  customerList: CustomerListState;
};

export const customerIdsReducer = (state: number[] = [], action: AnyAction) => {
  switch (action.type) {
    case CustomerActionTypes.LOAD_CUSTOMERS:
      const { payload: loadCustomersPayload } = action as LoadCustomersAction;
      const { customers } = loadCustomersPayload;
      const customerIds = customers.map((customer) => customer.id);
      return arrayDistinct([...state, ...customerIds]);

    case CustomerActionTypes.DELETE_CUSTOMER:
      const { payload: deleteCustomerPayload } = action as DeleteCustomerAction;
      const { customerId } = deleteCustomerPayload;
      return [...state.filter((id) => id !== customerId)];

    case CustomerActionTypes.CLEAR_CUSTOMERS:
      return [];
  }

  return state;
};

export const customerListReducer: Reducer<CustomerListState> = combineReducers({
  customerIds: customerIdsReducer,
});
