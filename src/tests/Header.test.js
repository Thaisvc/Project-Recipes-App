import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Componente Header', () => {
    it('testando se a pagina Foods tem o nome correto', () => {
        const {history} = renderWithRouter(<RecipesProvider>
            <App />
          </RecipesProvider>);
          history.push('/drinks');
          const btnSearch = screen.getByRole('button', { name: /search icon/i });
          userEvent.click(btnSearch);
          const inputSearch = screen.getByPlaceholderText(/search/i);
          expect(inputSearch).toBeInTheDocument();
    });
});
it('testando se a pagina Favorites Recipes não tem o btn search', async () => {
    const {history} = renderWithRouter(<RecipesProvider>
        <App />
      </RecipesProvider>);
      await waitFor(() => {
          history.push('/favorite-recipes');
      }) 
      const btnSearch = screen.getByRole('heading', { name: /favorite recipes/i })
      expect(btnSearch).toBeInTheDocument();
});