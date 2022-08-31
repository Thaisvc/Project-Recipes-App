import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecomendationDrinks() {
  const { foodsApi } = useContext(RecipesContext);
  const { pathname } = useLocation();
  return (
    <div className="testimonials">
      <div className="scroller">
        { pathname.includes('drinks') ? (foodsApi.slice(0, SIX).map((d, index) => (
          <div
            className="item"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{ d.strMeal }</p>
            <p>{ d.strCategory }</p>
            <img width="60px" src={ d.strMealThumb } alt={ `${d.strMeal}-recipe` } />
          </div>))) : null }
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="start_recipe"
          onClick={ handleProgress }
        >
          { inProgressItems ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      </div>
    </div>
  );
}

export default RecomendationDrinks;
