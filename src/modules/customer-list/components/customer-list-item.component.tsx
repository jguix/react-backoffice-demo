import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '../../customer/customer.types';
import '../../../theme/index.scss';

type Props = {
  customer: Customer;
};

export const BOCustomerListItem: FC<Props> = ({ customer }) => {
  return (
    <div data-testid="customer-list-item" className="listItem">
      <Link key={customer.id} to={`/customer/${customer.id}`}>
        <div className="listTitle">{customer.name}</div>
        <div className="listText">{customer.email}</div>
        <div className="listText">{customer.address}</div>
      </Link>
    </div>
  );
};
