import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testa componente Footer', () => {
  it('Testa os elementos do Footer', () => {
  const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
  history.push('/drinks');
  const { pathname } = history.location;
  const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
  expect(drinkIcon).toBeInTheDocument();
  userEvent.click(drinkIcon);
  expect(pathname).toBe('/drinks');
  });
});
