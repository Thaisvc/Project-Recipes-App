import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchApiIngredientFood, fetchApiNameFood,
  fetchApiFirstLetterFood } from '../serviceSearch/getApiFood';
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
        const fetchIngredientFood = async () => {
          const { meals } = await fetchApiIngredientFood(searchA);
          // console.log(meals);
        };
        return fetchIngredientFood();
      } if (searchB === 'Name') {
        const fetchNameFood = async () => {
          const { meals } = await fetchApiNameFood(searchA);
          // console.log(meals);
        };
        return fetchNameFood();
      }
      if (searchB === 'First Letter') {
        const fetchFirstLetterFood = async () => {
          const { meals } = await fetchApiFirstLetterFood(searchA);
          // console.log(meals);
        };
        return fetchFirstLetterFood();
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
