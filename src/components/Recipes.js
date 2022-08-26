import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import apiDrink from '../fetchApi/apiDrink';
import apiFood from '../fetchApi/apiFood';
import DrinksRecipes from './DrinksRecipes';
import FoodsRecipes from './FoodsRecipes';

function Recipes() {
  const { titlePage, setFoodsApi, setDrinksApi,
    setCategoryFoodsBtn, setApiOfFood, setApiOfDrink } = useContext(RecipesContext);
  useEffect(() => {
    const func = async () => {
      const results = await apiFood();
      setFoodsApi(results);
      setApiOfFood(results);
      const resultsDrinks = await apiDrink();
      setDrinksApi(resultsDrinks);
      setApiOfDrink(resultsDrinks);
    };
    func();
  }, [setFoodsApi, setDrinksApi,
    titlePage, setCategoryFoodsBtn, setApiOfFood, setApiOfDrink]);
  return (
    <div>
      {
        (titlePage === 'Drinks') ? (
          <div>
            <DrinksRecipes />
          </div>
        ) : (
          <div>
            <FoodsRecipes />
          </div>
        )
      }
    </div>
  );
}

export default Recipes;
