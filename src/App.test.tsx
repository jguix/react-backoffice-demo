import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('should render login page by default', () => {
  const { container } = render(<App />);
  const h1 = container.querySelector('h1');
  expect(h1).toBeInTheDocument();
  expect(h1).toHaveTextContent('Login');
});
