import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import FavoriteIcon from '../images/blackHeartIcon.svg';
import { getItemStorageProgressRecipe, setCheckbox } from '../services/localStore';

function FoodsInProgress() {
  const { idFood } = useParams();
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
    console.log(verificLocal);
    if (verificLocal) {
      const objStore = { meals: {
        ...verificLocal.meals,
        [idFood]: value,
      },
      cocktails: { ...verificLocal.cocktails } };
      console.log(objStore);
      setCheckbox('inProgressRecipes', objStore);
    }
  };
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
          { ingredientsFilter[0].filter((ingredient) => ingredient !== null
          && ingredient.length !== 0)
            .map((ingredient, index) => (
              <p key={ index } data-testid={ `${index}-ingredient-step` }>
                <input
                  type="checkbox"
                  value={ ingredient }
                  onChange={ ({ target: { value } }) => {
                    addItemStore([...ingredietCheckbox, value]);
                    setIngredietCheckbox([...ingredietCheckbox, value]);
                  } }
                  checked={ (local.meals[idFood] !== undefined)
                    && local.meals[idFood]
                      .some((item) => item === ingredient) }
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
