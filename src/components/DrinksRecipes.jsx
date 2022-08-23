import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function DrinksRecipes() {
  const { drinksApi } = useContext(RecipesContext);
  const minArray = 12;
  return (
    drinksApi.slice(0, minArray).map((drink, index) => (
      <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          width="100px"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
      </div>
    )));
}

export default DrinksRecipes;
