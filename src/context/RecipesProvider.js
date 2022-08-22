import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchApiIngredient, fetchApiName,
  fetchApiFirstLetter } from '../serviceSearch/getApiFood';
import { fetchApiIngredientDrink, fetchApiNameDrink,
  fetchApiFirstLetterDrink } from '../serviceSearch/getApiDrinks';

function RecipesProvider({ children }) {
  const [titlePage, setTitlePage] = useState('Foods');
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const history = useHistory();
  // const [revenue, setRevenue] = useState('');

  const getRevenue = (searchA, searchB) => {
    // console.log(searchA, searchB);
    const { pathname } = history.location;

    if (pathname === '/foods') {
      if (searchB === 'Ingredient') {
        const fetchIngredient = async () => {
          const { meals } = await fetchApiIngredient(searchA);
          // console.log(meals);
        };
        return fetchIngredient();
      } if (searchB === 'Name') {
        const fetchName = async () => {
          const { meals } = await fetchApiName(searchA);
          // console.log(meals);
        };
        return fetchName();
      }
      if (searchB === 'First Letter') {
        const fetchFirstLetter = async () => {
          const { meals } = await fetchApiFirstLetter(searchA);
          // console.log(meals);
        };
        return fetchFirstLetter();
      }
    } else if (pathname === '/drinks') {
      if (searchB === 'Ingredient') {
        const fetchIngredientDrink = async () => {
          const { meals } = await fetchApiIngredientDrink(searchA);
          // console.log(meals);
        };
        return fetchIngredientDrink();
      } if (searchB === 'Name') {
        const fetchNameDrink = async () => {
          const { meals } = await fetchApiNameDrink(searchA);
          // console.log(meals);
        };
        return fetchNameDrink();
      }
      if (searchB === 'First Letter') {
        const fetchFirstLetterDrink = async () => {
          const { meals } = await fetchApiFirstLetterDrink(searchA);
          // console.log(meals);
        };
        return fetchFirstLetterDrink();
      }
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
