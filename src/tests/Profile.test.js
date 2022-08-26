import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Tela de Perfil', () => {
  it('Testa se existe um elemento que exibe o e-mail do usuário', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>
      );
      history.push('/profile');
      const email = screen.getByTestId(/profile-email/i);
      expect(email).toBeInTheDocument();
});

it('Testa se o botão Logout existe e se funciona corretamente', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <App />
    </RecipesProvider>
    );
    history.push('/profile');
    const btnLogout = screen.getByTestId(/profile-logout-btn/i);
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
});

  it('Testa se o e-mail e senha digitados no login armazena a chave "user" no localStorage e se ela é recuperada no "Profile"', async () => {
      renderWithRouter(<RecipesProvider>
          <App />
        </RecipesProvider>);
        const inputEmail = await screen.getByTestId(/email-input/i);
        const email = 'email@mail.com';
        userEvent.type(inputEmail, email);
        const inputPassword = await screen.getByTestId(/password-input/i);
        const password = '12345678';
        userEvent.type(inputPassword, password);
        const btnLogin = await screen.getByTestId(/login-submit-btn/i);
        userEvent.click(btnLogin);
        const btnProfile = await screen.getByTestId(/profile-top-btn/i);
        userEvent.click(btnProfile);
        const user = localStorage.getItem('user');
        expect(user).toBeTruthy();
        const emailText = screen.getByText(email);
        expect(emailText).toBeInTheDocument();
  });
});
