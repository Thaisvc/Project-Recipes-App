import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchApiIngredient, fetchApiName,
  fetchApiFirstLetter } from '../serviceSearch/getApiSearch';

function RecipesProvider({ children }) {
  const [titlePage, setTitlePage] = useState('Foods');
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  // const [revenue, setRevenue] = useState('');

  const getRevenue = (searchA, searchB) => {
    // console.log(searchA, searchB);
    if (searchB === 'Ingredient') {
      const fetchIngredient = async () => {
        const { meals } = await fetchApiIngredient(searchA);
        console.log(meals);
      };
      return fetchIngredient();
    } if (searchB === 'Name') {
      const fetchName = async () => {
        const { meals } = await fetchApiName(searchA);
        console.log(meals);
      };
      return fetchName();
    }
    if (searchB === 'First Letter') {
      const fetchFirstLetter = async () => {
        const { meals } = await fetchApiFirstLetter(searchA);
        console.log(meals);
      };
      return fetchFirstLetter();
    }
  };

  const objContext = {
    disabledSearch,
    titlePage,
    nameInput,
    radioInput,
    setDisabledSearch,
    setTitlePage,
    setNameInput,
    setRadioInput,
    getRevenue,

  };
  return (
    <RecipesContext.Provider value={ objContext }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
