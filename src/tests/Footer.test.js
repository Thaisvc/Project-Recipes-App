import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Drinks from '../pages/Drinks';

describe('Testa componente Footer', () => {
  it('Testa os elementos do Footer', () => {
  const { history } = renderWithRouter(<Drinks />)
  const { pathname } = history.location;
  const drinkIcon = screen.getByTestId(/drinks-bottom-btn/i);
  expect(drinkIcon).toBeInTheDocument();
  userEvent.click(drinkIcon);
  expect(pathname).toBe('/drinks');
  });
});
