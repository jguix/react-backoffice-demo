import { Customer } from './customer.types';

export enum CustomerActionTypes {
  LOAD_CUSTOMERS = 'LOAD_CUSTOMERS',
  LOAD_CUSTOMER = 'LOAD_CUSTOMER',
  SAVE_CUSTOMER = 'SAVE_CUSTOMER',
  UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  CLEAR_CUSTOMERS = 'CLEAR_CUSTOMERS',
}

export type ClearCustomersAction = {
  type: CustomerActionTypes.CLEAR_CUSTOMERS;
};

const clearCustomersAction = (): ClearCustomersAction => {
  return {
    type: CustomerActionTypes.CLEAR_CUSTOMERS,
  };
};

export type LoadCustomersPayload = {
  customers: Customer[];
};

export type LoadCustomersAction = {
  type: CustomerActionTypes.LOAD_CUSTOMERS;
  payload: LoadCustomersPayload;
};

const loadCustomersAction = (payload: LoadCustomersPayload): LoadCustomersAction => {
  return {
    payload,
    type: CustomerActionTypes.LOAD_CUSTOMERS,
  };
};

export type LoadCustomerPayload = {
  customer: Customer;
};

export type LoadCustomerAction = {
  type: CustomerActionTypes.LOAD_CUSTOMER;
  payload: LoadCustomerPayload;
};

const loadCustomerAction = (payload: LoadCustomerPayload): LoadCustomerAction => {
  return {
    payload,
    type: CustomerActionTypes.LOAD_CUSTOMER,
  };
};

export type SaveCustomerPayload = {
  customerId: number;
  customer: Customer;
};

export type SaveCustomerAction = {
  type: CustomerActionTypes.SAVE_CUSTOMER;
  payload: SaveCustomerPayload;
};

const saveCustomerAction = (payload: SaveCustomerPayload): SaveCustomerAction => {
  return {
    payload,
    type: CustomerActionTypes.SAVE_CUSTOMER,
  };
};

export type UpdateCustomerPayload = {
  customer: Customer;
};

export type UpdateCustomerAction = {
  type: CustomerActionTypes.UPDATE_CUSTOMER;
  payload: UpdateCustomerPayload;
};

const updateCustomerAction = (payload: UpdateCustomerPayload): UpdateCustomerAction => {
  return {
    payload,
    type: CustomerActionTypes.UPDATE_CUSTOMER,
  };
};

export type DeleteCustomerPayload = {
  customerId: number;
};

export type DeleteCustomerAction = {
  type: CustomerActionTypes.DELETE_CUSTOMER;
  payload: DeleteCustomerPayload;
};

const deleteCustomerAction = (payload: DeleteCustomerPayload): DeleteCustomerAction => {
  return {
    payload,
    type: CustomerActionTypes.DELETE_CUSTOMER,
  };
};

export const customerActions = {
  clearCustomersAction,
  loadCustomersAction,
  loadCustomerAction,
  saveCustomerAction,
  updateCustomerAction,
  deleteCustomerAction,
};
