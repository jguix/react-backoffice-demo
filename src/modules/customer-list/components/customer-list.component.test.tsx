import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { store } from '../../../store/store';
import { BOCustomerList } from './customer-list.component';

const mock = new MockAdapter(axios, { delayResponse: 500 });

beforeEach(() => {
  mock.onGet(new RegExp('/customers.*')).reply(200, customersMock);
});

describe('Customer list', () => {
  it('should render the customer list', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <BOCustomerList />
        </HashRouter>
      </Provider>
    );

    await waitFor(() => screen.getByTestId('customer-list-loading'));
    expect(screen.queryByTestId('customer-list-item')).not.toBeInTheDocument();
    expect(screen.getByText('Loading customers...')).toBeVisible();

    await waitFor(() => screen.getAllByTestId('customer-list-item'), { timeout: 1000 });
    expect(screen.getAllByTestId('customer-list-item').length).toBe(10);
    expect(screen.queryByText('Loading customers...')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Error loading customers, please refresh page.')
    ).not.toBeInTheDocument();
  });

  it('should handle server error', async () => {
    mock.onGet(new RegExp('/customers.*')).reply(500);

    render(
      <Provider store={store}>
        <HashRouter>
          <BOCustomerList />
        </HashRouter>
      </Provider>
    );

    await waitFor(() => screen.getByTestId('customer-list-error'));
    expect(screen.getByText('Error loading customers, please refresh page.')).toBeVisible();
  });
});

const customersMock = {
  data: [
    {
      address: '028 Nikolaus Valleys, 72202-5046, Lake Alejandraburgh, Angola',
      email: 'Abbigail.Rutherford@hotmail.com',
      id: 1,
      name: 'Abbigail Rutherford',
    },
    {
      address: '7545 Dach Passage, 65090-6154, Schmelerfurt, Morocco',
      email: 'Enoch.Hamill99@hotmail.com',
      id: 2,
      name: 'Enoch Hamill',
    },
    {
      address: '387 Harris River, 45489, Kozeybury, United States Minor Outlying Islands',
      email: 'Brenna.Parker@yahoo.com',
      id: 3,
      name: 'Ms. Brenna Parker',
    },
    {
      address: '7040 Trystan Port, 05533, Alexandrinefort, Saint Vincent and the Grenadines',
      email: 'Rosalinda_Borer2@hotmail.com',
      id: 4,
      name: 'Miss Rosalinda Borer',
    },
    {
      address: '37015 Orn Port, 81471, North Tysonshire, Lebanon',
      email: 'Trenton71@gmail.com',
      id: 5,
      name: "Trenton O'Conner",
    },
    {
      address: '87335 Alexa Courts, 01615, Alexysborough, Zimbabwe',
      email: 'Florencio_Kilback45@yahoo.com',
      id: 6,
      name: 'Florencio Kilback',
    },
    {
      address: '190 Lauren Lake, 06834-7051, McKenzieland, Sri Lanka',
      email: 'Alphonso.Volkman90@gmail.com',
      id: 7,
      name: 'Alphonso Volkman',
    },
    {
      address: '2491 Shirley Roads, 39300-8912, Ratkefurt, Saint Pierre and Miquelon',
      email: 'Bernadette_Farrell@yahoo.com',
      id: 8,
      name: 'Bernadette Farrell',
    },
    {
      address: '141 Langworth Cape, 97743, West Jammie, Benin',
      email: 'Opal_Adams@gmail.com',
      id: 9,
      name: 'Opal Adams',
    },
    {
      address: '108 Robel Alley, 44403, New Horace, San Marino',
      email: 'Miguel.Kiehn47@yahoo.com',
      id: 10,
      name: 'Miguel Kiehn Sr.',
    },
  ],
};
