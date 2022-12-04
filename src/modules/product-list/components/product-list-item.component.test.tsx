import { render, screen } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Customer } from '../../customer/customer.types';
import { Product } from '../../product/product.types';
import { BOProductListItem } from './product-list-item.component';

describe('Product list item', () => {
  it('should render a link with 2 lines of text', () => {
    const product: Product = {
      id: 1,
      name: 'White Shoes',
      photo: 'http://example.com/photo',
      price: 20,
    };

    render(
      <HashRouter>
        <BOProductListItem product={product} />
      </HashRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '#/product/1');
    expect(screen.getByText('White Shoes')).toBeInTheDocument();
    expect(screen.getByText('20 €')).toBeInTheDocument();
  });
});
