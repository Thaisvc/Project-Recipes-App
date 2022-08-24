import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Componente Header', () => {
    it('testando se a pagina Foods tem o nome correto', async () => {
        const {history, debug} = renderWithRouter(<RecipesProvider>
            <App />
          </RecipesProvider>);
        await waitFor(() => {
          history.push('/done-recipes');
        });
        const btnShare = screen.getAllByTestId('btn-share-img');
        expect(btnShare).toHaveLength(2);
        userEvent.click(btnShare[0]);
        debug();
    });
});