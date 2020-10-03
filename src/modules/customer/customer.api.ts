import { OrderType } from '../shared/shared.types';
import { Customer } from './customer.types';

const loadCustomers = (page: number, limit: number, order: OrderType): Promise<Customer[]> => {
  return fetch(`/customers?_page=${page}&_limit=${limit}&_sort=name&_order=${order}`).then((response) =>
    response.json()
  );
};

const loadCustomer = (customerId: number): Promise<Customer> => {
  return fetch(`/customers/${customerId}`).then((response) => response.json());
};

const saveCustomer = (customer: Customer): Promise<number> => {
  return fetch('/customers', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  }).then((response) => response.json());
};

const updateCustomer = (customer: Customer): Promise<number> => {
  return fetch(`/customers/${customer.id}/`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  }).then((response) => response.json());
};

const deleteCustomer = (customerId: number): Promise<void> => {
  return fetch(`/customers/${customerId}`, {
    method: 'delete',
  }).then(() => undefined);
};

export const customerApi = { deleteCustomer, loadCustomer, loadCustomers, saveCustomer, updateCustomer };
