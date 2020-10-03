import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '../../customer/customer.types';

type Props = {
  customer: Customer;
};

export const BOCustomerListItem: FC<Props> = ({ customer }) => {
  return (
    <Link key={customer.id} to={`/customer/${customer.id}`}>
      <div>{customer.name}</div>
    </Link>
  );
};
