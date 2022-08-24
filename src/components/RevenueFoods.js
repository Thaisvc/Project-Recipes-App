import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import RevenueCard from './RevenueCard';

function RevenueFoods() {
  const { searchFoodDrink } = useContext(RecipesContext);

  console.log(searchFoodDrink);

  // const TWELVE = 12;
  return (
    <div>
      <h1>...Recipes</h1>
      { searchFoodDrink.length > 0 && searchFoodDrink.map((food, index) => (

        <RevenueCard
          key={ food.idMeal }
          index={ index }
          name={ food.strMeal }
          img={ food.strMealThumb }
        />))}

      {searchFoodDrink.map((drink, index) => (

        <RevenueCard
          key={ drink.idDrink }
          index={ index }
          name={ drink.strDrink }
          img={ drink.strDrinkThumb }
        />))}
    </div>
  );
}

export default RevenueFoods;
