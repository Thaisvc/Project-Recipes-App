import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function FoodsRecipes() {
  const { foodsApi } = useContext(RecipesContext);
  const minArray = 12;
  return (
    foodsApi.slice(0, minArray).map((meal, index) => (
      <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          width="100px"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
      </div>
    ))
  );
}

export default FoodsRecipes;
