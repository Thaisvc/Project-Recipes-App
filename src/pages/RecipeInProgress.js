import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinksInProgress from '../components/DrinksInProgress';
import FoodsInProgress from '../components/FoodsInProgress';
import '../css/RecipeInProgress.css';

function RecipeInProgress() {
  const { idDrink, idFood } = useParams();
  const { setRecipeDetail } = useContext(RecipesContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        return responseFoodIdApi.meals;
      };
      callingFoodIdApi(idFood).then((response) => setRecipeDetail(response));
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinkApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinkApi.json();
        return responseDrinksApi.drinks;
      };
      callingDrinksIdApi(idDrink).then((response) => setRecipeDetail(response));
    }
  }, [idDrink, idFood, setRecipeDetail, pathname]);
  return (
    <div>
      <h1 className="title-recipeInProgress">Recipe In Progress</h1>
      { pathname.includes('drinks') ? (
        <DrinksInProgress />
      ) : (
        <FoodsInProgress />
      )}
    </div>
  );
}

export default RecipeInProgress;
