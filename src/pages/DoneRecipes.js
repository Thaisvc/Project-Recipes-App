import clipboardCopy from 'clipboard-copy';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import ShareIcon from '../images/shareIcon.svg';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const { setTitlePage, filterDoneRecipes,
    setFilterDoneRecipes, mapDoneRecipe, setMapDoneRecipe } = useContext(RecipesContext);

  const [isMessageOn, setIsMessageOn] = useState(false);
  const [share, setShare] = useState({});
  const [DoneRecipeOriginal, setDoneRecipeOriginal] = useState([]);
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
  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setMapDoneRecipe(localDoneRecipes);
    setDoneRecipeOriginal(localDoneRecipes);
  }, [setMapDoneRecipe]);
  useEffect(() => {
    const localDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterDoneRecipes === 'Food' && localDoneRecipes !== null) {
      setMapDoneRecipe(localDoneRecipes.filter((item) => item.type
      === 'food'));
    }
    if (filterDoneRecipes === 'Drinks' && localDoneRecipes !== null) {
      setMapDoneRecipe(localDoneRecipes.filter((item) => item.type
      === 'drink'));
    }
  }, [filterDoneRecipes, setMapDoneRecipe]);

  return (
    <div className="page-done-recipes">
      <Header />
      <div>
        <div className="btns-done-filter">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            value="All"
            onClick={ () => setMapDoneRecipe(DoneRecipeOriginal) }
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
        </div>
        <section className="main-done-recipe">
          {DoneRecipeOriginal !== null && mapDoneRecipe.map((recipe, index) => (
            <div key={ (recipe.id * index) / 2 } className="recipe-done">
              <Link to={ `/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
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
                className="share-btn"
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
              <ul>
                {recipe.tags.map((item, indexs) => (
                  <li key={ indexs } data-testid={ `${index}-${item}-horizontal-tag` }>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default DoneRecipes;
