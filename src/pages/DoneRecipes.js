// import { copy } from 'fs-extra';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import referenceData from './mockDone';

// const copy = require('clipboard-copy');

function DoneRecipes() {
  const { setTitlePage, filterDoneRecipes,
    setFilterDoneRecipes, mapDoneRecipe, setMapDoneRecipe } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Done Recipes');
  }, [setTitlePage]);

  // Requisito 47 - Dificil hein Leke
  const handleClick = (id, type) => {
    global.alert('Link copied!', id, type);
    // if (type === 'food') {
    //   copy(`/foods/${id}`);
    // }
    // if (type === 'drink') {
    //   copy(`/drinks/${id}`);
    // }
  };

  // Requisito 48 - Filter Done Recipes
  useEffect(() => {
    setMapDoneRecipe(referenceData);
  }, [setMapDoneRecipe]);
  useEffect(() => {
    if (filterDoneRecipes === 'Food') {
      setMapDoneRecipe(referenceData.filter((item) => item.type
      === 'food'));
    }
    if (filterDoneRecipes === 'Drinks') {
      setMapDoneRecipe(referenceData.filter((item) => item.type
      === 'drink'));
    }
  }, [filterDoneRecipes, setMapDoneRecipe]);

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
          onClick={ () => setMapDoneRecipe(referenceData) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="Food"
          onClick={ ({ target: { value } }) => setFilterDoneRecipes(value) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="Drinks"
          onClick={ ({ target: { value } }) => setFilterDoneRecipes(value) }
        >
          Drinks
        </button>
        {mapDoneRecipe.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                width="150px"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink' ? recipe.alcoholicOrNot : recipe.nationality}
              {' - '}
              {recipe.category}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button
              type="button"
              data-testid="btn-share-img"
              onClick={ () => handleClick(recipe.id, recipe.type) }
            >
              <img
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {recipe.tags.map((item, indexs) => (
              <p key={ indexs } data-testid={ `${index}-${item}-horizontal-tag` }>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
