import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinksInProgress from '../components/DrinksInProgress';
import FoodsInProgress from '../components/FoodsInProgress';

function RecipeInProgress() {
  const { idDrink, idFood } = useParams();
  const { recipeInProgress, setRecipeInProgress } = useContext(RecipesContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        return responseFoodIdApi.meals;
      };
      callingFoodIdApi(idFood).then((response) => setRecipeInProgress(response));
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinkApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinkApi.json();
        return responseDrinksApi.drinks;
      };
      callingDrinksIdApi(idDrink).then((response) => setRecipeInProgress(response));
    }
  }, []);
  console.log(recipeInProgress);
  return (
    <div>
      <h1>RecipeInProgress</h1>
      { pathname.includes('drinks') ? (
        <DrinksInProgress />
      ) : (
        <FoodsInProgress />
      )}
    </div>
  );
}

export default RecipeInProgress;
