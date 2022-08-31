import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import mockDone from './helpers/mockDone';

describe('Componente Header', () => {
    it('testando se a pagina Foods tem o nome correto', async () => {
      localStorage.setItem('doneRecipes', JSON.stringify(mockDone))
        const {history} = renderWithRouter(<RecipesProvider>
            <App />
          </RecipesProvider>);
        await waitFor(() => {
          history.push('/done-recipes');
        });
        const btnShare = screen.getAllByTestId('btn-share-img');
        expect(btnShare).toHaveLength(2);
        await waitFor(() => {
          userEvent.click(btnShare[0]);
        });
        await waitFor(() => {
          userEvent.click(btnShare[1]);
        });
        const btnFood = screen.getByRole('button', {
          name: /food/i
        });
        expect(btnFood).toBeInTheDocument();
        const btnDrink = screen.getByRole('button', {
          name: /drinks/i
        });
        expect(btnDrink).toBeInTheDocument();
        userEvent.click(btnFood);
        userEvent.click(btnDrink);

        const btnAll = screen.getByRole('button', {
          name: /all/i
        });
        expect(btnAll).toBeInTheDocument();
        userEvent.click(btnAll);
    });
});