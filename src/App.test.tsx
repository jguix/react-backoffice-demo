import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Customer } from './modules/customer/customer.types';
import { Product } from './modules/product/product.types';
import { store } from './store/store';
import { authActions } from './modules/auth/auth.actions';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get('/customers', (_, res, ctx) => {
    return res(ctx.json(customersMock));
  }),
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.json(productsMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  describe('before logging in', () => {
    it('should render login page by default', () => {
      render(<App />);

      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByText('Start Session')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button').textContent).toBe('Login');
    });

    it('should login and render customers page by default', async () => {
      render(<App />);
      const emailInput = screen.getByTestId('login-username-input');
      const passwordInput = screen.getByTestId('login-password-input');
      const loginButton = screen.getByTestId('login-button');

      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, '1234');
      userEvent.click(loginButton);

      await waitFor(() => screen.getByTestId('customer-list'));
      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByTestId('hero').textContent).toBe('Customers');
      expect(screen.getAllByRole('button')[1].textContent).toBe('Create customer');
    });
  });
});

const customersMock: Customer[] = [
  {
    address: '028 Nikolaus Valleys, 72202-5046, Lake Alejandraburgh, Angola',
    email: 'Abbigail.Rutherford@hotmail.com',
    id: 1,
    name: 'Abbigail Rutherford',
  },
];
const productsMock: Product[] = [
  {
    id: 1,
    name: 'Handcrafted Rubber Chips',
    photo: 'http://placeimg.com/640/480/abstract',
    price: 883,
  },
];
