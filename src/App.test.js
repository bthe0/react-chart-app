import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import React from "react";

const queryClient = new QueryClient();

test('renders application correctly', () => {
  render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  );
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
