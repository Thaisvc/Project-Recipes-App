import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Componente Header', () => {
    it('testando se a pagina Foods tem o nome correto', () => {
        const {history, debug} = renderWithRouter(<RecipesProvider>
            <App />
          </RecipesProvider>);
          history.push('/drinks/23423/in-progress');
          debug();
    });
});