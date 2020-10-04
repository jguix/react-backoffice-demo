import axios from 'axios';
import { OrderType } from '../shared/shared.types';
import { Customer } from './customer.types';

const loadCustomers = (page: number, limit: number, order: OrderType): Promise<Customer[]> =>
  axios.get<Customer[]>(`/customers?_page=${page}&_limit=${limit}&_sort=name&_order=${order}`).then(({ data }) => data);

const loadCustomer = (customerId: number): Promise<Customer> =>
  axios.get(`/customers/${customerId}`).then(({ data }) => data);

const saveCustomer = (customer: Customer): Promise<number> =>
  axios.post('/customers', customer).then(({ data }) => data);

const updateCustomer = (customer: Customer): Promise<number> =>
  axios.put(`/customers/${customer.id}/`, customer).then(({ data }) => data);

const deleteCustomer = (customerId: number): Promise<void> =>
  axios.delete(`/customers/${customerId}`).then(() => undefined);

export const customerApi = { deleteCustomer, loadCustomer, loadCustomers, saveCustomer, updateCustomer };
