import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const { setTitlePage, filterDoneRecipes,
    setFilterDoneRecipes, mapDoneRecipe, setMapDoneRecipe } = useContext(RecipesContext);

  const [isMessageOn, setIsMessageOn] = useState(false);
  const [share, setShare] = useState({});
  useEffect(() => {
    setTitlePage('Done Recipes');
  }, [setTitlePage]);

  useEffect(() => {
    const ok = async () => {
      if (share.type === 'food') {
        await clipboardCopy(`http://localhost:3000/foods/${share.id}`);
      }
      if (share.type === 'drink') {
        await clipboardCopy(`http://localhost:3000/drinks/${share.id}`);
      }
    };
    ok();
  }, [share]);

  // Requisito 48 - Filter Done Recipes
  const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  useEffect(() => {
    setMapDoneRecipe(localDoneRecipes);
  }, [setMapDoneRecipe, localDoneRecipes]);
  useEffect(() => {
    if (filterDoneRecipes === 'Food') {
      setMapDoneRecipe(localDoneRecipes.filter((item) => item.type
      === 'food'));
    }
    if (filterDoneRecipes === 'Drinks') {
      setMapDoneRecipe(localDoneRecipes.filter((item) => item.type
      === 'drink'));
    }
  }, [filterDoneRecipes, localDoneRecipes, setMapDoneRecipe]);

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
          onClick={ () => setMapDoneRecipe(localDoneRecipes) }
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
        {mapDoneRecipe !== null && mapDoneRecipe.map((recipe, index) => (
          <div key={ (recipe.id * index) / 2 }>
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
              onClick={ () => {
                setShare({ id: recipe.id, type: recipe.type });
                setIsMessageOn(!isMessageOn);
              } }
            >
              <img
                src={ ShareIcon }
                alt="Share Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <span>{ isMessageOn && 'Link copied!' }</span>
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
