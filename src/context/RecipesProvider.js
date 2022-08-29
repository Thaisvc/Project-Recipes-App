import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { Foods, Drinks } from '../serviceSearch/SearchFoodDrink';

const copy = require('clipboard-copy');

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
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
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
    // Requisito 33 - Criando a função que copia o link atual para o clipboard ao clicar no botão "Share"
  const handleShare = () => { copy(window.location.href); setLinkCopied(true); };
  // Requisito 34 - Criada duas funções separadas da handleFavorite pois a complexidade da handleFavorite estava muito alta. Essas funções abaixo são executadas na handleFavorite.
  const addFirstFavorite = (type) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: type === 'foods' ? recipeDetail[0].idMeal : recipeDetail[0].idDrink,
      type: type === 'foods' ? 'food' : 'drink',
      nationality: recipeDetail[0].strArea ? recipeDetail[0].strArea : '',
      category: recipeDetail[0].strCategory,
      alcoholicOrNot: type === 'foods' ? '' : recipeDetail[0].strAlcoholic,
      name: type === 'foods' ? recipeDetail[0].strMeal : recipeDetail[0].strDrink,
      image: type === 'foods' ? (
        recipeDetail[0].strMealThumb) : (recipeDetail[0].strDrinkThumb),
    }]));
  };
  const addNewFavorite = (type, favoritesLocalStorage) => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...favoritesLocalStorage,
      { id: recipeDetail[0].idMeal ? recipeDetail[0].idMeal : recipeDetail[0].idDrink,
        type: type === 'foods' ? 'food' : 'drink',
        nationality: recipeDetail[0].strArea ? recipeDetail[0].strArea : '',
        category: recipeDetail[0].strCategory,
        alcoholicOrNot: type === 'foods' ? '' : recipeDetail[0].strAlcoholic,
        name: type === 'foods' ? recipeDetail[0].strMeal : recipeDetail[0].strDrink,
        image: type === 'foods' ? (
          recipeDetail[0].strMealThumb) : (recipeDetail[0].strDrinkThumb),
      }]));
  };
  // Requisito 34 - Função que salva no localStorage o primeiro favorito ou acrescenta mais um favorito na lista.
  const handleFavorite = (type, idFood, idDrink) => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // Requisito 36 - Caso a receita já esteja favoritada, executa o setItem para deixar no localStorage todas as receitas que não forem essa. Ou seja, remove apenas a receita clicada do localStorage. E as receitas restantes são deixadas no localStorage por passarem pelo filtro.
    if (favorited === true) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        favoritesLocalStorage.filter((item) => (item.id !== idFood ? idFood : idDrink)),
      ));
      // Requisito 36 - Além de remover do localStorage eu troco a imagem para o coração vazio.
      setFavorited(false);
    }
    // Requisito 36 - Caso a receita não esteja favoritada, colocarei ela na lista do localStorage e trocarei a foto para o coração preenchido.
    if (favorited === false) {
      setFavorited(true);
      // Se não tiver nada salvo na lista 'favoriteRecipes' vai inserir o primeiro item.
      if (favoritesLocalStorage === null) { addFirstFavorite(type); }
      // Caso já tenha itens na lista 'favoriteRecipes', mantém o que já tem e acrescenta um novo.
      if (favoritesLocalStorage !== null) { addNewFavorite(type, favoritesLocalStorage); }
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
    recipeInProgress,
    setRecipeInProgress,
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
    linkCopied,
    setLinkCopied,
    favorited,
    setFavorited,
    handleShare,
    handleFavorite,
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
