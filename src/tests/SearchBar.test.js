import React from 'react';
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

it('Food', async () => {
    const {history} = renderWithRouter(<RecipesProvider>
      <App />
    </RecipesProvider>);
    await waitFor(() => {
        history.push('/foods');
    });
    const btnSearchIcon = screen.getByRole('button', { name: /search icon/i });
    userEvent.click(btnSearchIcon);
    const inputSearch = screen.getByPlaceholderText(/search/i);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'c');
    const radioInput = screen.getByTestId('first-letter-search-radio');
    expect(radioInput).toBeInTheDocument();
    userEvent.click(radioInput);
    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
});

it('Drink', async () => {
    const {history} = renderWithRouter(<RecipesProvider>
      <App />
    </RecipesProvider>);
    await waitFor(() => {
        history.push('/drinks');
    }) 
    const btnSearchIcon = screen.getByRole('button', { name: /search icon/i });
    userEvent.click(btnSearchIcon);
    const inputSearch = screen.getByPlaceholderText(/search/i);
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'c45');
    const radioInput = screen.getByTestId('first-letter-search-radio');
    expect(radioInput).toBeInTheDocument();
    userEvent.click(radioInput);
    const btnSearch = screen.getByTestId('exec-search-btn');
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);
});