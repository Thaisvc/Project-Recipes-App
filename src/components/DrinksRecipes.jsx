import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import categoryDrinksApi from '../fetchApi/categoryDrinksApi';

function DrinksRecipes() {
  const { drinksApi, categoryDrinks, setCategoryDrinks } = useContext(RecipesContext);
  const minArray = 12;

  useEffect(() => {
    const result = async () => {
      const response = await categoryDrinksApi();
      const FIVE = 5;
      const fiveDrinks = response.slice(0, FIVE);
      const mapOfDrinks = fiveDrinks.map((d) => d.strCategory);
      setCategoryDrinks(mapOfDrinks);
    };
    result();
  }, []);

  return (
    <div>
      {categoryDrinks.map((c) => (
        <button
          data-testid={ `${c}-category-filter` }
          key={ c }
          type="button"
        >
          { c }

        </button>
      ))}
      {drinksApi.slice(0, minArray).map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="100px"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      ))}
    </div>);
}

export default DrinksRecipes;
