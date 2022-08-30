import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import { getItemStorageProgressRecipe, setCheckbox } from '../services/localStore';

function DrinksInProgress() {
  const { idDrinks } = useParams();
  const { recipeInProgress } = useContext(RecipesContext);
  const ingredientsFilter = recipeInProgress.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  const [ingredietCheckbox, setIngredietCheckbox] = useState([]);
  const [local, setLocal] = useState([]);
  useEffect(() => {
    const verificarLocalStorage = () => {
      const verificarLocal = getItemStorageProgressRecipe('inProgressRecipes');
      setLocal(verificarLocal);
    };
    verificarLocalStorage();
  }, [ingredietCheckbox]);
  const addItemStore = (value) => {
    const verificLocal = getItemStorageProgressRecipe('inProgressRecipes');
    const objStore = { meals: {
      ...verificLocal.meals,
    },
    cocktails: { ...verificLocal.cocktails,
      [idDrinks]: value } };
    setCheckbox('inProgressRecipes', objStore);
  };
  return (
    <div>
      {recipeInProgress.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            alt={ `${recipe.strDrink}-recipe` }
            src={ recipe.strDrinkThumb }
            data-testid="recipe-photo"
            width="400px"
          />
          <h3 data-testid="recipe-title">{ recipe.strDrink }</h3>
          <p data-testid="recipe-category">{ recipe.strCategory }</p>
          { ingredientsFilter[0].filter((ingredient) => ingredient !== null
          && ingredient.length !== 0)
            .map((ingredient, index) => (
              <p key={ index } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  value={ ingredient }
                  onChange={ ({ target: { value } }) => {
                    setIngredietCheckbox([...ingredietCheckbox, value]);
                    addItemStore([...ingredietCheckbox, value]);
                  } }
                  checked={ (local.cocktails[idDrinks] !== undefined)
                    && local.cocktails[idDrinks].some((item) => item === ingredient) }
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

export default DrinksInProgress;
