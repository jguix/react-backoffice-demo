import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { store } from '../../../store/store';
import { BOProductList } from './product-list.component';

const mock = new MockAdapter(axios, { delayResponse: 500 });

beforeEach(() => {
  mock.onGet(new RegExp('/products.*')).reply(200, productsMock);
})

describe('Product list', () => {
  it('should render the product list', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <BOProductList />
        </HashRouter>
      </Provider>
    );
    await waitFor(() => screen.getByTestId('product-list-loading'));
    expect(screen.queryByTestId('product-list-item')).not.toBeInTheDocument();
    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    await waitFor(() => screen.getAllByTestId('product-list-item'), { timeout: 1000 });
    expect(screen.getAllByTestId('product-list-item').length).toBe(10);
    expect(screen.queryByText('Loading products...')).not.toBeInTheDocument();
    expect(screen.queryByText('Error loading products, please refresh page.')).not.toBeInTheDocument();
  });

  it('should handle server error', async () => {
    mock.onGet(new RegExp('/products.*')).reply(500);

    render(
      <Provider store={store}>
        <HashRouter>
          <BOProductList />
        </HashRouter>
      </Provider>
    );

    await waitFor(() => screen.getByTestId('product-list-error'));
    expect(screen.getByText('Error loading products, please refresh page.')).toBeInTheDocument();
  });
});

const productsMock = {
  data: [
  {
    id: 1,
    name: 'Handcrafted Rubber Chips',
    photo: 'http://placeimg.com/640/480/abstract',
    price: 883,
  },
  {
    id: 2,
    name: 'Practical Plastic Chair',
    photo: 'http://placeimg.com/640/480/fashion',
    price: 890,
  },
  {
    id: 3,
    name: 'Ergonomic Frozen Towels',
    photo: 'http://placeimg.com/640/480/animals',
    price: 943,
  },
  {
    id: 4,
    name: 'Generic Cotton Cheese',
    photo: 'http://placeimg.com/640/480/business',
    price: 704,
  },
  {
    id: 5,
    name: 'Handmade Rubber Chips',
    photo: 'http://placeimg.com/640/480/cats',
    price: 838,
  },
  {
    id: 6,
    name: 'Handmade Concrete Pizza',
    photo: 'http://placeimg.com/640/480/technics',
    price: 695,
  },
  {
    id: 7,
    name: 'Rustic Wooden Chicken',
    photo: 'http://placeimg.com/640/480/nightlife',
    price: 248,
  },
  {
    id: 8,
    name: 'Tasty Concrete Chips',
    photo: 'http://placeimg.com/640/480/abstract',
    price: 171,
  },
  {
    id: 9,
    name: 'Generic Wooden Shoes',
    photo: 'http://placeimg.com/640/480/abstract',
    price: 772,
  },
  {
    id: 10,
    name: 'Gorgeous Soft Chicken',
    photo: 'http://placeimg.com/640/480/business',
    price: 881,
  },
]};
