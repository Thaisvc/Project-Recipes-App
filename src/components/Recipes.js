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
      if (titlePage === 'Foods') {
        const results = await apiFood();
        setFoodsApi(results);
        setApiOfFood(results);
      }
      if (titlePage === 'Drinks') {
        const resultsDrinks = await apiDrink();
        setDrinksApi(resultsDrinks);
        setApiOfDrink(resultsDrinks);
      }
    };
    func();
  }, [setFoodsApi, setDrinksApi,
    titlePage, setCategoryFoodsBtn, setApiOfFood, setApiOfDrink]);

  // useEffect(() => {
  //   const minArray = 12;
  //   const foodCategory = async () => {
  //     const resultApiCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryOfFoods}`);
  //     const data = await resultApiCategory.json();
  //     setFoodsApi(data.meals.slice(0, minArray));
  //   };
  //   if (categoryOfFoods.length !== 0) {
  //     foodCategory();
  //   }
  // }, [categoryOfFoods, setFoodsApi]);
  return (
    <div>
      {
        (titlePage === 'Drinks') ? (
          <DrinksRecipes />
        ) : (
          <div>
            {/* {categoryFoodsBtn.map(({ strCategory }, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => setCategoryOfFoods(strCategory) }
              >
                {strCategory}
              </button>
            ))} */}
            <FoodsRecipes />
          </div>
        )
      }
    </div>
  );
}

export default Recipes;
