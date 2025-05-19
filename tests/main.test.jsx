import { render, screen } from '@testing-library/react';
import routes from '../src/app/AppRoutes.jsx';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders headline', () => {
    render(<RouterProvider router={routes} />);
    const headline = screen.getByText(/init_page/i);
    expect(headline).toBeInTheDocument();
  });
});
