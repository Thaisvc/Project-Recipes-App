import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [titlePage, setTitlePage] = useState('Foods');
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [foodsApi, setFoodsApi] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);
  const [apiOfFood, setApiOfFood] = useState([]);
  const [apiOfDrink, setApiOfDrink] = useState([]);
  const [categoryOfFoods, setCategoryOfFoods] = useState('');
  const [categoryOfDrinks, setCategoryOfDrinks] = useState('');
  const [categoryFoodsBtn, setCategoryFoodsBtn] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);

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

  const objContext = { email,
    password,
    disabledSearch,
    titlePage,
    isDisabled,
    foodsApi,
    drinksApi,
    categoryFoodsBtn,
    categoryOfFoods,
    categoryDrinks,
    categoryOfDrinks,
    apiOfFood,
    apiOfDrink,
    setApiOfDrink,
    setApiOfFood,
    setCategoryOfDrinks,
    setCategoryOfFoods,
    setCategoryFoodsBtn,
    setPassword,
    setIsDisabled,
    setEmail,
    setDisabledSearch,
    setTitlePage,
    setFoodsApi,
    setDrinksApi,
    setCategoryDrinks,
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
