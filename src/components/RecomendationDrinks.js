import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './RecomendationDrinks.css';

function RecomendationDrinks() {
  const { foodsApi } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const SIX = 6;

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
      </div>
    </div>
  );
}

export default RecomendationDrinks;
