import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { customerCommands } from '../../customer/customer.commands';
import { Customer } from '../../customer/customer.types';
import { BOCustomerListItem } from './customer-list-item.component';
import { useHistory } from 'react-router-dom';
import { BOPageHeader } from '../../shared/components/page-header.component';
import '../../../theme/index.scss';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';

const HEADER_IMAGE_URL = 'https://bit.ly/33sx3Vu';
const HEADER_HEIGHT = 430;
const LIST_ITEM_HEIGHT = 62;

export const BOCustomerList: FC = () => {
  const history = useHistory();
  const { height } = useWindowDimensions();

  const limit = useMemo(() => (height - HEADER_HEIGHT) / LIST_ITEM_HEIGHT + 1, [height]);

  const customers = useSelector<ApplicationStore, Customer[]>((state) => {
    const customerIds = state.ui.customerList.customerIds;
    return customerIds?.map((customerId) => state.entities.customers.byId[customerId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);
  const { isBottom } = useInfiniteScroll();

  useEffect(() => {
    if (isBottom) {
      incrementPage();
    }
  }, [isBottom]);

  useEffect(() => {
    setLoading(true);
    if (page === 1) {
      customerCommands.clearCustomers();
    }
    customerCommands.loadCustomers(page, limit).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [page]);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const createCustomer = () => history.push('/customer');

  return (
    <>
      <BOPageHeader title="Customers" backgroundImageUrl={HEADER_IMAGE_URL} />
      <div className="page">
        <button onClick={createCustomer}>Create customer</button>

        {isLoading && !customers?.length && <div>Loading customers...</div>}
        {isError && <div>Error loading customers, please refresh page.</div>}

        <div className="list">
          {customers?.map((customer: Customer) => (
            <BOCustomerListItem key={customer.id} customer={customer} />
          ))}
        </div>

        {customers?.length > 0 && isLoading && <div>Loading customers...</div>}
      </div>
    </>
  );
};
