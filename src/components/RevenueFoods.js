import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RevenueCard from './RevenueCard';

function RevenueFoods() {
  const { searchFoodDrink } = useContext(RecipesContext);
  const history = useHistory();
  const TWELVE = 12;
  return (
    <div>
      <h1>...Recipes</h1>
      {history.location.pathname === '/receitas/foods'
      && searchFoodDrink.length > 0 && searchFoodDrink.slice(0, TWELVE).map(
        (food, index) => (
          <RevenueCard
            key={ food.idMeal }
            index={ index }
            name={ food.strMeal }
            img={ food.strMealThumb }
          />),
      )}

      {history.location.pathname === '/receitas/drinks'
      && searchFoodDrink.length > 0 && searchFoodDrink.slice(0, TWELVE).map(
        (drink, index) => (

          <RevenueCard
            key={ drink.idDrink }
            index={ index }
            name={ drink.strDrink }
            img={ drink.strDrinkThumb }
          />),
      )}
    </div>
  );
}

export default RevenueFoods;
