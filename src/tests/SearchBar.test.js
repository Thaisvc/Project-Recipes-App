import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContex from './helpers/renderWithContex';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { createMemoryHistory } from 'history';
import App from '../App';

const history = createMemoryHistory();


describe('Testa o componemte "SearchBar"', () => {
  test('Testa se inputs são renderizados na tela', () => {
    renderWithContex(<SearchBar />);

    const inputsearch = screen.getByTestId('search-input');
    const iInputIngredient = screen.getByTestId('ingredient-search-radio');
    const inputName = screen.getByTestId('name-search-radio');
    const inputfirstLetter = screen.getByTestId('first-letter-search-radio');
    const ButtonSearch = screen.getByTestId('exec-search-btn');

    expect(inputsearch).toBeInTheDocument();
    expect(iInputIngredient).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputfirstLetter).toBeInTheDocument();
    expect(ButtonSearch).toBeInTheDocument();
  })

  test('Testa se os elementos são renderizados na rota "Foods"', () => {
    renderWithContex(<Header />);
    history.push('/foods')

    const searchbutton = screen.getByTestId('search-top-btn')
    expect(searchbutton).toBeInTheDocument();
    userEvent.click(searchbutton);
    const inputsearch = screen.getByTestId("search-input");
    expect(inputsearch).toBeInTheDocument()
  })

  test('Testa  o redirecionamento caso so encontre uma recita', async () => {
    renderWithContex(<Header />)

    const title = screen.getByTestId('page-title')
    expect(title).toBeInTheDocument();
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const inputsearch = screen.getByTestId('search-input');
    userEvent.type(inputsearch, 'Arrabiata');
    const inputName = screen.getByTestId('name-search-radio')
    fireEvent.click(inputName);
    const ButtonSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(ButtonSearch);

    history.push('/foods/52771');
    expect(history.location.pathname).toBe('/foods/52771')
  });


  test('Testa se aparece o alerta', async () => {
    // https://jestjs.io/pt-BR/docs/jest-object#jestspyonobject-methodname
    jest.spyOn(global, 'alert')
      .mockImplementation(() => 'ALERTA');
      
    const { history } = renderWithContex(<App />);
    history.push('/drinks');

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const ButtonSearch = await screen.findByTestId('exec-search-btn');
    const inputsearch = screen.getByTestId('search-input');
    const inputfirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(inputfirstLetter);
    userEvent.type(inputsearch, 'aaa');
    userEvent.click(ButtonSearch);
    expect(global.alert()).toBe('ALERTA');
  });

})
