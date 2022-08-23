import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import apiDrink from '../fetchApi/apiDrink';
import apiFood from '../fetchApi/apiFood';
import DrinksRecipes from './DrinksRecipes';
import FoodsRecipes from './FoodsRecipes';

function Recipes() {
  const { titlePage, setFoodsApi, setDrinksApi } = useContext(RecipesContext);
  useEffect(() => {
    const func = async () => {
      if (titlePage === 'Foods') {
        const results = await apiFood();
        console.log(results);
        setFoodsApi(results);
      }
      if (titlePage === 'Drinks') {
        const resultsDrinks = await apiDrink();
        console.log(resultsDrinks);
        setDrinksApi(resultsDrinks);
      }
    };
    func();
  }, [setFoodsApi, setDrinksApi, titlePage]);
  return (
    <div>
      {
        (titlePage === 'Drinks') ? (
          <DrinksRecipes />
        ) : (
          <FoodsRecipes />
        )
      }
    </div>
  );
}

export default Recipes;
