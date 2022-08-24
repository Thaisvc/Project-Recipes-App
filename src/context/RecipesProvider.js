import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [titlePage, setTitlePage] = useState('Foods');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [categoryOfFoods, setCategoryOfFoods] = useState('');
  const [categoryOfDrinks, setCategoryOfDrinks] = useState('');
  const [filterDoneRecipes, setFilterDoneRecipes] = useState('');
  const [foodsApi, setFoodsApi] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);
  const [apiOfFood, setApiOfFood] = useState([]);
  const [apiOfDrink, setApiOfDrink] = useState([]);
  const [categoryFoodsBtn, setCategoryFoodsBtn] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [mapDoneRecipe, setMapDoneRecipe] = useState([]);
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [isClickOne, setClickOne] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const handlePass = () => {
      const SIX = 6;
      if (password.length > SIX && email.includes('@') && email.includes('.com')) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    handlePass();
  }, [email, password]);

  const objContext = {
    apiOfFood,
    apiOfDrink,
    categoryDrinks,
    categoryFoodsBtn,
    categoryOfDrinks,
    categoryOfFoods,
    disabledSearch,
    drinksApi,
    email,
    foodsApi,
    filterDoneRecipes,
    isDisabled,
    isClickOne,
    mapDoneRecipe,
    password,
    titlePage,
    setApiOfDrink,
    setApiOfFood,
    setClickOne,
    setCategoryOfDrinks,
    setCategoryOfFoods,
    setCategoryFoodsBtn,
    setCategoryDrinks,
    setDisabledSearch,
    setDrinksApi,
    setEmail,
    setFilterDoneRecipes,
    setFoodsApi,
    setIsDisabled,
    setMapDoneRecipe,
    setPassword,
    setTitlePage,
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
