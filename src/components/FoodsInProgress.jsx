import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';

function FoodsInProgress() {
  const { recipeInProgress } = useContext(RecipesContext);
  const ingredientsFilter = recipeInProgress.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  return (
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
          <button type="button" data-testid="favorite-btn">
            <img src={ FavoriteIcon } alt="favorite-icon" />
          </button>
          <button type="button" data-testid="share-btn">
            <img src={ ShareIcon } alt="share-icon" />
          </button>
          <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      ))}
    </div>
  );
}

export default FoodsInProgress;
