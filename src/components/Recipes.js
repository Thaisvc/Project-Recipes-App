import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import apiDrink from '../fetchApi/apiDrink';
import apiFood from '../fetchApi/apiFood';
import categoryFoodApi from '../fetchApi/categoryFood';
import DrinksRecipes from './DrinksRecipes';
import FoodsRecipes from './FoodsRecipes';

function Recipes() {
  const { titlePage, setFoodsApi, setDrinksApi, categoryFoodsBtn,
    setCategoryFoodsBtn, categoryOfFoods,
    setCategoryOfFoods } = useContext(RecipesContext);
  useEffect(() => {
    const func = async () => {
      if (titlePage === 'Foods') {
        const results = await apiFood();
        const categoryResultApi = await categoryFoodApi();
        setFoodsApi(results);
        setCategoryFoodsBtn(categoryResultApi);
      }
      if (titlePage === 'Drinks') {
        const resultsDrinks = await apiDrink();
        console.log(resultsDrinks);
        setDrinksApi(resultsDrinks);
      }
    };
    func();
  }, [setFoodsApi, setDrinksApi, titlePage, setCategoryFoodsBtn]);

  useEffect(() => {
    const minArray = 12;
    const foodCategory = async () => {
      const resultApiCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryOfFoods}`);
      const data = await resultApiCategory.json();
      setFoodsApi(data.meals.slice(0, minArray));
    };
    if (categoryOfFoods.length !== 0) {
      foodCategory();
    }
  }, [categoryOfFoods, setFoodsApi]);
  return (
    <div>
      {
        (titlePage === 'Drinks') ? (
          <DrinksRecipes />
        ) : (
          <div>
            {categoryFoodsBtn.map(({ strCategory }, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => setCategoryOfFoods(strCategory) }
              >
                {strCategory}
              </button>
            ))}
            <FoodsRecipes />
          </div>
        )
      }
    </div>
  );
}

export default Recipes;
