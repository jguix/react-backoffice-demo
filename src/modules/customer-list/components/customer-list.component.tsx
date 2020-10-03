import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { customerCommands } from '../../customer/customer.commands';
import { Customer } from '../../customer/customer.types';
import { RnCustomerListItem } from './customer-list-item.component';
import { useHistory } from 'react-router-dom';

const LIMIT = 10;

export const RnCustomerList: FC = () => {
  const history = useHistory();

  const customers = useSelector<ApplicationStore, Customer[]>((state) => {
    const customerIds = state.ui.customerList.customerIds;
    return customerIds?.map((customerId) => state.entities.customers.byId[customerId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    if (page === 1) {
      customerCommands.clearCustomers();
    }
    customerCommands.loadCustomers(page, LIMIT).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [page]);

  const incrementPage = () => setPage(page + 1);
  const createCustomer = () => history.push('/customer');

  return (
    <>
      <h1>Customers</h1>
      <button onClick={createCustomer}>Create customer</button>
      <hr />

      {isLoading && !customers?.length && <div>Loading customers...</div>}
      {isError && <div>Error loading customers, please refresh page.</div>}

      {customers?.map((customer: Customer) => (
        <RnCustomerListItem key={customer.id} customer={customer} />
      ))}

      {customers?.length > 0 && (
        <div>
          <hr />
          {isLoading ? <div>Loading customers...</div> : <button onClick={incrementPage}>Load next {LIMIT}</button>}
        </div>
      )}
    </>
  );
};
