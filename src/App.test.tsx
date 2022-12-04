import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render login page by default', () => {
    render(<App />);

    expect(screen.getByText('backoffice')).toBeInTheDocument();
    expect(screen.getByText('Start Session')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Login');
  });
});
