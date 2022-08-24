import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { Foods, Drinks } from '../SearchFoodDrink';

function RecipesProvider({ children }) {
  const [titlePage, setTitlePage] = useState('Foods');
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const [searchFoodDrink, setSearchFoodDrink] = useState();
  const history = useHistory();

  const getRevenue = async (searchA, searchB) => {
    const { pathname } = history.location;
    if (pathname === '/foods') {
      const foodsApiSearch = await Foods(searchA, searchB);
      setSearchFoodDrink(foodsApiSearch);
      if (foodsApiSearch.length === 1) {
        history.push(`/foods/${foodsApiSearch[0].idMeal}`);
      } else { history.push('receitas/foods'); }
    } else if (pathname === '/drinks') {
      const drinksApiSearch = await Drinks(searchA, searchB);
      setSearchFoodDrink(drinksApiSearch);
      if (drinksApiSearch.length === 1) {
        history.push(`/drinks/${drinksApiSearch[0].idDrink}`);
      } else { history.push('receitas/drinks'); }
    }
  };

  const objContext = {
    disabledSearch,
    titlePage,
    nameInput,
    radioInput,
    searchFoodDrink,
    setDisabledSearch,
    setTitlePage,
    setNameInput,
    setRadioInput,
    getRevenue,
    setSearchFoodDrink,
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
