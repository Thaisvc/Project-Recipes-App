import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import categoryDrinksApi from '../fetchApi/categoryDrinksApi';

function DrinksRecipes() {
  const { drinksApi, setDrinksApi,
    categoryDrinks, apiOfDrink,
    setCategoryDrinks,
    setCategoryOfDrinks,
    isClickOne,
    setClickOne,
    categoryOfDrinks } = useContext(RecipesContext);
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
  }, [setCategoryDrinks]);

  useEffect(() => {
    const drinksCategory = async () => {
      const resultApiCategory = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryOfDrinks}`);
      const data = await resultApiCategory.json();
      setDrinksApi(data.drinks.slice(0, minArray));
    };
    if (categoryOfDrinks.length !== 0) {
      drinksCategory();
    }
  }, [categoryOfDrinks, setDrinksApi]);

  const handleClick = (c) => {
    console.log('ok');
    setClickOne(!isClickOne);
    if (isClickOne) {
      setCategoryOfDrinks(c);
    }
    if (isClickOne === false) {
      setDrinksApi(apiOfDrink);
    }
  };

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setDrinksApi(apiOfDrink) }
      >
        All
      </button>
      {categoryDrinks.map((c) => (
        <button
          data-testid={ `${c}-category-filter` }
          key={ c }
          type="button"
          onClick={ () => handleClick(c) }
        >
          { c }

        </button>
      ))}
      {drinksApi.slice(0, minArray).map((drink, index) => (
        <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
          <div data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        </Link>
      ))}
    </div>);
}

export default DrinksRecipes;
