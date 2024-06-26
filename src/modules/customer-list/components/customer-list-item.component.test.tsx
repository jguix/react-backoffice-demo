import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Customer } from '../../customer/customer.types';
import { BOCustomerListItem } from './customer-list-item.component';

describe('Customer list item', () => {
  it('should render a link with 3 lines of text', () => {
    const customer: Customer = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      address: '12 Elm Street, London',
    };

    render(
      <HashRouter>
        <BOCustomerListItem customer={customer} />
      </HashRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '#/customer/1');
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('12 Elm Street, London')).toBeInTheDocument();
  });
});
