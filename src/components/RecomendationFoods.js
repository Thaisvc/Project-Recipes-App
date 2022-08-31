import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecomendationFoods() {
  const { pathname } = useLocation();
  const { drinksApi } = useContext(RecipesContext);

  return (
    <div className="testimonials">
      <div className="scroller">
        { pathname.includes('foods') ? (drinksApi.slice(0, SIX).map((d, index) => (
          <div
            className="item"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{ d.strDrink }</p>
            <p>{ d.strAlcoholic }</p>
            <img width="60px" src={ d.strDrinkThumb } alt={ `${d.strDrink}-recipe` } />
          </div>
        ))) : null }
      </div>
    </div>
  );
}

export default RecomendationFoods;
