import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import apiDrink from '../fetchApi/apiDrink';
import apiFood from '../fetchApi/apiFood';

function Recipes() {
  const { titlePage, setFoodsApi, setDrinksApi,
    drinksApi, foodsApi } = useContext(RecipesContext);
  const minArray = 12;
  useEffect(() => {
    const func = async () => {
      if (titlePage === 'Foods') {
        const results = await apiFood();
        setFoodsApi(results);
      }
      const resultsDrinks = await apiDrink();
      setDrinksApi(resultsDrinks);
    };
    func();
  }, [setFoodsApi, setDrinksApi, titlePage]);
  return (
    <div>
      {
        (titlePage === 'Drinks') ? (
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
          ))
        ) : (
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
        )
      }
    </div>
  );
}

export default Recipes;
