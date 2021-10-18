import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

test('should render footer', () => {
  render(<Footer />);
  const footerText = screen.getByText(/Demo cat app/i);
  expect(footerText).toBeInTheDocument();
});
