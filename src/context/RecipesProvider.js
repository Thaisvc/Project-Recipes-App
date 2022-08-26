import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { Foods, Drinks } from '../serviceSearch/SearchFoodDrink';
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
  const [nameInput, setNameInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  const [searchFoodDrink, setSearchFoodDrink] = useState();
  const [recipeDetail, setRecipeDetail] = useState([]);
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
    nameInput,
    password,
    titlePage,
    radioInput,
    searchFoodDrink,
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
    setNameInput,
    setRadioInput,
    getRevenue,
    setSearchFoodDrink,
    setRecipeDetail,
    recipeDetail,
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