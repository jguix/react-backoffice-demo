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

const handlers = [
  rest.get('/customers', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(customersMock));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsMock));
  }),
];

const server = setupServer(...handlers);

describe('App', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('before logging in', () => {
    it('should render login page by default', () => {
      render(<App />);

      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByText('Start Session')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button').textContent).toBe('Login');
    });

    it('should login then render customers page by default', async () => {
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

  describe('after logging in', () => {
    it('should render customers page by default', () => {
      render(<App />);

      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByTestId('hero').textContent).toBe('Customers');
      expect(screen.getAllByRole('button')[1].textContent).toBe('Create customer');
    });

    it('should navigate to products page', async () => {
      render(<App />);
      const productsLink = screen.getByTestId('header-navigation-products');
      userEvent.click(productsLink);

      await waitFor(() => screen.getByTestId('product-list'));

      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByTestId('hero').textContent).toBe('Products');
      expect(screen.getAllByRole('button')[1].textContent).toBe('Create product');
    });

    it('should navigate to customers page', async () => {
      render(<App />);
      const customersLink = screen.getByTestId('header-navigation-customers');
      userEvent.click(customersLink);

      await waitFor(() => screen.getByTestId('customer-list'));

      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByTestId('hero').textContent).toBe('Customers');
      expect(screen.getAllByRole('button')[1].textContent).toBe('Create customer');
    });

    it('should logout', async () => {
      render(<App />);
      const logoutLink = screen.getByTestId('header-navigation-logout');
      userEvent.click(logoutLink);

      await waitFor(() => screen.getByTestId('login-username-input'));
      expect(screen.getByText('backoffice')).toBeInTheDocument();
      expect(screen.getByText('Start Session')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button').textContent).toBe('Login');
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
