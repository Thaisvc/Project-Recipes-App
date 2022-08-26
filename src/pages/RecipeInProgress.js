import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { idDrinks } = useParams();
  const { idFoods } = useParams();
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        return responseFoodIdApi.meals;
      };
      callingFoodIdApi(idFoods).then((response) => setRecipeInProgress(response));
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinksApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinksApi.json();
        return responseDrinksApi.drinks;
      };
      callingDrinksIdApi(idDrinks).then((response) => setRecipeInProgress(response));
    }
  }, []);
  const ingredientsFilter = recipeInProgress.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  console.log(recipeInProgress);
  return (
    <div>
      <h1>RecipeInProgress</h1>
      { pathname.includes('drinks') ? (recipeInProgress.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            alt={ `${recipe.strDrink}-recipe` }
            src={ recipe.strDrinkThumb }
            data-testid="recipe-photo"
            width="400px"
          />
          <h3 data-testid="recipe-title">{ recipe.strDrink }</h3>
          <p data-testid="recipe-category">{ recipe.strCategory }</p>
          { ingredientsFilter[0].filter((hehe) => hehe !== null && hehe.length !== 0)
            .map((ingredient, index) => (
              <p key={ index }>
                <input
                  type="checkbox"
                  data-testid={ `${index}-ingredient-step` }
                />
                {ingredient}
              </p>
            )) }
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
      ))) : (
        <div>
          {recipeInProgress.map((recipe) => (
            <div key={ recipe.idMeal }>
              <img
                alt={ `${recipe.strMeal}-recipe` }
                src={ recipe.strMealThumb }
                data-testid="recipe-photo"
                width="400px"
              />
              <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
              { ingredientsFilter[0].filter((hehe) => hehe !== null && hehe.length !== 0)
                .map((ingredient, index) => (
                  <p key={ index }>
                    <input
                      type="checkbox"
                      data-testid={ `${index}-ingredient-step` }
                    />
                    {ingredient}
                  </p>
                )) }
              <p data-testid="instructions">{ recipe.strInstructions }</p>
            </div>
          ))}
        </div>
      )}
      <button type="button" data-testid="favorite-btn">
        <img src={ FavoriteIcon } alt="favorite-icon" />
      </button>
      <button type="button" data-testid="share-btn">
        <img src={ ShareIcon } alt="share-icon" />
      </button>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default RecipeInProgress;
