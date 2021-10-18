import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

test('should render footer', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>);
  const footerText = screen.getByRole('button', { name: 'Add new cat' });
  expect(footerText).toBeInTheDocument();
});
