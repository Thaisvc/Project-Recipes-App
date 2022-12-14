import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Tela de Login', () => {
  it('Testa os elementos da tela de login', () => {
  renderWithRouter(
    <RecipesProvider>
      <App />
    </RecipesProvider>
    );
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const buttonEnter = screen.getByRole('button', { name: /enter/i });
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(buttonEnter).toBeInTheDocument();
  expect(buttonEnter).toBeDisabled();
});
  it('Testa o comportamento da tela de Login', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <App />
    </RecipesProvider>
    );
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const buttonEnter = screen.getByRole('button', { name: /enter/i });
  userEvent.type(emailInput, 'alguem@email.com');
  userEvent.type(passwordInput, '1234567');
  expect(buttonEnter).not.toBeDisabled();
  userEvent.click(buttonEnter);
  expect(history.location.pathname).toBe('/foods');
});
});
