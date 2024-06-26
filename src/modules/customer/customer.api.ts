import axios from 'axios';
import { OrderType } from '../shared/shared.types';
import { Customer, CustomerResults } from './customer.types';

const loadCustomers = (page: number, limit: number, order: OrderType): Promise<Customer[]> =>
  axios.get<CustomerResults>(`/api/customers?_page=${page}&_per_page=${limit}&_sort=name&_order=${order}`).then(({ data }) => data.data);

const loadCustomer = (customerId: number): Promise<Customer> =>
  axios.get(`/api/customers/${customerId}`).then(({ data }) => data);

const saveCustomer = (customer: Customer): Promise<number> =>
  axios.post('/api/customers', customer).then(({ data }) => data);

const updateCustomer = (customer: Customer): Promise<number> =>
  axios.put(`/api/customers/${customer.id}/`, customer).then(({ data }) => data);

const deleteCustomer = (customerId: number): Promise<void> =>
  axios.delete(`/api/customers/${customerId}`).then(() => undefined);

export const customerApi = { deleteCustomer, loadCustomer, loadCustomers, saveCustomer, updateCustomer };
