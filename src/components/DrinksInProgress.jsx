import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getItemStorageProgressRecipe, setCheckbox } from '../services/localStore';

function DrinksInProgress() {
  const [ingredietCheckbox, setIngredietCheckbox] = useState([]);
  const [local, setLocal] = useState([]);
  const [isMessageOn, setIsMessageOn] = useState(false);
  const { idDrink, idFood } = useParams();
  const { recipeDetail, favorited, handleFavorite,
    getFavoriteLocalStorage } = useContext(RecipesContext);
  const ingredientsFilter = recipeDetail.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  const { pathname } = useLocation();
  const type = pathname.slice('1', '6');

  const addItemStore = (value) => {
    const verificLocal = getItemStorageProgressRecipe('inProgressRecipes');
    const objStore = { meals: {
      ...verificLocal.meals,
    },
    cocktails: { ...verificLocal.cocktails,
      [idDrink]: value } };
    setCheckbox('inProgressRecipes', objStore);
  };

  useEffect(() => {
    const verificarLocalStorage = () => {
      const verificarLocal = getItemStorageProgressRecipe('inProgressRecipes');
      setLocal(verificarLocal);
    };
    verificarLocalStorage();
    getFavoriteLocalStorage(idFood, idDrink);
  }, [ingredietCheckbox, getFavoriteLocalStorage,
    idFood, idDrink]);

  return (
    <div>
      {recipeDetail.map((recipe) => (
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
                  checked={ (local.cocktails[idDrink] !== undefined)
                    && local.cocktails[idDrink].some((item) => item === ingredient) }
                />
                {ingredient}
              </p>
            )) }
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          {/* Favoritar */}
          <button
            type="button"
            onClick={ () => {
              handleFavorite(type, idFood, idDrink);
            } }
          >
            <img
              src={ favorited ? blackHeartIcon : whiteHeartIcon }
              alt="favorite button"
              data-testid="favorite-btn"
            />
          </button>
          {/* Compartilhar */}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              clipboard(`http://localhost:3000/drinks/${recipe.idDrink}`);
              setIsMessageOn(!isMessageOn);
            } }
          >
            <img src={ ShareIcon } alt="share-icon" />
          </button>
          <span>{ isMessageOn && 'Link copied!' }</span>
          <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
        </div>
      ))}
    </div>
  );
}

export default DrinksInProgress;
