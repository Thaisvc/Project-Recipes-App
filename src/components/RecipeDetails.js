import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const { setRecipeDetail, recipeDetail } = useContext(RecipesContext);
  const { idDrink } = useParams();
  const { idFood } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        console.log('chamou api de comida');
        return responseFoodIdApi.meals;
      };
      callingFoodIdApi(idFood).then((response) => setRecipeDetail(response));
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinksApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinksApi.json();
        console.log('chamou api de bebida');
        return responseDrinksApi.drinks;
      };
      callingDrinksIdApi(idDrink).then((response) => setRecipeDetail(response));
    }
  }, []);

  console.log(recipeDetail);
  const ingredientsFilter = recipeDetail.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  const arrayOfIngredients = ingredientsFilter[0];
  console.log(arrayOfIngredients);
  const ember = recipeDetail.map((recipe) => recipe.strYoutube.split('='));
  const numberToEmber = ember.map((a) => a[1])
  console.log(ember);
  console.log(numberToEmber);

  return (
    <div>
      { pathname.includes('drinks') ? (recipeDetail.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            alt={ `${recipe.strDrink}-recipe` }
            src={ recipe.strDrinkThumb }
            data-testid="recipe-photo"
            width="400px"
          />
          <p data-testid="recipe-title">{ recipe.strDrink }</p>
          <p data-testid="recipe-category">{ recipe.strCategory }</p>
          { arrayOfIngredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </p>
          )) }
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          {/* { Object.keys(recipe).filter((k) => k.includes('strIngredient'))
              .map((ingredient) => recipe[ingredient]) } */}
        </div>
      ))) : (
        recipeDetail.map((recipe) => (
          <div key={ recipe.idMeal }>
            <img
              alt={ `${recipe.strMeal}-recipe` }
              src={ recipe.strMealThumb }
              data-testid="recipe-photo"
              width="400px"
            />
            <p data-testid="recipe-title">{ recipe.strMeal }</p>
            <p data-testid="recipe-category">{ recipe.strCategory }</p>
            { arrayOfIngredients.map((ingredient, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredient }
              </p>
            )) }
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            <iframe
              src={ `https://www.youtube.com/embed/${numberToEmber[0]}` }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              data-testid="video"
            />
          </div>
        )))}
    </div>
  );
}

export default RecipeDetails;

// idMeal
// strMeal
// strMealThumb
