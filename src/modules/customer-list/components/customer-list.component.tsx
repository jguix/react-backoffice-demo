import React, { FC, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { customerCommands } from '../../customer/customer.commands';
import { Customer } from '../../customer/customer.types';
import { BOCustomerListItem } from './customer-list-item.component';
import { useHistory } from 'react-router-dom';
import { BOPageTitle } from '../../shared/components/page-header.component';
import '../../../theme/index.scss';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

const LIMIT = 10;
const IMAGE_URL = 'https://bit.ly/33sx3Vu';

export const BOCustomerList: FC = () => {
  const history = useHistory();

  const customers = useSelector<ApplicationStore, Customer[]>((state) => {
    const customerIds = state.ui.customerList.customerIds;
    return customerIds?.map((customerId) => state.entities.customers.byId[customerId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);
  const {isBottom} = useInfiniteScroll();

  const incrementPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);
  
  const createCustomer = () => history.push('/customer');

  useEffect(() => {
    if (isBottom) {
      incrementPage();
    }
  }, [isBottom, incrementPage]);

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

  return (
    <>
      <BOPageTitle title="Customers" backgroundImageUrl={IMAGE_URL} />
      <div className="page">
        <button onClick={createCustomer}>Create customer</button>

        {isLoading && !customers?.length && <div>Loading customers...</div>}
        {isError && <div>Error loading customers, please refresh page.</div>}

        <div className="list">
          {customers?.map((customer: Customer) => (
            <BOCustomerListItem key={customer.id} customer={customer} />
          ))}
        </div>

        {customers?.length > 0 && (
            isLoading && <div>Loading customers...</div> 
        )}
      </div>
    </>
  );
};
