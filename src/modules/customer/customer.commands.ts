import { customerActions } from './customer.actions';
import { OrderType } from '../shared/shared.types';
import { store } from '../../store/store';
import { customerApi } from './customer.api';
import { Customer } from './customer.types';

const clearCustomers = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    store.dispatch(customerActions.clearCustomersAction());
    resolve();
  });
};

const loadCustomers = (
  page: number = 1,
  limit: number = 5,
  order: OrderType = 'asc',
  invalidateCache: boolean = false
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isPageCached(page, limit)) {
      resolve();
    } else {
      customerApi.loadCustomers(page, limit, order).then(
        (customers) => {
          store.dispatch(
            customerActions.loadCustomersAction({
              customers,
            })
          );
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const loadCustomer = (customerId: number, invalidateCache: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!invalidateCache && isEntityCached(customerId)) {
      resolve();
    } else {
      customerApi.loadCustomer(customerId).then(
        (customer) => {
          store.dispatch(
            customerActions.loadCustomerAction({
              customer,
            })
          );
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    }
  });
};

const saveCustomer = (customer: Customer): Promise<void> => {
  return new Promise((resolve, reject) => {
    customerApi.saveCustomer(customer).then(
      (customerId) => {
        store.dispatch(
          customerActions.saveCustomerAction({
            customerId,
            customer,
          })
        );
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
};

const updateCustomer = (customer: Customer): Promise<void> => {
  return new Promise((resolve, reject) => {
    customerApi.updateCustomer(customer).then(
      () => {
        store.dispatch(
          customerActions.updateCustomerAction({
            customer,
          })
        );
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
};

const deleteCustomer = (customerId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    customerApi.deleteCustomer(customerId).then(
      (customer) => {
        store.dispatch(
          customerActions.deleteCustomerAction({
            customerId,
          })
        );
        resolve();
      },
      (error) => {
        console.log(error);
        reject();
      }
    );
  });
};

const isPageCached = (page: number, limit: number): boolean => {
  return store.getState().ui.customerList.customerIds.length >= page * limit;
};

const isEntityCached = (customerId: number): boolean => {
  return !!store.getState().entities.customers.byId[customerId];
};

export const customerCommands = {
  clearCustomers,
  loadCustomers,
  loadCustomer,
  saveCustomer,
  updateCustomer,
  deleteCustomer,
};
