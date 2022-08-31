import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import clipboard from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getItemStorageProgressRecipe, setCheckbox } from '../services/localStore';

function FoodsInProgress() {
  const [ingredietCheckbox, setIngredietCheckbox] = useState([]);
  const [local, setLocal] = useState([]);
  const [isMessageOn, setIsMessageOn] = useState(false);
  const { idDrink, idFood } = useParams();
  const [count, setCount] = useState(0);
  const { recipeDetail, favorited, handleFavorite,
    setFavorited, handleDoneRecipe } = useContext(RecipesContext);
  const ingredientsFilter = recipeDetail.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  const { pathname } = useLocation();
  const type = pathname.slice('1', '6');

  const addItemStore = (value) => {
    const verificLocal = getItemStorageProgressRecipe('inProgressRecipes');
    if (verificLocal) {
      const objStore = { meals: {
        ...verificLocal.meals,
        [idFood]: value,
      },
      cocktails: { ...verificLocal.cocktails } };
      setCheckbox('inProgressRecipes', objStore);
    }
  };

  useEffect(() => {
    const verificarLocalStorage = () => {
      const verificarLocal = getItemStorageProgressRecipe('inProgressRecipes');
      setLocal(verificarLocal);
    };
    setCount(count + 1);
    verificarLocalStorage();
  }, [ingredietCheckbox]);

  useEffect(() => {
    const favoritas = () => {
      const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesLocalStorage !== null) {
        const boolean = favoritesLocalStorage
          .some((item) => (item.id === idFood ? idFood : idDrink));
        if (boolean === true) { setFavorited(true); }
      }
    };
    favoritas();
  }, [setFavorited, idFood, idDrink]);

  const data = new Date();
  return (
    <div className="page-recipeInProgress">
      {recipeDetail.map((recipe) => (
        <div key={ recipe.idMeal }>
          <img
            alt={ `${recipe.strMeal}-recipe` }
            src={ recipe.strMealThumb }
            data-testid="recipe-photo"
            width="400px"
          />
          <h3 data-testid="recipe-title">{ recipe.strMeal }</h3>
          <p
            data-testid="recipe-category"
            className="p-progress-category"
          >
            { recipe.strCategory }
          </p>
          { ingredientsFilter[0].filter((ingredient) => ingredient !== null
          && ingredient.length !== 0)
            .map((ingredient, index) => (
              <p key={ index } data-testid={ `${index}-ingredient-step` }>
                <input
                  className="checkbox-ingredient"
                  type="checkbox"
                  value={ ingredient }
                  onChange={ ({ target: { value } }) => {
                    addItemStore([...ingredietCheckbox, value]);
                    setIngredietCheckbox([...ingredietCheckbox, value]);
                  } }
                  checked={ (local.length !== 0 && local.meals[idFood] !== undefined)
                    && local.meals[idFood].some((item) => item === ingredient) }
                />
                <span>
                  {ingredient}
                </span>
              </p>
            )) }
          <p
            data-testid="instructions"
            className="p-progress-instructions"
          >
            { recipe.strInstructions }
          </p>
          <span>{ isMessageOn && 'Link copied!' }</span>
          <div className="div-btns">
            {/* Favoritar */}
            <button
              type="button"
              onClick={ () => {
                handleFavorite(type, idFood, idDrink);
              } }
              className="favorite-btn"
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
                clipboard(`http://localhost:3000/foods/${recipe.idMeal}`);
                setIsMessageOn(!isMessageOn);
              } }
              className="share-btn"
            >
              <img src={ ShareIcon } alt="share-icon" />
            </button>
            <Link to="/done-recipes">
              <button
                className="finish-btn"
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ (ingredientsFilter[0]
                  .filter((ingredient) => ingredient !== null
              && ingredient.length !== 0).length !== count - 1) }
                onClick={ () => handleDoneRecipe({ type: 'foods',
                  tags: ingredientsFilter[0]
                    .filter((ingredient) => ingredient !== null
                && ingredient.length !== 0),
                  data: data.toLocaleDateString() }) }
              >
                Finish Recipe
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodsInProgress;
